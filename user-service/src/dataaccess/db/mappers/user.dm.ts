import { GetListUserOptions } from '@src/modules/users/dto';
import { token } from 'brandi';
import { User } from '../entities';

export interface UserDataMapper {
    createUser(body: User): Promise<User>;
    updateUser(body: Partial<User>): Promise<User>;
    deleteUser(userId: number): Promise<boolean>;
    getUserById(userId: number): Promise<User>;
    getUserByUserName(userName: string): Promise<User>;
    getListUser(page: number, limit: number, options?: GetListUserOptions): Promise<User[]>;
    getUserCount(options?: GetListUserOptions): Promise<number>;
}

export class UserDataMapperImpl implements UserDataMapper {
    createUser(body: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    updateUser(body: Partial<User>): Promise<User> {
        throw new Error('Method not implemented.');
    }

    deleteUser(userId: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getUserById(userId: number): Promise<User> {
        throw new Error('Method not implemented.');
    }

    getUserByUserName(userName: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    getListUser(page: number, limit: number, options?: GetListUserOptions | undefined): Promise<User[]> {
        throw new Error('Method not implemented.');
    }

    getUserCount(options?: GetListUserOptions | undefined): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

export const USER_DATA_MAPPER_TOKEN = token<UserDataMapper>('UserDataMapper');
