import { token } from 'brandi';
import { DataSourceOptions } from 'typeorm';

export class MySQLDatabaseConfig {
    constructor(
        public readonly type?: string,
        public readonly host?: string,
        public readonly port?: number,
        public readonly username?: string,
        public readonly password?: string,
        public readonly database?: string,
        public readonly logging?: boolean,
        public readonly entities?: string[],
        public readonly synchronize?: boolean,
    ) {}

    public static fromEnv(): MySQLDatabaseConfig {
        return {
            type: 'mysql',
            host: process.env.MY_SQL_HOST || 'localhost',
            port: parseInt(process.env.MY_SQL_PORT || '3306', 10),
            username: process.env.MY_SQL_USER || 'root',
            password: process.env.MY_SQL_PASSWORD || 'password',
            database: process.env.MY_SQL_DATABASE || 'ms_admin',
            logging: process.env.MY_SQL_LOGGING === 'true',
            entities: ['dist/**/*.entity.ts', 'src/**/*.entity.ts'],
            synchronize: process.env.MY_SQL_SYNCHRONIZE === 'true',
        } as DataSourceOptions as MySQLDatabaseConfig;
    }
}

export const MY_SQL_DATABASE_CONFIG_TOKEN = token<MySQLDatabaseConfig>('MySQLDatabaseConfig');
