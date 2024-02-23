import { UserPassword } from '@src/dataaccess/db/entities';
import { USER_PASSWORD_DATA_MAPPER_TOKEN, UserPasswordDataMapper } from '@src/dataaccess/db/mappers/user-password.dm';
import { ItemNotFoundException } from '@src/utils/errors';
import { validateRequest } from '@src/utils/request';
import { injected, token } from 'brandi';
import { CreateUserPasswordRequest, GetUserPasswordByUserIdRequest } from './dto';

export interface UserPasswordManagementOperator {
    createUserPassword(request: CreateUserPasswordRequest): Promise<UserPassword>;
    getUserPasswordByUserId(request: GetUserPasswordByUserIdRequest): Promise<UserPassword>;
}

export class UserPasswordManagementOperatorImpl implements UserPasswordManagementOperator {
    constructor(private readonly userPasswordDataMapper: UserPasswordDataMapper) {}

    async createUserPassword(request: CreateUserPasswordRequest): Promise<UserPassword> {
        await validateRequest<CreateUserPasswordRequest>(request, CreateUserPasswordRequest);

        const newUserPassword = this.userPasswordDataMapper.from(request);
        return this.userPasswordDataMapper.createUserPassword(newUserPassword);
    }

    async getUserPasswordByUserId(request: GetUserPasswordByUserIdRequest): Promise<UserPassword> {
        await validateRequest<GetUserPasswordByUserIdRequest>(request, GetUserPasswordByUserIdRequest);
        const { userId } = request;

        const userPassword = await this.userPasswordDataMapper.getUserPasswordByUserId(userId);
        if (!userPassword) throw new ItemNotFoundException('This user does not have a password');

        return userPassword;
    }
}

injected(UserPasswordManagementOperatorImpl, USER_PASSWORD_DATA_MAPPER_TOKEN);

export const USER_PASSWORD_MANAGEMENT_OPERATOR_TOKEN = token<UserPasswordManagementOperator>(
    'UserPasswordManagementOperator',
);
