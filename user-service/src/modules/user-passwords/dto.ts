import { IsAlphanumeric, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateUserPasswordRequest {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsAlphanumeric()
    @MinLength(6)
    password: string;
}

export class GetUserPasswordByUserIdRequest {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
