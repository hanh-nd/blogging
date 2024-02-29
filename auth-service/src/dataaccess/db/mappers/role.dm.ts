import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { DataSource, FindManyOptions, FindOptionsWhere } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_DATA_SOURCE_TOKEN } from '../client';
import { Role } from '../entities';

export interface RoleDataMapper {
    from(body: Partial<Role>): Role;
    createRole(body: Partial<Role>): Promise<Role>;
    updateRole(roleId: number, body: Partial<Role>): Promise<void>;
    deleteRole(roleId: number): Promise<void>;
    getRoleById(roleId: number): Promise<Role | null>;
    getListRole(
        where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
        options: FindManyOptions<Role>,
    ): Promise<Role[]>;
    getRoleCount(where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[]): Promise<number>;
}

export class RoleDataMapperImpl implements RoleDataMapper {
    constructor(
        private readonly dataSource: DataSource,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    from(body: Partial<Role>): Role {
        return this.dataSource.getRepository(Role).create(body);
    }

    @WrapErrorStatus()
    createRole(body: Partial<Role>): Promise<Role> {
        return this.dataSource.getRepository(Role).save(body);
    }

    @WrapErrorStatus()
    async updateRole(roleId: number, body: Partial<Role>): Promise<void> {
        await this.dataSource.getRepository(Role).update(
            {
                roleId: roleId,
            },
            body,
        );
    }

    @WrapErrorStatus()
    async deleteRole(roleId: number): Promise<void> {
        await this.dataSource.getRepository(Role).softDelete({
            roleId: roleId,
        });
    }

    @WrapErrorStatus()
    getRoleById(roleId: number): Promise<Role | null> {
        return this.dataSource.getRepository(Role).findOneBy({
            roleId: roleId,
        });
    }

    @WrapErrorStatus()
    getListRole(
        where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
        options: FindManyOptions<Role>,
    ): Promise<Role[]> {
        return this.dataSource.getRepository(Role).find({
            where: where,
            ...options,
        });
    }

    @WrapErrorStatus()
    getRoleCount(where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[]): Promise<number> {
        return this.dataSource.getRepository(Role).countBy(where);
    }
}

injected(RoleDataMapperImpl, MY_SQL_DATA_SOURCE_TOKEN, LOGGER_TOKEN);

export const ROLE_DATA_MAPPER_TOKEN = token<RoleDataMapper>('RoleDataMapper');
