import { Container } from 'brandi';
import { CRYPTO_TOKEN, CryptoImpl } from './crypto';
import { ID_GENERATOR_TOKEN, SnowFlakeIDGenerator } from './id';
import { LOGGER_TOKEN, initializeLogger } from './logging';

export function bindToContainer(container: Container) {
    container.bind(LOGGER_TOKEN).toInstance(initializeLogger).inSingletonScope();
    container.bind(CRYPTO_TOKEN).toInstance(CryptoImpl).inSingletonScope();
    container.bind(ID_GENERATOR_TOKEN).toInstance(SnowFlakeIDGenerator).inSingletonScope();
}
