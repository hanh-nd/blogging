import { token } from 'brandi';
import NodeCache from 'node-cache';

export interface CacheClient {
    set<T extends any = any>(key: string, value: T, ttl?: number): Promise<void>;
    get<T extends any = any>(key: string): Promise<T | null>;
    del(key: string): Promise<void>;
}

export class InMemoryCacheClient implements CacheClient {
    private readonly cache = new NodeCache({ forceString: true });

    async set<T extends any = any>(key: string, value: T, ttl?: number): Promise<void> {
        this.cache.set(key, value, ttl!);
    }

    async get<T extends any = any>(key: string): Promise<T | null> {
        return this.cache.get(key) || null;
    }

    async del(key: string): Promise<void> {
        this.cache.del(key);
    }
}

export const CACHE_CLIENT_TOKEN = token<CacheClient>('CacheClient');
