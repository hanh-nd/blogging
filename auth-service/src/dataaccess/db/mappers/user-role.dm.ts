import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';
import { UserRole } from '../entities/user-role.entity';

export interface UserRoleDataMapper {
    createUserRoles(userId: number, roleIds: number[]): Promise<void>;
    insertUserRoles(userId: number, roleIds: number[]): Promise<void>;
    deleteAllUserRoles(userId: number): Promise<void>;
    getUserRoles(userId: number): Promise<UserRole[]>;
    withTransaction<T>(callback: (dataMapper: UserRoleDataMapper) => Promise<T>): Promise<T>;
}

export class UserRoleDataMapperImpl implements UserRoleDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    createUserRoles(userId: number, roleIds: number[]): Promise<void> {
        return this.withTransaction(async (dataMapper) => {
            await dataMapper.deleteAllUserRoles(userId);
            await dataMapper.insertUserRoles(userId, roleIds);
        });
    }

    @WrapErrorStatus()
    async insertUserRoles(userId: number, roleIds: number[]): Promise<void> {
        await this.entityManager.getRepository(UserRole).insert(
            roleIds.map((roleId) => ({
                roleId,
                userId,
            })),
        );
    }

    @WrapErrorStatus()
    async deleteAllUserRoles(userId: number): Promise<void> {
        await this.entityManager.getRepository(UserRole).delete({
            userId: userId,
        });
    }

    @WrapErrorStatus()
    getUserRoles(userId: number): Promise<UserRole[]> {
        return this.entityManager.getRepository(UserRole).findBy({
            userId: userId,
        });
    }

    @WrapErrorStatus()
    withTransaction<T>(callback: (dataMapper: UserRoleDataMapper) => Promise<T>): Promise<T> {
        return this.entityManager.transaction(async (manager) => {
            const dataMapper = new UserRoleDataMapperImpl(manager, this.logger);
            return callback(dataMapper);
        });
    }
}

injected(UserRoleDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const USER_ROLE_DATA_MAPPER_TOKEN = token<UserRoleDataMapper>('USER_ROLE_DATA_MAPPER_TOKEN');
