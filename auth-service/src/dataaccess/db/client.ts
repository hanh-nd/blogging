import { injected, token } from 'brandi';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MY_SQL_DATABASE_CONFIG_TOKEN, MySQLDatabaseConfig } from '../../config/db';

export function initializeMySQLDataSource(config: MySQLDatabaseConfig): DataSource {
    const dataSource = new DataSource(config as DataSourceOptions);
    return dataSource;
}

injected(initializeMySQLDataSource, MY_SQL_DATABASE_CONFIG_TOKEN);

export const MY_SQL_DATA_SOURCE_TOKEN = token<DataSource>('MySQLDataSource');
