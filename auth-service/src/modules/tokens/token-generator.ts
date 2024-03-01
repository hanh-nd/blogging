import { CACHE_CLIENT_TOKEN, CacheClient } from '@src/dataaccess/cache/client';
import { PUBLIC_KEY_DATA_MAPPER_TOKEN, PublicKeyDataMapper } from '@src/dataaccess/db/mappers/public-key.dm';
import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { UnAuthorizedException } from '@src/utils/errors';
import { IDGenerator, ID_GENERATOR_TOKEN } from '@src/utils/id';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { AsyncFactory, injected, token } from 'brandi';
import { generateKeyPairSync } from 'crypto';
import jwt, { JwtHeader, SignOptions, TokenExpiredError, VerifyOptions } from 'jsonwebtoken';
import { Logger } from 'winston';

export class TokenPayload {
    constructor(
        public readonly userId: number,
        public readonly userName?: string,
        public readonly email?: string,
        public readonly displayName?: string,
        private readonly jti?: number,
        private readonly exp?: number,
        private readonly iss?: string,
    ) {}
}

export interface TokenGenerator {
    encode(payload: TokenPayload): Promise<string>;
    decode(token: string): Promise<TokenPayload>;
}

export class JwtGenerator implements TokenGenerator {
    private publicKeyId: number;
    private privateKey: string;

    constructor(
        private readonly publicKeyDataMapper: PublicKeyDataMapper,
        private readonly idGenerator: IDGenerator,
        private readonly cache: CacheClient,
        private readonly logger: Logger,
    ) {}

    public static async New(
        publicKeyDataMapper: PublicKeyDataMapper,
        idGenerator: IDGenerator,
        cache: CacheClient,
        logger: Logger,
    ): Promise<JwtGenerator> {
        const jwtGenerator = new JwtGenerator(publicKeyDataMapper, idGenerator, cache, logger);

        const keyPair = generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem',
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
        });

        jwtGenerator.privateKey = keyPair.privateKey;
        const publicKeyEntity = await jwtGenerator.publicKeyDataMapper.create({ data: keyPair.publicKey });
        jwtGenerator.publicKeyId = publicKeyEntity.keyId;

        return jwtGenerator;
    }

    @WrapErrorStatus()
    async encode(payload: TokenPayload): Promise<string> {
        const jid = await this.idGenerator.generate();

        const signOptions: SignOptions = {
            algorithm: 'RS512',
            expiresIn: '1h',
            issuer: 'auth-service',
            jwtid: jid.toString(),
            subject: payload.userId.toString(),
            keyid: this.publicKeyId.toString(),
        };

        return jwt.sign(payload, this.privateKey, signOptions);
    }

    @WrapErrorStatus()
    decode(token: string): Promise<TokenPayload> {
        const verifyOptions: VerifyOptions = {
            algorithms: ['RS512'],
        };

        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                (header: JwtHeader, callback) => {
                    if (!header.kid) {
                        return callback(new UnAuthorizedException('Token does not contain a key id'));
                    }

                    const keyId = parseInt(header.kid, 10);
                    this.getPublicKey(keyId)
                        .then((publicKey) => {
                            if (!publicKey) {
                                return callback(new UnAuthorizedException('Token key id not found'));
                            }

                            callback(null, publicKey);
                        })
                        .catch(callback);
                },
                verifyOptions,
                (error, decoded) => {
                    if (error !== null) {
                        if (error instanceof TokenExpiredError) {
                            return reject(new UnAuthorizedException('Token expired'));
                        }
                        return reject(error);
                    }

                    resolve(decoded as unknown as TokenPayload);
                },
            );
        });
    }

    @WrapErrorStatus()
    private async getPublicKey(keyId: number): Promise<string | null> {
        const cachedPublicKey = await this.cache.get<string>(`public-key:${keyId}`);
        if (cachedPublicKey) return cachedPublicKey;

        const publicKey = await this.publicKeyDataMapper.getKeyById(keyId);
        if (!publicKey) return null;

        await this.cache.set(`public-key:${keyId}`, publicKey.data, Number.POSITIVE_INFINITY);
        return publicKey.data;
    }
}

injected(JwtGenerator.New, PUBLIC_KEY_DATA_MAPPER_TOKEN, ID_GENERATOR_TOKEN, CACHE_CLIENT_TOKEN, LOGGER_TOKEN);

export const TOKEN_GENERATOR_FACTORY_TOKEN = token<AsyncFactory<TokenGenerator>>('AsyncFactory<TokenGenerator>');
export const TOKEN_GENERATOR_TOKEN = token<TokenGenerator>('TokenGenerator');
