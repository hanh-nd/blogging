import { HttpStatus } from '@src/constants';
import { ErrorWithStatus } from '@src/utils/errors';
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

    from(body: Partial<UserPassword>): UserPassword {
        return this.dataSource.getRepository(UserPassword).create(body);
    }

    async createUserPassword(body: UserPassword): Promise<UserPassword> {
        try {
            return this.withTransaction(async (manager: EntityManager) => {
                await manager.getRepository(UserPassword).softDelete({ userId: body.userId });
                return manager.getRepository(UserPassword).save(body);
            });
        } catch (error) {
            this.logger.error(`Failed to create user password: ${(error as Error).message}`, body);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getUserPasswordByUserId(userId: number): Promise<UserPassword | null> {
        try {
            return this.dataSource.getRepository(UserPassword).findOneBy({ userId });
        } catch (error) {
            this.logger.error(`Failed to get user password by id: ${(error as Error).message}`, userId);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getUserPasswordsLock(userId: number): Promise<UserPassword[]> {
        try {
            return this.withTransaction(async (manager: EntityManager) => {
                return manager
                    .getRepository(UserPassword)
                    .find({ where: { userId }, lock: { mode: 'pessimistic_write' }, withDeleted: true });
            });
        } catch (error) {
            this.logger.error(`Failed to get user password by id with lock: ${(error as Error).message}`, userId);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    withTransaction<T>(callback: (manager: EntityManager) => Promise<T>, isolationLevel?: IsolationLevel): Promise<T> {
        if (isolationLevel) {
            return this.dataSource.transaction(isolationLevel, callback);
        }
        return this.dataSource.transaction(callback);
    }
}

injected(UserPasswordDataMapperImpl, MY_SQL_DATA_SOURCE_TOKEN, LOGGER_TOKEN);

export const USER_PASSWORD_DATA_MAPPER_TOKEN = token<UserPasswordDataMapper>('UserPasswordDataMapper');
