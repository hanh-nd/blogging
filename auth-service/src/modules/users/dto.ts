import { AuthProvider } from '@src/constants';
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

export class GetListUserOptions {
    @IsOptional()
    keyword?: string;
}

export class GetListUserRequest {
    @IsNumber()
    @IsOptional()
    page?: number;

    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsOptional()
    options?: GetListUserOptions;
}

export class GetUserCountRequest {
    @IsOptional()
    options?: GetListUserOptions;
}
