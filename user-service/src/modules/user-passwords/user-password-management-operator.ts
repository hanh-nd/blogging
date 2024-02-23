import { UserPassword } from '@src/dataaccess/db/entities';
import { USER_PASSWORD_DATA_MAPPER_TOKEN, UserPasswordDataMapper } from '@src/dataaccess/db/mappers/user-password.dm';
import { injected, token } from 'brandi';
import { CreateUserPasswordRequest } from './dto';

export interface UserPasswordManagementOperator {
    createUserPassword(request: CreateUserPasswordRequest): Promise<UserPassword>;
    getUserPasswordByUserId(userId: number): Promise<UserPassword>;
}

export class UserPasswordManagementOperatorImpl implements UserPasswordManagementOperator {
    constructor(private readonly userPasswordDataMapper: UserPasswordDataMapper) {}

    createUserPassword(request: CreateUserPasswordRequest): Promise<UserPassword> {
        throw new Error('Method not implemented.');
    }
    getUserPasswordByUserId(userId: number): Promise<UserPassword> {
        throw new Error('Method not implemented.');
    }
}

injected(UserPasswordManagementOperatorImpl, USER_PASSWORD_DATA_MAPPER_TOKEN);

export const USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN = token<UserPasswordManagementOperator>(
    'UserPasswordManagementOperator',
);
