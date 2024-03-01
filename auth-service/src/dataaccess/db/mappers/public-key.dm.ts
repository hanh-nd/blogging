import { WrapErrorStatus } from '@src/decorators/wrap-error-status.decorator';
import { LOGGER_TOKEN } from '@src/utils/logging';
import { injected, token } from 'brandi';
import { EntityManager } from 'typeorm';
import { Logger } from 'winston';
import { MY_SQL_ENTITY_MANAGER_TOKEN } from '../client';
import { PublicKey } from '../entities/public-key.entity';

export interface PublicKeyDataMapper {
    create(publicKey: Partial<PublicKey>): Promise<PublicKey>;
    getKeyById(keyId: number): Promise<PublicKey | null>;
}

export class PublicKeyDataMapperImpl implements PublicKeyDataMapper {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly logger: Logger,
    ) {}

    @WrapErrorStatus()
    create(publicKey: Partial<PublicKey>): Promise<PublicKey> {
        return this.entityManager.getRepository(PublicKey).save(publicKey);
    }

    @WrapErrorStatus()
    getKeyById(keyId: number): Promise<PublicKey | null> {
        return this.entityManager.getRepository(PublicKey).findOneBy({ keyId });
    }
}

injected(PublicKeyDataMapperImpl, MY_SQL_ENTITY_MANAGER_TOKEN, LOGGER_TOKEN);

export const PUBLIC_KEY_DATA_MAPPER_TOKEN = token<PublicKeyDataMapper>('PublicKeyDataMapper');
