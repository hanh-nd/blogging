export function toJSON(value: any): string {
    try {
        return JSON.stringify(value);
    } catch (error) {
        return value;
    }
}
