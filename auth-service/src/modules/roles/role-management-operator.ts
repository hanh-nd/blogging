import { Role } from '@src/dataaccess/db/entities';
import { ROLE_DATA_MAPPER_TOKEN, RoleDataMapper } from '@src/dataaccess/db/mappers/role.dm';
import { USER_DATA_MAPPER_TOKEN, UserDataMapper } from '@src/dataaccess/db/mappers/user.dm';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { Logger } from 'winston';
import {
    CreateRoleRequest,
    DeleteRoleRequest,
    GetListRoleRequest,
    GetRoleByIdRequest,
    GetRoleCountRequest,
    GetUserRolesRequest,
    UpdateRoleRequest,
    UpdateUserRolesRequest,
} from './dto';

export interface RoleManagementOperator {
    createRole(request: CreateRoleRequest): Promise<Role>;
    updateRole(request: UpdateRoleRequest): Promise<Role>;
    deleteRole(request: DeleteRoleRequest): Promise<void>;
    getRoleById(request: GetRoleByIdRequest): Promise<Role>;
    getListRole(request: GetListRoleRequest): Promise<Role[]>;
    getRoleCount(request: GetRoleCountRequest): Promise<number>;
    updateUserRoles(request: UpdateUserRolesRequest): Promise<Role[]>;
    getUserRoles(request: GetUserRolesRequest): Promise<Role[]>;
}

export class RoleManagementOperatorImpl implements RoleManagementOperator {
    constructor(
        private readonly logger: Logger,
        private readonly roleDataMapper: RoleDataMapper,
        private readonly userDataMapper: UserDataMapper,
    ) {}

    createRole(request: CreateRoleRequest): Promise<Role> {
        throw new Error('Method not implemented.');
    }

    updateRole(request: UpdateRoleRequest): Promise<Role> {
        throw new Error('Method not implemented.');
    }

    deleteRole(request: DeleteRoleRequest): Promise<void> {
        throw new Error('Method not implemented.');
    }

    getRoleById(request: GetRoleByIdRequest): Promise<Role> {
        throw new Error('Method not implemented.');
    }

    getListRole(request: GetListRoleRequest): Promise<Role[]> {
        throw new Error('Method not implemented.');
    }

    getRoleCount(request: GetRoleCountRequest): Promise<number> {
        throw new Error('Method not implemented.');
    }

    updateUserRoles(request: UpdateUserRolesRequest): Promise<Role[]> {
        throw new Error('Method not implemented.');
    }

    getUserRoles(request: GetUserRolesRequest): Promise<Role[]> {
        throw new Error('Method not implemented.');
    }
}

injected(RoleManagementOperatorImpl, LOGGER_TOKEN, ROLE_DATA_MAPPER_TOKEN, USER_DATA_MAPPER_TOKEN);

export const ROLE_MANAGEMENT_OPERATOR_TOKEN = token<RoleManagementOperator>('RoleManagementOperator');
