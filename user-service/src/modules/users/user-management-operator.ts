import { User } from '@src/dataaccess/db/entities';
import { token } from 'brandi';
import {
    CreateUserRequest,
    DeleteUserRequest,
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
    constructor() {}

    createUser(request: CreateUserRequest): Promise<User> {
        throw new Error('Method not implemented.');
    }

    updateUser(request: UpdateUserRequest): Promise<User> {
        throw new Error('Method not implemented.');
    }

    deleteUser(request: DeleteUserRequest): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getUserById(request: GetUserByIdRequest): Promise<User> {
        throw new Error('Method not implemented.');
    }

    getUserByUserName(request: GetUserByUserNameRequest): Promise<User> {
        throw new Error('Method not implemented.');
    }

    getListUser(request: GetListUserRequest): Promise<User[]> {
        throw new Error('Method not implemented.');
    }

    getUserCount(request: GetUserCountRequest): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export const USER_MANAGEMENT_OPERATOR_TOKEN = token<UserManagementOperator>('UserManagementOperator');
