import { sendUnaryData, status } from '@grpc/grpc-js';
import { injected, token } from 'brandi';
import { USER_MANAGEMENT_OPERATOR_TOKEN, UserManagementOperator } from '../../modules/users/user-management-operator';
import { UserServiceHandlers } from '../../proto/gen/UserService';
import { ErrorWithStatus } from '../../utils/errors';
import { HttpStatusConverter } from '../../utils/http-status';

export class UserServiceHandlersFactory {
    constructor(private readonly userManagementOperator: UserManagementOperator) {}

    public getHandlers(): UserServiceHandlers {
        return {
            CreateUser: ({ request }, callback) => {},
            UpdateUser: ({ request }, callback) => {},
            DeleteUser: ({ request }, callback) => {},
            GetUserById: ({ request }, callback) => {},
            GetUserByUserName: ({ request }, callback) => {},
            GetListUser: ({ request }, callback) => {},
            GetUserCount: ({ request }, callback) => {},
            CreateUserPassword: ({ request }, callback) => {},
            GetUserPasswordByUserId: ({ request }, callback) => {},
        };
    }

    private handleError(e: unknown, callback: sendUnaryData<any>) {
        if (e instanceof ErrorWithStatus) {
            const status = HttpStatusConverter.toGRPCStatus(e.status);
            return callback({
                message: e.message,
                code: status,
            });
        } else if (e instanceof Error) {
            return callback({
                message: e.message,
                code: status.INTERNAL,
            });
        } else {
            return callback({
                code: status.INTERNAL,
            });
        }
    }
}

injected(UserServiceHandlersFactory, USER_MANAGEMENT_OPERATOR_TOKEN);

export const USER_SERVICE_HANDLERS_FACTORY_TOKEN = token<UserServiceHandlersFactory>('UserServiceHandlersFactory');
