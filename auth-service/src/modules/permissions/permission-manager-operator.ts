import { DEFAULT_PAGE_SIZE } from '@src/constants';
import { Permission } from '@src/dataaccess/db/entities';
import { PERMISSION_DATA_MAPPER_TOKEN, PermissionDataMapper } from '@src/dataaccess/db/mappers/permission.dm';
import {
    ROLE_PERMISSION_DATA_MAPPER_TOKEN,
    RolePermissionDataMapper,
} from '@src/dataaccess/db/mappers/role-permission.dm';
import { ItemExistedException, ItemNotFoundException } from '@src/utils/errors';
import { validateRequest } from '@src/utils/request';
import { injected, token } from 'brandi';
import { FindOptionsWhere, Like } from 'typeorm';
import {
    CreatePermissionRequest,
    DeletePermissionRequest,
    GetListPermissionOptions,
    GetListPermissionRequest,
    GetPermissionByIdRequest,
    UpdatePermissionRequest,
    UpdateRolePermissionsRequest,
} from './dto';

export interface PermissionManagerOperator {
    createPermission(request: CreatePermissionRequest): Promise<Permission>;
    updatePermission(request: UpdatePermissionRequest): Promise<Permission>;
    deletePermission(request: DeletePermissionRequest): Promise<boolean>;
    getListPermission(request: GetListPermissionRequest): Promise<Permission[]>;
    getPermissionById(request: GetPermissionByIdRequest): Promise<Permission>;
    updateRolePermissions(request: UpdateRolePermissionsRequest): Promise<boolean>;
}

export class PermissionManagerOperatorImpl implements PermissionManagerOperator {
    constructor(
        private readonly permissionDataMapper: PermissionDataMapper,
        private readonly rolePermissionDataMapper: RolePermissionDataMapper,
    ) {}

    async createPermission(request: CreatePermissionRequest): Promise<Permission> {
        await validateRequest(request, CreatePermissionRequest);

        request.resource = this.sanitizePermissionResourceAction(request.resource);
        request.action = this.sanitizePermissionResourceAction(request.action);

        const existedPermission = await this.permissionDataMapper.getPermissionBy({
            resource: request.resource,
            action: request.action,
        });
        if (existedPermission) throw new ItemExistedException('Permission existed');

        const createPermissionBody = this.permissionDataMapper.from(request);
        return this.permissionDataMapper.createPermission(createPermissionBody);
    }

    private sanitizePermissionResourceAction(resourceOrAction: string) {
        return resourceOrAction
            .replace(/[^A-Za-z\s+]/g, '')
            .trim()
            .split(/\s+/)
            .join('_')
            .toLocaleLowerCase();
    }

    async updatePermission(request: UpdatePermissionRequest): Promise<Permission> {
        await validateRequest(request, UpdatePermissionRequest);

        const permission = await this.permissionDataMapper.getPermissionById(request.permissionId);
        if (!permission) throw new ItemNotFoundException('Permission not found');

        const updatePermissionBody = this.permissionDataMapper.from({
            ...permission,
            ...(request.resource && { resource: this.sanitizePermissionResourceAction(request.resource) }),
            ...(request.action && { action: this.sanitizePermissionResourceAction(request.action) }),
        });

        const existedPermission = await this.permissionDataMapper.getPermissionBy({
            resource: updatePermissionBody.resource,
            action: updatePermissionBody.action,
        });
        if (existedPermission) throw new ItemExistedException('Permission existed');

        await this.permissionDataMapper.updatePermission(permission.permissionId, updatePermissionBody);
        return updatePermissionBody;
    }

    async deletePermission(request: DeletePermissionRequest): Promise<boolean> {
        await validateRequest(request, DeletePermissionRequest);
        const permission = await this.permissionDataMapper.getPermissionById(request.permissionId);
        if (!permission) {
            throw new ItemNotFoundException('Permission not found');
        }

        await this.permissionDataMapper.deletePermission(request.permissionId);
        return true;
    }

    async getListPermission(request: GetListPermissionRequest): Promise<Permission[]> {
        await validateRequest(request, GetListPermissionRequest);
        const { options } = request;

        const where = this.buildGetPermissionListQuery(options);
        const roles = await this.permissionDataMapper.getListPermission(where, {
            ...(request.page && { skip: (request.page - 1) * (request.limit || DEFAULT_PAGE_SIZE) }),
            ...(request.limit && { take: request.limit || DEFAULT_PAGE_SIZE }),
        });

        return roles;
    }

    private buildGetPermissionListQuery(options?: GetListPermissionOptions): FindOptionsWhere<Permission>[] {
        const { keyword } = options || {};
        const query: FindOptionsWhere<Permission>[] = [];

        if (keyword) {
            query.push({ resource: Like(`${keyword}%`) });
            query.push({ action: Like(`${keyword}%`) });
        }

        return query;
    }

    async getPermissionById(request: GetPermissionByIdRequest): Promise<Permission> {
        await validateRequest(request, GetPermissionByIdRequest);
        const permission = await this.permissionDataMapper.getPermissionById(request.permissionId);
        if (!permission) {
            throw new ItemNotFoundException('Permission not found');
        }

        return permission;
    }

    async updateRolePermissions(request: UpdateRolePermissionsRequest): Promise<boolean> {
        await validateRequest(request, UpdateRolePermissionsRequest);
        const { roleId, permissionIds } = request;

        const permissions = await this.permissionDataMapper.getPermissionByIds(request.permissionIds);
        if (permissions.length !== request.permissionIds.length) {
            throw new ItemNotFoundException('Invalid permissions');
        }
        await this.rolePermissionDataMapper.createRolePermissions(roleId, permissionIds);
        return true;
    }
}

injected(PermissionManagerOperatorImpl, PERMISSION_DATA_MAPPER_TOKEN, ROLE_PERMISSION_DATA_MAPPER_TOKEN);

export const PERMISSION_MANAGER_OPERATOR_TOKEN = token<PermissionManagerOperator>('PermissionManagerOperator');
