import { PERMISSION_DATA_MAPPER_TOKEN, PermissionDataMapper } from '@src/dataaccess/db/mappers/permission.dm';
import { injected, token } from 'brandi';

export interface PermissionManagerOperator {}

export class PermissionManagerOperatorImpl implements PermissionManagerOperator {
    constructor(private readonly permissionDataMapper: PermissionDataMapper) {}
}

injected(PermissionManagerOperatorImpl, PERMISSION_DATA_MAPPER_TOKEN);

export const PERMISSION_MANAGER_OPERATOR_TOKEN = token<PermissionManagerOperator>('PermissionManagerOperator');
