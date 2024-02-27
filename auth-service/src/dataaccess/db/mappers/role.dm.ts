import { HttpStatus } from '@src/constants';
import { ErrorWithStatus } from '@src/utils/errors';
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

    from(body: Partial<Role>): Role {
        return this.dataSource.getRepository(Role).create(body);
    }

    createRole(body: Partial<Role>): Promise<Role> {
        try {
            return this.dataSource.getRepository(Role).save(body);
        } catch (error) {
            this.logger.error(`Failed to create role, ${(error as Error).message}`, body);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRole(roleId: number, body: Partial<Role>): Promise<void> {
        try {
            await this.dataSource.getRepository(Role).update(
                {
                    roleId: roleId,
                },
                body,
            );
        } catch (error) {
            this.logger.error(`Failed to update role, ${(error as Error).message}`, roleId, body);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRole(roleId: number): Promise<void> {
        try {
            await this.dataSource.getRepository(Role).softDelete({
                roleId: roleId,
            });
        } catch (error) {
            this.logger.error(`Failed to delete role, ${(error as Error).message}`, roleId);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getRoleById(roleId: number): Promise<Role | null> {
        try {
            return this.dataSource.getRepository(Role).findOneBy({
                roleId: roleId,
            });
        } catch (error) {
            this.logger.error(`Failed to get role by id, ${(error as Error).message}`, roleId);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getListRole(
        where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
        options: FindManyOptions<Role>,
    ): Promise<Role[]> {
        try {
            return this.dataSource.getRepository(Role).find({
                where: where,
                ...options,
            });
        } catch (error) {
            this.logger.error(`Failed to get list role, ${(error as Error).message}`, where, options);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getRoleCount(where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[]): Promise<number> {
        try {
            return this.dataSource.getRepository(Role).countBy(where);
        } catch (error) {
            this.logger.error(`Failed to get role count, ${(error as Error).message}`, where);
            throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

injected(RoleDataMapperImpl, MY_SQL_DATA_SOURCE_TOKEN, LOGGER_TOKEN);

export const ROLE_DATA_MAPPER_TOKEN = token<RoleDataMapper>('RoleDataMapper');
