import { token } from 'brandi';
import { Snowflake } from 'nodejs-snowflake';

export interface IDGenerator {
    generate(): Promise<number>;
}

export class SnowFlakeIDGenerator implements IDGenerator {
    private readonly snowflake: Snowflake;

    constructor() {
        this.snowflake = new Snowflake();
    }

    public async generate(): Promise<number> {
        return new Promise<number>((resolve) => {
            resolve(+this.snowflake.getUniqueID().toString(10));
        });
    }
}

export const ID_GENERATOR_TOKEN = token<IDGenerator>('IDGenerator');
