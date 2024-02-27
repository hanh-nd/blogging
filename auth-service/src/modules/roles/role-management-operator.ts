import { Role } from '@src/dataaccess/db/entities';
import { token } from 'brandi';
import {
    CreateRoleRequest,
    DeleteRoleRequest,
    GetListRoleRequest,
    GetRoleByIdRequest,
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
    updateUserRoles(request: UpdateUserRolesRequest): Promise<Role[]>;
    getUserRoles(request: GetUserRolesRequest): Promise<Role[]>;
}

export class RoleManagementOperatorImpl implements RoleManagementOperator {
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
    updateUserRoles(request: UpdateUserRolesRequest): Promise<Role[]> {
        throw new Error('Method not implemented.');
    }
    getUserRoles(request: GetUserRolesRequest): Promise<Role[]> {
        throw new Error('Method not implemented.');
    }
}

export const ROLE_MANAGEMENT_OPERATOR_TOKEN = token<RoleManagementOperator>('RoleManagementOperator');
