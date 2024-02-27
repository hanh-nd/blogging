import { BaseGetListOptions, BaseGetListRequest } from '@src/constants';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoleRequest {
    @IsString()
    name: string;
}

export class UpdateRoleRequest {
    @IsNumber()
    roleId: number;

    @IsString()
    @IsOptional()
    name?: string;
}

export class DeleteRoleRequest {
    @IsNumber()
    roleId: number;
}

export class GetRoleByIdRequest {
    @IsNumber()
    roleId: number;
}

export class GetListRoleOptions extends BaseGetListOptions {}

export class GetListRoleRequest extends BaseGetListRequest {
    @IsOptional()
    options?: GetListRoleOptions;
}

export class GetRoleCountRequest {
    @IsOptional()
    options?: GetListRoleOptions;
}

export class UpdateUserRolesRequest {
    @IsNumber()
    userId: number;

    @IsNumber({}, { each: true })
    roleIds: number[];
}

export class GetUserRolesRequest {
    @IsNumber()
    userId: number;
}
