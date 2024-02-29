import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';
import { User } from '../entities';

export interface UserDataMapper {
    from(body: Partial<User>): User;
    createUser(body: User): Promise<User>;
    updateUser(userId: number, body: Partial<User>): Promise<void>;
    deleteUser(userId: number): Promise<void>;
    getUserById(userId: number, options?: FindOneOptions<User>): Promise<User | null>;
    getUserBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null>;
    getListUser(
        where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
        options: FindManyOptions<User>,
    ): Promise<User[]>;
    getUserCount(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<number>;
}

export class UserDataMapperImpl implements UserDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    from(body: Partial<User>): User {
        return this.entityManager.getRepository(User).create(body);
    }

    @WrapErrorStatus()
    createUser(body: User): Promise<User> {
        return this.entityManager.getRepository(User).save(body);
    }

    @WrapErrorStatus()
    async updateUser(userId: number, body: Partial<User>): Promise<void> {
        await this.entityManager.getRepository(User).update(
            {
                userId: userId,
            },
            body,
        );
    }

    @WrapErrorStatus()
    async deleteUser(userId: number): Promise<void> {
        await this.entityManager.getRepository(User).softDelete({ userId: userId });
    }

    @WrapErrorStatus()
    async getUserById(userId: number, options?: FindOneOptions<User>): Promise<User | null> {
        return this.entityManager.getRepository(User).findOne({
            where: {
                userId: userId,
            },
            ...options,
        });
    }

    @WrapErrorStatus()
    async getUserBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null> {
        return this.entityManager.getRepository(User).findOneBy(where);
    }

    @WrapErrorStatus()
    getListUser(
        where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
        options: FindManyOptions<User>,
    ): Promise<User[]> {
        return this.entityManager.getRepository(User).find({
            where: where,
            ...options,
        });
    }

    @WrapErrorStatus()
    getUserCount(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<number> {
        return this.entityManager.getRepository(User).countBy(where);
    }
}

injected(UserDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const USER_DATA_MAPPER_TOKEN = token<UserDataMapper>('UserDataMapper');
