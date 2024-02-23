import { AuthProvider } from '@src/constants';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserRequest {
    @IsNotEmpty()
    userName: string;

    displayName?: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    provider: AuthProvider;
}

export class UpdateUserRequest {
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
