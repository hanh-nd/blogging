import { describe, expect, it } from '@jest/globals';
import { BiDirectionalMap } from '../map';

describe('bi-direction-map', () => {
    it('should be able to map a value to a key and back', () => {
        const map = new BiDirectionalMap<string, string>();
        map.set('key', 'value');
        expect(map.get('key')).toBe('value');
        expect(map.rGet('value')).toBe('key');
    });

    it('should be delete a value and key', () => {
        const map = new BiDirectionalMap<string, string>();
        map.set('key', 'value');
        map.delete('key');
        expect(map.get('key')).toBe(undefined);
        expect(map.rGet('value')).toBe(undefined);
    });

    it('should be able get latest value on duplicated key', () => {
        const map = new BiDirectionalMap<string, string>();
        map.set('key', 'value');
        map.set('key', 'value2');
        expect(map.get('key')).toBe('value2');
        expect(map.rGet('value')).toBe(undefined);
        expect(map.rGet('value2')).toBe('key');
    });
});
