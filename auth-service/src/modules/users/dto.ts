import { AuthProvider, BaseGetListOptions, BaseGetListRequest } from '@src/constants';
import { User } from '@src/dataaccess/db/entities';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateUserRequest {
    @IsNotEmpty()
    userName: string;

    @IsOptional()
    displayName?: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(AuthProvider)
    provider: AuthProvider;
}

export class UpdateUserRequest {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsOptional()
    displayName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}

export class DeleteUserRequest {
    @IsNumber()
    userId: number;
}

export class GetUserByIdRequest {
    @IsNumber()
    userId: number;
}

export class GetUserByUserNameRequest {
    @IsNotEmpty()
    userName: string;
}

export class GetListUserOptions extends BaseGetListOptions {}

export class GetListUserRequest extends BaseGetListRequest {
    @IsOptional()
    options?: GetListUserOptions;
}

export class GetUserCountRequest {
    @IsOptional()
    options?: GetListUserOptions;
}

export class LoginByPasswordRequest {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;
}

export type AuthResponse = {
    user: User;
    token: string;
};

export class GetUserRolesRequest {
    @IsNumber()
    userId: number;
}
