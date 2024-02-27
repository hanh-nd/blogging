import { sendUnaryData, status } from '@grpc/grpc-js';
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
    UpdateUserRequest,
} from '@src/modules/users/dto';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { Logger } from 'winston';
import { USER_MANAGEMENT_OPERATOR_TOKEN, UserManagementOperator } from '../../modules/users/user-management-operator';
import { UserServiceHandlers } from '../../proto/gen/UserService';
import { ErrorWithStatus } from '../../utils/errors';
import { HttpStatusConverter } from '../../utils/http-status';

export class UserServiceHandlersFactory {
    constructor(
        private logger: Logger,
        private readonly userManagementOperator: UserManagementOperator,
        private readonly userPasswordManagementOperator: UserPasswordManagementOperator,
    ) {}

    public getHandlers(): UserServiceHandlers {
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
    UserServiceHandlersFactory,
    LOGGER_TOKEN,
    USER_MANAGEMENT_OPERATOR_TOKEN,
    USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN,
);

export const USER_SERVICE_HANDLERS_FACTORY_TOKEN = token<UserServiceHandlersFactory>('UserServiceHandlersFactory');
