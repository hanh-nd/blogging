import { IsAlphanumeric, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserPasswordRequest {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsAlphanumeric()
    password: string;
}

export class GetUserPasswordByUserIdRequest {
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
