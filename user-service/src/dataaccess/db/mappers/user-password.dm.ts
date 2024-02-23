import { token } from 'brandi';
import { UserPassword } from '../entities';

export interface UserPasswordDataMapper {
    from(body: Partial<UserPassword>): UserPassword;
    createUserPassword(body: UserPassword): Promise<UserPassword>;
    getUserPasswordByUserId(userId: number): Promise<UserPassword | null>;
}

export class UserPasswordDataMapperImpl implements UserPasswordDataMapper {
    from(body: Partial<UserPassword>): UserPassword {
        throw new Error('Method not implemented.');
    }
    createUserPassword(body: UserPassword): Promise<UserPassword> {
        throw new Error('Method not implemented.');
    }
    getUserPasswordByUserId(userId: number): Promise<UserPassword | null> {
        throw new Error('Method not implemented.');
    }
}

export const USER_PASSWORD_DATA_MAPPER_TOKEN = token<UserPasswordDataMapper>('UserPasswordDataMapper');
