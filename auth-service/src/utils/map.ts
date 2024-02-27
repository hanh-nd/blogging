export class BiDirectionalMap<T, K> {
    declare forward: Map<T, K>;
    declare backward: Map<K, T>;

    constructor(values: [T, K][] = []) {
        this.forward = new Map(values);
        this.backward = new Map(values.map(([k, v]) => [v, k]));
    }

    get(key: T): K | undefined {
        return this.forward.get(key);
    }

    rGet(key: K): T | undefined {
        return this.backward.get(key);
    }

    set(key: T, value: K) {
        this.backward.delete(this.forward.get(key)!);
        this.forward.set(key, value);
        this.backward.set(value, key);
    }

    delete(key: T) {
        this.backward.delete(this.forward.get(key)!);
        this.forward.delete(key);
    }
}
