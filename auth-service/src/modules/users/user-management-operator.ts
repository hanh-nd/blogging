import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_VALUE } from '@src/constants';
import { User } from '@src/dataaccess/db/entities';
import { USER_DATA_MAPPER_TOKEN, UserDataMapper } from '@src/dataaccess/db/mappers/user.dm';
import { ItemExistedException, ItemNotFoundException } from '@src/utils/errors';
import { validateRequest } from '@src/utils/request';
import { injected, token } from 'brandi';
import { FindOptionsWhere, Like } from 'typeorm';
import {
    CreateUserRequest,
    DeleteUserRequest,
    GetListUserOptions,
    GetListUserRequest,
    GetUserByIdRequest,
    GetUserByUserNameRequest,
    GetUserCountRequest,
    UpdateUserRequest,
} from './dto';

export interface UserManagementOperator {
    createUser(request: CreateUserRequest): Promise<User>;
    updateUser(request: UpdateUserRequest): Promise<User>;
    deleteUser(request: DeleteUserRequest): Promise<boolean>;
    getUserById(request: GetUserByIdRequest): Promise<User>;
    getUserByUserName(request: GetUserByUserNameRequest): Promise<User>;
    getListUser(request: GetListUserRequest): Promise<User[]>;
    getUserCount(request: GetUserCountRequest): Promise<number>;
}

export class UserManagementOperatorImpl implements UserManagementOperator {
    constructor(private readonly userDataMapper: UserDataMapper) {}

    async createUser(request: CreateUserRequest): Promise<User> {
        await validateRequest<CreateUserRequest>(request, CreateUserRequest);
        const { userName, email, provider, displayName } = request;

        const user = await this.userDataMapper.getUserBy({ userName });
        if (user) throw new ItemExistedException('User already existed');

        const newUser = this.userDataMapper.from({
            userName,
            email,
            provider,
            displayName: this.sanitizedDisplayName(displayName || userName),
        });

        return this.userDataMapper.createUser(newUser);
    }

    private sanitizedDisplayName(displayName: string) {
        return displayName
            .replace(/[^A-Za-z\s+]/g, '')
            .trim()
            .split(/\s+/)
            .join(' ');
    }

    async updateUser(request: UpdateUserRequest): Promise<User> {
        await validateRequest<UpdateUserRequest>(request, UpdateUserRequest);
        const { userId, displayName, email } = request;

        // Check user existed
        const user = await this.getUserById({ userId });

        const updateUserBody = this.userDataMapper.from({
            ...user,
            ...(displayName && { displayName: this.sanitizedDisplayName(displayName) }),
            ...(email && { email }),
        });

        await this.userDataMapper.updateUser(user.userId, updateUserBody);
        return updateUserBody;
    }

    async deleteUser(request: DeleteUserRequest): Promise<boolean> {
        await validateRequest<DeleteUserRequest>(request, DeleteUserRequest);
        const { userId } = request;

        // Check user existed
        await this.getUserById({ userId });

        await this.userDataMapper.deleteUser(userId);
        return true;
    }

    async getUserById(request: GetUserByIdRequest): Promise<User> {
        await validateRequest<GetUserByIdRequest>(request, GetUserByIdRequest);
        const { userId } = request;

        const user = await this.userDataMapper.getUserById(userId);
        if (!user) throw new ItemNotFoundException('User not found');

        return user;
    }

    async getUserByUserName(request: GetUserByUserNameRequest): Promise<User> {
        await validateRequest<GetUserByUserNameRequest>(request, GetUserByUserNameRequest);
        const { userName } = request;

        const user = await this.userDataMapper.getUserBy({ userName });
        if (!user) throw new ItemNotFoundException('User not found');

        return user;
    }

    async getListUser(request: GetListUserRequest): Promise<User[]> {
        await validateRequest<GetListUserRequest>(request, GetListUserRequest);
        const { page = DEFAULT_PAGE_VALUE, limit = DEFAULT_PAGE_SIZE, options } = request;

        const where = this.buildGetListUserQuery(options);
        const users = await this.userDataMapper.getListUser(where, {
            skip: (page - 1) * limit,
            take: limit,
        });

        return users;
    }

    async getUserCount(request: GetUserCountRequest): Promise<number> {
        await validateRequest<GetUserCountRequest>(request, GetUserCountRequest);
        const { options } = request;

        const where = this.buildGetListUserQuery(options);
        return this.userDataMapper.getUserCount(where);
    }

    private buildGetListUserQuery(options?: GetListUserOptions): FindOptionsWhere<User> {
        const { keyword } = options || {};
        const query: FindOptionsWhere<User> = {};

        if (keyword) {
            query.displayName = Like(`${keyword}%`);
        }

        return query;
    }
}

injected(UserManagementOperatorImpl, USER_DATA_MAPPER_TOKEN);

export const USER_MANAGEMENT_OPERATOR_TOKEN = token<UserManagementOperator>('UserManagementOperator');
