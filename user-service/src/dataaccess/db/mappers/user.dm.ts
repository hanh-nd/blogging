import { HttpStatus } from '@src/constants';
import { ErrorWithStatus, ItemNotFoundException } from '@src/utils/errors';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_DATA_SOURCE_TOKEN } from '../client';
import { User } from '../entities';

export interface UserDataMapper {
    createUser(body: User): Promise<User>;
    updateUser(userId: number, body: Partial<User>): Promise<void>;
    deleteUser(userId: number): Promise<void>;
    getUserById(userId: number): Promise<User>;
    getUserByUserName(userName: string): Promise<User>;
    getListUser(where: FindOptionsWhere<User>, options: FindManyOptions<User>): Promise<User[]>;
    getUserCount(where: FindOptionsWhere<User>): Promise<number>;
}

export class UserDataMapperImpl implements UserDataMapper {
    constructor(
        private readonly dataSource: DataSource,
        private readonly logger: Logger,
    ) {}

    createUser(body: User): Promise<User> {
        try {
            return this.dataSource.getRepository(User).save(body);
        } catch (error) {
            this.logger.error(`Failed to update user, ${(error as Error).message}`, body);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateUser(userId: number, body: Partial<User>): Promise<void> {
        try {
            await this.dataSource.getRepository(User).update(
                {
                    userId: userId,
                },
                body,
            );
        } catch (error) {
            this.logger.error(`Failed to update user, ${(error as Error).message}`, userId, body);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteUser(userId: number): Promise<void> {
        try {
            await this.dataSource.getRepository(User).softDelete({ userId: userId });
        } catch (error) {
            this.logger.error(`Failed to delete user, ${(error as Error).message}`, userId);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getUserById(userId: number): Promise<User> {
        let user: User | null;
        try {
            user = await this.dataSource.getRepository(User).findOneBy({ userId: userId });
        } catch (error) {
            this.logger.error(`Failed to get user by id, ${(error as Error).message}`, userId);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!user) throw new ItemNotFoundException('User not found');
        return user;
    }

    async getUserByUserName(userName: string): Promise<User> {
        let user: User | null;
        try {
            user = await this.dataSource.getRepository(User).findOneBy({ userName: userName });
        } catch (error) {
            this.logger.error(`Failed to get user by username, ${(error as Error).message}`, userName);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!user) throw new ItemNotFoundException('User not found');
        return user;
    }

    getListUser(where: FindOptionsWhere<User>, options: FindManyOptions<User>): Promise<User[]> {
        try {
            return this.dataSource.getRepository(User).find({
                where: where,
                ...options,
            });
        } catch (error) {
            this.logger.error(`Failed to get list user, ${(error as Error).message}`, where, options);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getUserCount(where: FindOptionsWhere<User>): Promise<number> {
        try {
            return this.dataSource.getRepository(User).count({
                where: where,
            });
        } catch (error) {
            this.logger.error(`Failed to count users, ${(error as Error).message}`, where);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

injected(UserDataMapperImpl, MY_SQL_DATA_SOURCE_TOKEN, LOGGER_TOKEN);

export const USER_DATA_MAPPER_TOKEN = token<UserDataMapper>('UserDataMapper');
