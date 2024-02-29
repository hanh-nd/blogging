import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_DATA_SOURCE_TOKEN } from '../client';
import { User } from '../entities';

export interface UserDataMapper {
    from(body: Partial<User>): User;
    createUser(body: User): Promise<User>;
    updateUser(userId: number, body: Partial<User>): Promise<void>;
    deleteUser(userId: number): Promise<void>;
    getUserById(userId: number): Promise<User | null>;
    getUserBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null>;
    getListUser(
        where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
        options: FindManyOptions<User>,
    ): Promise<User[]>;
    getUserCount(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<number>;
}

export class UserDataMapperImpl implements UserDataMapper {
    constructor(
        private readonly dataSource: DataSource,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    from(body: Partial<User>): User {
        return this.dataSource.getRepository(User).create(body);
    }

    @WrapErrorStatus()
    createUser(body: User): Promise<User> {
        return this.dataSource.getRepository(User).save(body);
    }

    @WrapErrorStatus()
    async updateUser(userId: number, body: Partial<User>): Promise<void> {
        await this.dataSource.getRepository(User).update(
            {
                userId: userId,
            },
            body,
        );
    }

    @WrapErrorStatus()
    async deleteUser(userId: number): Promise<void> {
        await this.dataSource.getRepository(User).softDelete({ userId: userId });
    }

    @WrapErrorStatus()
    async getUserById(userId: number): Promise<User | null> {
        return this.dataSource.getRepository(User).findOneBy({ userId: userId });
    }

    @WrapErrorStatus()
    async getUserBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null> {
        return this.dataSource.getRepository(User).findOneBy(where);
    }

    @WrapErrorStatus()
    getListUser(
        where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
        options: FindManyOptions<User>,
    ): Promise<User[]> {
        return this.dataSource.getRepository(User).find({
            where: where,
            ...options,
        });
    }

    @WrapErrorStatus()
    getUserCount(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<number> {
        return this.dataSource.getRepository(User).countBy(where);
    }
}

injected(UserDataMapperImpl, MY_SQL_DATA_SOURCE_TOKEN, LOGGER_TOKEN);

export const USER_DATA_MAPPER_TOKEN = token<UserDataMapper>('UserDataMapper');
