import { sendUnaryData, status } from '@grpc/grpc-js';
import {
    CreatePermissionRequest,
    DeletePermissionRequest,
    GetListPermissionRequest,
    GetPermissionByIdRequest,
    UpdatePermissionRequest,
    UpdateRolePermissionsRequest,
} from '@src/modules/permissions/dto';
import {
    PERMISSION_MANAGER_OPERATOR_TOKEN,
    PermissionManagerOperator,
} from '@src/modules/permissions/permission-manager-operator';
import {
    CreateRoleRequest,
    DeleteRoleRequest,
    GetListRoleRequest,
    GetRoleByIdRequest,
    UpdateRoleRequest,
    UpdateUserRolesRequest,
} from '@src/modules/roles/dto';
import { ROLE_MANAGEMENT_OPERATOR_TOKEN, RoleManagementOperator } from '@src/modules/roles/role-management-operator';
import { CreateUserPasswordRequest, GetUserPasswordByUserIdRequest } from '@src/modules/user-passwords/dto';
import {
    USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN,
    UserPasswordManagementOperator,
} from '@src/modules/user-passwords/user-password-management-operator';
import {
    CreateUserRequest,
    DeleteUserRequest,
    GetListUserRequest,
    GetUserByIdRequest,
    GetUserByUserNameRequest,
    GetUserCountRequest,
    GetUserRolesRequest,
    LoginByPasswordRequest,
    UpdateUserRequest,
} from '@src/modules/users/dto';
import { AuthServiceHandlers } from '@src/proto/gen/AuthService';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { Logger } from 'winston';
import { USER_MANAGEMENT_OPERATOR_TOKEN, UserManagementOperator } from '../../modules/users/user-management-operator';
import { ErrorWithStatus } from '../../utils/errors';
import { HttpStatusConverter } from '../../utils/http-status';

export class AuthServiceHandlersFactory {
    constructor(
        private logger: Logger,
        private readonly userManagementOperator: UserManagementOperator,
        private readonly userPasswordManagementOperator: UserPasswordManagementOperator,
        private readonly roleManagementOperator: RoleManagementOperator,
        private readonly permissionManagementOperator: PermissionManagerOperator,
    ) {}

    public getHandlers(): AuthServiceHandlers {
        const handlers: AuthServiceHandlers = {
            CreateUser: async ({ request }, callback) => {
                const createdUser = await this.userManagementOperator.createUser(request as CreateUserRequest);
                return callback(null, { user: createdUser });
            },
            UpdateUser: async ({ request }, callback) => {
                const updatedUser = await this.userManagementOperator.updateUser(request as UpdateUserRequest);
                return callback(null, { user: updatedUser });
            },
            DeleteUser: async ({ request }, callback) => {
                const deleteResult = await this.userManagementOperator.deleteUser(request as DeleteUserRequest);
                return callback(null, { deleted: deleteResult });
            },
            GetUserById: async ({ request }, callback) => {
                const user = await this.userManagementOperator.getUserById(request as GetUserByIdRequest);
                return callback(null, { user: user });
            },
            GetUserByUserName: async ({ request }, callback) => {
                const user = await this.userManagementOperator.getUserByUserName(request as GetUserByUserNameRequest);
                return callback(null, { user: user });
            },
            GetListUser: async ({ request }, callback) => {
                const users = await this.userManagementOperator.getListUser(request as GetListUserRequest);
                return callback(null, { users: users });
            },
            GetUserCount: async ({ request }, callback) => {
                const count = await this.userManagementOperator.getUserCount(request as GetUserCountRequest);
                return callback(null, { count: count });
            },
            CreateUserPassword: async ({ request }, callback) => {
                const userPassword = await this.userPasswordManagementOperator.createUserPassword(
                    request as CreateUserPasswordRequest,
                );
                return callback(null, { userPassword: userPassword });
            },
            GetUserPasswordByUserId: async ({ request }, callback) => {
                const userPassword = await this.userPasswordManagementOperator.getUserPasswordByUserId(
                    request as GetUserPasswordByUserIdRequest,
                );
                return callback(null, { userPassword: userPassword });
            },
            LoginByPassword: async ({ request }, callback) => {
                const authResponse = await this.userManagementOperator.loginByPassword(
                    request as LoginByPasswordRequest,
                );
                return callback(null, authResponse);
            },
            GetUserRoles: async ({ request }, callback) => {
                const roles = await this.userManagementOperator.getUserRoles(request as GetUserRolesRequest);
                return callback(null, { roles: roles });
            },
            CreateRole: async ({ request }, callback) => {
                const role = await this.roleManagementOperator.createRole(request as CreateRoleRequest);
                return callback(null, { role: role });
            },
            UpdateRole: async ({ request }, callback) => {
                const role = await this.roleManagementOperator.updateRole(request as UpdateRoleRequest);
                return callback(null, { role: role });
            },
            DeleteRole: async ({ request }, callback) => {
                const deleted = await this.roleManagementOperator.deleteRole(request as DeleteRoleRequest);
                return callback(null, { deleted: deleted });
            },
            GetRoleById: async ({ request }, callback) => {
                const role = await this.roleManagementOperator.getRoleById(request as GetRoleByIdRequest);
                return callback(null, { role: role });
            },
            GetListRole: async ({ request }, callback) => {
                const roles = await this.roleManagementOperator.getListRole(request as GetListRoleRequest);
                return callback(null, { roles: roles });
            },
            GetRoleCount: async ({ request }, callback) => {
                const count = await this.roleManagementOperator.getRoleCount(request);
                return callback(null, { count: count });
            },
            UpdateUserRoles: async ({ request }, callback) => {
                const updated = await this.roleManagementOperator.updateUserRoles(request as UpdateUserRolesRequest);
                return callback(null, { updated: updated });
            },
            CreatePermission: async ({ request }, callback) => {
                const permission = await this.permissionManagementOperator.createPermission(
                    request as CreatePermissionRequest,
                );
                return callback(null, { permission: permission });
            },
            UpdatePermission: async ({ request }, callback) => {
                const permission = await this.permissionManagementOperator.updatePermission(
                    request as UpdatePermissionRequest,
                );
                return callback(null, { permission: permission });
            },
            DeletePermission: async ({ request }, callback) => {
                const deleted = await this.permissionManagementOperator.deletePermission(
                    request as DeletePermissionRequest,
                );
                return callback(null, { deleted: deleted });
            },
            GetPermissionById: async ({ request }, callback) => {
                const permission = await this.permissionManagementOperator.getPermissionById(
                    request as GetPermissionByIdRequest,
                );
                return callback(null, { permission: permission });
            },
            GetListPermission: async ({ request }, callback) => {
                const permissions = await this.permissionManagementOperator.getListPermission(
                    request as GetListPermissionRequest,
                );
                return callback(null, { permissions: permissions });
            },
            UpdateRolePermissions: async ({ request }, callback) => {
                const updated = await this.permissionManagementOperator.updateRolePermissions(
                    request as UpdateRolePermissionsRequest,
                );
                return callback(null, { updated: updated });
            },
        };

        Object.keys(handlers).forEach((key) => {
            const originalHandler = handlers[key];
            handlers[key] = async ({ request }: any, callback: any) => {
                try {
                    return await originalHandler({ request } as any, callback);
                } catch (error) {
                    return this.handleError(error, callback);
                }
            };
        });

        return handlers;
    }

    private handleError(error: unknown, callback: sendUnaryData<any>) {
        this.logger.error(error);
        if (error instanceof ErrorWithStatus) {
            const status = HttpStatusConverter.toGRPCStatus(error.status);
            return callback({
                message: error.message,
                code: status,
            });
        } else if (error instanceof Error) {
            return callback({
                message: error.message,
                code: status.INTERNAL,
            });
        } else {
            return callback({
                code: status.INTERNAL,
            });
        }
    }
}

injected(
    AuthServiceHandlersFactory,
    LOGGER_TOKEN,
    USER_MANAGEMENT_OPERATOR_TOKEN,
    USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN,
    ROLE_MANAGEMENT_OPERATOR_TOKEN,
    PERMISSION_MANAGER_OPERATOR_TOKEN,
);

export const AUTH_SERVICE_HANDLERS_FACTORY_TOKEN = token<AuthServiceHandlersFactory>('AuthServiceHandlersFactory');
