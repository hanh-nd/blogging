import { token } from 'brandi';

export class CryptoConfig {
    constructor(public readonly saltRounds?: number) {}

    public static fromEnv(): CryptoConfig {
        return {
            saltRounds: parseInt(process.env.CRYPTO_SALT_ROUNDS || '10', 10),
        };
    }
}

export const CRYPTO_CONFIG_TOKEN = token<CryptoConfig>('CryptoConfig');
