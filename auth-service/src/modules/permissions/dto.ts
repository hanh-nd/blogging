import { BaseGetListOptions, BaseGetListRequest } from '@src/constants';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePermissionRequest {
    @IsNotEmpty()
    @IsString()
    resource: string;

    @IsNotEmpty()
    @IsString()
    action: string;
}

export class UpdatePermissionRequest {
    @IsNumber()
    @IsNotEmpty()
    permissionId: number;

    @IsString()
    resource: string;

    @IsString()
    action: string;
}

export class DeletePermissionRequest {
    @IsNumber()
    @IsNotEmpty()
    permissionId: number;
}

export class GetListPermissionOptions extends BaseGetListOptions {}

export class GetListPermissionRequest extends BaseGetListRequest {
    @IsOptional()
    options?: GetListPermissionOptions;
}

export class GetPermissionByIdRequest {
    @IsNumber()
    @IsNotEmpty()
    permissionId: number;
}

export class UpdateRolePermissionsRequest {
    @IsNumber()
    @IsNotEmpty()
    roleId: number;

    @IsNumber({}, { each: true })
    permissionIds: number[];
}
