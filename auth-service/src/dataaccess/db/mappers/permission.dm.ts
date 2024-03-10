import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';

export interface PermissionDataMapper {}

export class PermissionDataMapperImpl implements PermissionDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}
}

injected(PermissionDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const PERMISSION_DATA_MAPPER_TOKEN = token<PermissionDataMapper>('PermissionDataMapper');
