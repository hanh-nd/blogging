import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MySQLDatabaseConfig } from '../../config/db';

const mysqlConfig = MySQLDatabaseConfig.fromEnv();
const dataSource = new DataSource({
    ...mysqlConfig,
    migrations: ['migrations/db/migrations/*.ts'],
} as DataSourceOptions);
export default dataSource;
