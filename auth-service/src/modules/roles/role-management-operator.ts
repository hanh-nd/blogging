import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_VALUE } from '@src/constants';
import { Role } from '@src/dataaccess/db/entities';
import { ROLE_DATA_MAPPER_TOKEN, RoleDataMapper } from '@src/dataaccess/db/mappers/role.dm';
import { USER_ROLE_DATA_MAPPER_TOKEN, UserRoleDataMapper } from '@src/dataaccess/db/mappers/user-role.dm';
import { ItemExistedException, ItemNotFoundException } from '@src/utils/errors';
import { validateRequest } from '@src/utils/request';
import { injected, token } from 'brandi';
import { FindOptionsWhere, Like } from 'typeorm';
import {
    CreateRoleRequest,
    DeleteRoleRequest,
    GetListRoleOptions,
    GetListRoleRequest,
    GetRoleByIdRequest,
    GetRoleCountRequest,
    UpdateRoleRequest,
    UpdateUserRolesRequest,
} from './dto';

export interface RoleManagementOperator {
    createRole(request: CreateRoleRequest): Promise<Role>;
    updateRole(request: UpdateRoleRequest): Promise<Role>;
    deleteRole(request: DeleteRoleRequest): Promise<boolean>;
    getRoleById(request: GetRoleByIdRequest): Promise<Role>;
    getListRole(request: GetListRoleRequest): Promise<Role[]>;
    getRoleCount(request: GetRoleCountRequest): Promise<number>;
    updateUserRoles(request: UpdateUserRolesRequest): Promise<boolean>;
}

export class RoleManagementOperatorImpl implements RoleManagementOperator {
    constructor(
        private readonly roleDataMapper: RoleDataMapper,
        private readonly userRoleDataMapper: UserRoleDataMapper,
    ) {}

    async createRole(request: CreateRoleRequest): Promise<Role> {
        await validateRequest(request, CreateRoleRequest);
        const existedRole = await this.roleDataMapper.getRoleByName(request.name);
        if (existedRole) {
            throw new ItemExistedException('Role already existed');
        }

        return this.roleDataMapper.createRole(request);
    }

    async updateRole(request: UpdateRoleRequest): Promise<Role> {
        await validateRequest(request, UpdateRoleRequest);
        const role = await this.roleDataMapper.getRoleById(request.roleId);
        if (!role) {
            throw new ItemNotFoundException('Role not found');
        }

        const updateBody = this.roleDataMapper.from({
            ...role,
            ...(request.name && { name: request.name }),
        });

        await this.roleDataMapper.updateRole(role.roleId, updateBody);
        return updateBody;
    }

    async deleteRole(request: DeleteRoleRequest): Promise<boolean> {
        await validateRequest(request, DeleteRoleRequest);
        const role = await this.roleDataMapper.getRoleById(request.roleId);
        if (!role) {
            throw new ItemNotFoundException('Role not found');
        }

        await this.roleDataMapper.deleteRole(request.roleId);
        return true;
    }

    async getRoleById(request: GetRoleByIdRequest): Promise<Role> {
        await validateRequest(request, GetRoleByIdRequest);
        const role = await this.roleDataMapper.getRoleById(request.roleId);
        if (!role) {
            throw new ItemNotFoundException('Role not found');
        }

        return role;
    }

    async getListRole(request: GetListRoleRequest): Promise<Role[]> {
        await validateRequest<GetListRoleRequest>(request, GetListRoleRequest);
        const { page = DEFAULT_PAGE_VALUE, limit = DEFAULT_PAGE_SIZE, options } = request;

        const where = this.buildGetListRoleQuery(options);
        const roles = await this.roleDataMapper.getListRole(where, {
            skip: (page - 1) * limit,
            take: limit,
        });

        return roles;
    }

    async getRoleCount(request: GetRoleCountRequest): Promise<number> {
        await validateRequest<GetRoleCountRequest>(request, GetRoleCountRequest);
        const { options } = request;

        const where = this.buildGetListRoleQuery(options);
        return this.roleDataMapper.getRoleCount(where);
    }

    private buildGetListRoleQuery(options?: GetListRoleOptions): FindOptionsWhere<Role> {
        const { keyword } = options || {};
        const query: FindOptionsWhere<Role> = {};

        if (keyword) {
            query.name = Like(`${keyword}%`);
        }

        return query;
    }

    async updateUserRoles(request: UpdateUserRolesRequest): Promise<boolean> {
        await validateRequest<UpdateUserRolesRequest>(request, UpdateUserRolesRequest);
        const { userId, roleIds } = request;

        const roles = await this.roleDataMapper.getRoleByIds(request.roleIds);
        if (roles.length !== request.roleIds.length) {
            throw new ItemNotFoundException('Invalid roles');
        }
        await this.userRoleDataMapper.createUserRoles(userId, roleIds);
        return true;
    }
}

injected(RoleManagementOperatorImpl, ROLE_DATA_MAPPER_TOKEN, USER_ROLE_DATA_MAPPER_TOKEN);

export const ROLE_MANAGEMENT_OPERATOR_TOKEN = token<RoleManagementOperator>('RoleManagementOperator');
