import { Container } from 'brandi';
import { CACHE_CLIENT_TOKEN, InMemoryCacheClient } from './client';

export function bindToContainer(container: Container): void {
    container.bind(CACHE_CLIENT_TOKEN).toInstance(InMemoryCacheClient).inSingletonScope();
}
