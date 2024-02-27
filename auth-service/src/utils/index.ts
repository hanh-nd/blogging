import { Container } from 'brandi';
import { LOGGER_TOKEN, initializeLogger } from './logging';

export function bindToContainer(container: Container) {
    container.bind(LOGGER_TOKEN).toInstance(initializeLogger).inSingletonScope();
}
