import { sendUnaryData, status } from '@grpc/grpc-js';
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
    ) {}

    public getHandlers(): AuthServiceHandlers {
        return {
            CreateUser: async ({ request }, callback) => {
                try {
                    const createdUser = await this.userManagementOperator.createUser(request as CreateUserRequest);
                    return callback(null, { user: createdUser });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            UpdateUser: async ({ request }, callback) => {
                try {
                    const updatedUser = await this.userManagementOperator.updateUser(request as UpdateUserRequest);
                    return callback(null, { user: updatedUser });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            DeleteUser: async ({ request }, callback) => {
                try {
                    const deleteResult = await this.userManagementOperator.deleteUser(request as DeleteUserRequest);
                    return callback(null, { deleted: deleteResult });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetUserById: async ({ request }, callback) => {
                try {
                    const user = await this.userManagementOperator.getUserById(request as GetUserByIdRequest);
                    return callback(null, { user: user });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetUserByUserName: async ({ request }, callback) => {
                try {
                    const user = await this.userManagementOperator.getUserByUserName(
                        request as GetUserByUserNameRequest,
                    );
                    return callback(null, { user: user });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetListUser: async ({ request }, callback) => {
                try {
                    const users = await this.userManagementOperator.getListUser(request as GetListUserRequest);
                    return callback(null, { users: users });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetUserCount: async ({ request }, callback) => {
                try {
                    const count = await this.userManagementOperator.getUserCount(request as GetUserCountRequest);
                    return callback(null, { count: count });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            CreateUserPassword: async ({ request }, callback) => {
                try {
                    const userPassword = await this.userPasswordManagementOperator.createUserPassword(
                        request as CreateUserPasswordRequest,
                    );
                    return callback(null, { userPassword: userPassword });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetUserPasswordByUserId: async ({ request }, callback) => {
                try {
                    const userPassword = await this.userPasswordManagementOperator.getUserPasswordByUserId(
                        request as GetUserPasswordByUserIdRequest,
                    );
                    return callback(null, { userPassword: userPassword });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            LoginByPassword: async ({ request }, callback) => {
                try {
                    const authResponse = await this.userManagementOperator.loginByPassword(
                        request as LoginByPasswordRequest,
                    );
                    return callback(null, { token: authResponse });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetUserRoles: async ({ request }, callback) => {
                try {
                    const roles = await this.userManagementOperator.getUserRoles(request as GetUserRolesRequest);
                    return callback(null, { roles: roles });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            CreateRole: async ({ request }, callback) => {
                try {
                    const role = await this.roleManagementOperator.createRole(request as CreateRoleRequest);
                    return callback(null, { role: role });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            UpdateRole: async ({ request }, callback) => {
                try {
                    const role = await this.roleManagementOperator.updateRole(request as UpdateRoleRequest);
                    return callback(null, { role: role });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            DeleteRole: async ({ request }, callback) => {
                try {
                    const deleted = await this.roleManagementOperator.deleteRole(request as DeleteRoleRequest);
                    return callback(null, { deleted: deleted });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetRoleById: async ({ request }, callback) => {
                try {
                    const role = await this.roleManagementOperator.getRoleById(request as GetRoleByIdRequest);
                    return callback(null, { role: role });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetListRole: async ({ request }, callback) => {
                try {
                    const roles = await this.roleManagementOperator.getListRole(request as GetListRoleRequest);
                    return callback(null, { roles: roles });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            GetRoleCount: async ({ request }, callback) => {
                try {
                    const count = await this.roleManagementOperator.getRoleCount(request);
                    return callback(null, { count: count });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
            UpdateUserRoles: async ({ request }, callback) => {
                try {
                    const updated = await this.roleManagementOperator.updateUserRoles(
                        request as UpdateUserRolesRequest,
                    );
                    return callback(null, { updated: updated });
                } catch (error) {
                    return this.handleError(error, callback);
                }
            },
        };
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
);

export const AUTH_SERVICE_HANDLERS_FACTORY_TOKEN = token<AuthServiceHandlersFactory>('AuthServiceHandlersFactory');
