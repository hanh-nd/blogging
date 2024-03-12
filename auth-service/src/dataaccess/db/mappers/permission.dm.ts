import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager, FindManyOptions, FindOptionsWhere, In } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';
import { Permission } from '../entities';

export interface PermissionDataMapper {
    from(body: Partial<Permission>): Permission;
    createPermission(body: Partial<Permission>): Promise<Permission>;
    updatePermission(permissionId: number, body: Partial<Permission>): Promise<void>;
    deletePermission(permissionId: number): Promise<void>;
    getListPermission(
        where: FindOptionsWhere<Permission> | FindOptionsWhere<Permission>[],
        options: FindManyOptions<Permission>,
    ): Promise<Permission[]>;
    getPermissionById(permissionId: number): Promise<Permission | null>;
    getPermissionByIds(permissionIds: number[]): Promise<Permission[]>;
    getPermissionBy(body: Partial<Permission>): Promise<Permission | null>;
}

export class PermissionDataMapperImpl implements PermissionDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    from(body: Partial<Permission>): Permission {
        return this.entityManager.getRepository(Permission).create(body);
    }

    @WrapErrorStatus()
    createPermission(body: Partial<Permission>): Promise<Permission> {
        return this.entityManager.getRepository(Permission).save(body);
    }

    @WrapErrorStatus()
    async updatePermission(permissionId: number, body: Partial<Permission>): Promise<void> {
        await this.entityManager.getRepository(Permission).update(
            {
                permissionId,
            },
            body,
        );
    }

    @WrapErrorStatus()
    async deletePermission(permissionId: number): Promise<void> {
        await this.entityManager.getRepository(Permission).softDelete({
            permissionId,
        });
    }

    @WrapErrorStatus()
    getListPermission(
        where: FindOptionsWhere<Permission> | FindOptionsWhere<Permission>[],
        options: FindManyOptions<Permission>,
    ): Promise<Permission[]> {
        return this.entityManager.getRepository(Permission).find({
            where,
            ...options,
        });
    }

    @WrapErrorStatus()
    getPermissionById(permissionId: number): Promise<Permission | null> {
        return this.entityManager.getRepository(Permission).findOneBy({
            permissionId,
        });
    }

    @WrapErrorStatus()
    getPermissionByIds(permissionIds: number[]): Promise<Permission[]> {
        return this.entityManager.getRepository(Permission).findBy({
            permissionId: In(permissionIds),
        });
    }

    getPermissionBy(body: Partial<Permission>): Promise<Permission | null> {
        return this.entityManager.getRepository(Permission).findOneBy(body);
    }
}

injected(PermissionDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const PERMISSION_DATA_MAPPER_TOKEN = token<PermissionDataMapper>('PermissionDataMapper');
