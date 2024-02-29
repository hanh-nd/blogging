import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';
import { UserPassword } from '../entities';

export interface UserPasswordDataMapper {
    from(body: Partial<UserPassword>): UserPassword;
    createUserPasswordLock(body: UserPassword): Promise<UserPassword>;
    getUserPasswordByUserId(userId: number): Promise<UserPassword | null>;
    getUserPasswordsLock(userId: number): Promise<UserPassword[]>;
    withTransaction<T>(
        callback: (dm: UserPasswordDataMapper) => Promise<T>,
        isolationLevel?: IsolationLevel,
    ): Promise<T>;
}

export class UserPasswordDataMapperImpl implements UserPasswordDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    from(body: Partial<UserPassword>): UserPassword {
        return this.entityManager.getRepository(UserPassword).create(body);
    }

    @WrapErrorStatus()
    async createUserPasswordLock(body: UserPassword): Promise<UserPassword> {
        await this.entityManager.getRepository(UserPassword).softDelete({ userId: body.userId });
        return this.entityManager.getRepository(UserPassword).save(body);
    }

    @WrapErrorStatus()
    getUserPasswordByUserId(userId: number): Promise<UserPassword | null> {
        return this.entityManager.getRepository(UserPassword).findOneBy({ userId });
    }

    @WrapErrorStatus()
    getUserPasswordsLock(userId: number): Promise<UserPassword[]> {
        return this.entityManager
            .getRepository(UserPassword)
            .find({ where: { userId }, lock: { mode: 'pessimistic_write' }, withDeleted: true });
    }

    @WrapErrorStatus()
    withTransaction<T>(
        callback: (dm: UserPasswordDataMapper) => Promise<T>,
        isolationLevel?: IsolationLevel,
    ): Promise<T> {
        if (isolationLevel) {
            return this.entityManager.transaction(isolationLevel, (manager: EntityManager) => {
                const dm = new UserPasswordDataMapperImpl(manager, this.logger);
                return callback(dm);
            });
        }
        return this.entityManager.transaction((manager: EntityManager) => {
            const dm = new UserPasswordDataMapperImpl(manager, this.logger);
            return callback(dm);
        });
    }
}

injected(UserPasswordDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const USER_PASSWORD_DATA_MAPPER_TOKEN = token<UserPasswordDataMapper>('UserPasswordDataMapper');
