import { APPLICATION_CONFIG_TOKEN, ApplicationConfig } from '@src/config/config';
import bcrypt from 'bcrypt';
import { injected, token } from 'brandi';

export interface Crypto {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
}

export class CryptoImpl implements Crypto {
    constructor(private readonly config: ApplicationConfig) {}

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.config.cryptoConfig.saltRounds!);
    }

    comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}

injected(CryptoImpl, APPLICATION_CONFIG_TOKEN);

export const CRYPTO_TOKEN = token<Crypto>('Crypto');
