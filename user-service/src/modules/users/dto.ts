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

    displayName?: string;

    @IsEmail()
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
    keyword?: string;
}

export class GetListUserRequest {
    @IsNumber()
    page: number;

    @IsNumber()
    limit: number;

    options?: GetListUserOptions;
}

export class GetUserCountRequest {
    options?: GetListUserOptions;
}
