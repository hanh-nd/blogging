import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';

export interface RolePermissionDataMapper {}

export class RolePermissionDataMapperImpl implements RolePermissionDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}
}

injected(RolePermissionDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const ROLE_PERMISSION_DATA_MAPPER_TOKEN = token<RolePermissionDataMapper>('RolePermissionDataMapper');
