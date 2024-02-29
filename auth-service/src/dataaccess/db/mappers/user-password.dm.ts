import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { DataSource, EntityManager } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { Logger } from 'winston';
import { MY_SQL_DATA_SOURCE_TOKEN } from '../client';
import { UserPassword } from '../entities';

export interface UserPasswordDataMapper {
    from(body: Partial<UserPassword>): UserPassword;
    createUserPassword(body: UserPassword): Promise<UserPassword>;
    getUserPasswordByUserId(userId: number): Promise<UserPassword | null>;
    getUserPasswordsLock(userId: number): Promise<UserPassword[]>;
    withTransaction<T>(callback: (manager: EntityManager) => Promise<T>, isolationLevel?: IsolationLevel): Promise<T>;
}

export class UserPasswordDataMapperImpl implements UserPasswordDataMapper {
    constructor(
        private readonly dataSource: DataSource,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    from(body: Partial<UserPassword>): UserPassword {
        return this.dataSource.getRepository(UserPassword).create(body);
    }

    @WrapErrorStatus()
    async createUserPassword(body: UserPassword): Promise<UserPassword> {
        return this.withTransaction(async (manager: EntityManager) => {
            await manager.getRepository(UserPassword).softDelete({ userId: body.userId });
            return manager.getRepository(UserPassword).save(body);
        });
    }

    @WrapErrorStatus()
    getUserPasswordByUserId(userId: number): Promise<UserPassword | null> {
        return this.dataSource.getRepository(UserPassword).findOneBy({ userId });
    }

    @WrapErrorStatus()
    getUserPasswordsLock(userId: number): Promise<UserPassword[]> {
        return this.withTransaction(async (manager: EntityManager) => {
            return manager
                .getRepository(UserPassword)
                .find({ where: { userId }, lock: { mode: 'pessimistic_write' }, withDeleted: true });
        });
    }

    @WrapErrorStatus()
    withTransaction<T>(callback: (manager: EntityManager) => Promise<T>, isolationLevel?: IsolationLevel): Promise<T> {
        if (isolationLevel) {
            return this.dataSource.transaction(isolationLevel, callback);
        }
        return this.dataSource.transaction(callback);
    }
}

injected(UserPasswordDataMapperImpl, MY_SQL_DATA_SOURCE_TOKEN, LOGGER_TOKEN);

export const USER_PASSWORD_DATA_MAPPER_TOKEN = token<UserPasswordDataMapper>('UserPasswordDataMapper');
