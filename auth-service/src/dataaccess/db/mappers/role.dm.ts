import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager, FindManyOptions, FindOptionsWhere, In } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';
import { Role } from '../entities';

export interface RoleDataMapper {
    from(body: Partial<Role>): Role;
    createRole(body: Partial<Role>): Promise<Role>;
    updateRole(roleId: number, body: Partial<Role>): Promise<void>;
    deleteRole(roleId: number): Promise<void>;
    deleteRoles(roleIds: number[]): Promise<void>;
    getRoleById(roleId: number): Promise<Role | null>;
    getRoleByIds(roleIds: number[]): Promise<Role[]>;
    getRoleByName(name: string): Promise<Role | null>;
    getListRole(
        where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
        options: FindManyOptions<Role>,
    ): Promise<Role[]>;
    getRoleCount(where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[]): Promise<number>;
    withTransaction<T>(callback: (dataMapper: RoleDataMapper) => Promise<T>): Promise<T>;
}

export class RoleDataMapperImpl implements RoleDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    from(body: Partial<Role>): Role {
        return this.entityManager.getRepository(Role).create(body);
    }

    @WrapErrorStatus()
    createRole(body: Partial<Role>): Promise<Role> {
        return this.entityManager.getRepository(Role).save(body);
    }

    @WrapErrorStatus()
    async updateRole(roleId: number, body: Partial<Role>): Promise<void> {
        await this.entityManager.getRepository(Role).update(
            {
                roleId: roleId,
            },
            body,
        );
    }

    @WrapErrorStatus()
    async deleteRole(roleId: number): Promise<void> {
        await this.entityManager.getRepository(Role).softDelete({
            roleId: roleId,
        });
    }

    @WrapErrorStatus()
    async deleteRoles(roleIds: number[]): Promise<void> {
        await this.entityManager.getRepository(Role).softDelete({
            roleId: In(roleIds),
        });
    }

    @WrapErrorStatus()
    getRoleById(roleId: number): Promise<Role | null> {
        return this.entityManager.getRepository(Role).findOneBy({
            roleId: roleId,
        });
    }

    @WrapErrorStatus()
    getRoleByIds(roleIds: number[]): Promise<Role[]> {
        return this.entityManager.getRepository(Role).findBy({
            roleId: In(roleIds),
        });
    }

    @WrapErrorStatus()
    getRoleByName(roleName: string): Promise<Role | null> {
        return this.entityManager.getRepository(Role).findOneBy({
            name: roleName,
        });
    }

    @WrapErrorStatus()
    getListRole(
        where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
        options: FindManyOptions<Role>,
    ): Promise<Role[]> {
        return this.entityManager.getRepository(Role).find({
            where: where,
            ...options,
        });
    }

    @WrapErrorStatus()
    getRoleCount(where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[]): Promise<number> {
        return this.entityManager.getRepository(Role).countBy(where);
    }

    @WrapErrorStatus()
    withTransaction<T>(callback: (dataMapper: RoleDataMapper) => Promise<T>): Promise<T> {
        return this.entityManager.transaction(async (entityManager) => {
            const dataMapper = new RoleDataMapperImpl(entityManager, this.logger);
            return callback(dataMapper);
        });
    }
}

injected(RoleDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const ROLE_DATA_MAPPER_TOKEN = token<RoleDataMapper>('RoleDataMapper');
