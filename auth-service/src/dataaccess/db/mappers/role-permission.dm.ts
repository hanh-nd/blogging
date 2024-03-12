import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';
import { RolePermission } from '../entities';

export interface RolePermissionDataMapper {
    createRolePermissions(roleId: number, permissionIds: number[]): Promise<void>;
    insertRolePermissions(roleId: number, permissionIds: number[]): Promise<void>;
    deleteAllRolePermissions(roleId: number): Promise<void>;
    getRolePermissions(roleId: number): Promise<RolePermission[]>;
    withTransaction<T>(callback: (dataMapper: RolePermissionDataMapper) => Promise<T>): Promise<T>;
}

export class RolePermissionDataMapperImpl implements RolePermissionDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    createRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
        return this.withTransaction(async (dataMapper) => {
            await dataMapper.deleteAllRolePermissions(roleId);
            await dataMapper.insertRolePermissions(roleId, permissionIds);
        });
    }

    @WrapErrorStatus()
    async insertRolePermissions(roleId: number, permissionIds: number[]): Promise<void> {
        await this.entityManager
            .getRepository(RolePermission)
            .insert(permissionIds.map((permissionId) => ({ roleId, permissionId })));
    }

    @WrapErrorStatus()
    async deleteAllRolePermissions(roleId: number): Promise<void> {
        await this.entityManager.getRepository(RolePermission).delete({ roleId });
    }

    @WrapErrorStatus()
    getRolePermissions(roleId: number): Promise<RolePermission[]> {
        return this.entityManager.getRepository(RolePermission).findBy({ roleId });
    }

    @WrapErrorStatus()
    withTransaction<T>(callback: (dataMapper: RolePermissionDataMapper) => Promise<T>): Promise<T> {
        return this.entityManager.transaction(async (manager: EntityManager) => {
            return callback(new RolePermissionDataMapperImpl(manager, this.logger));
        });
    }
}

injected(RolePermissionDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const ROLE_PERMISSION_DATA_MAPPER_TOKEN = token<RolePermissionDataMapper>('RolePermissionDataMapper');
