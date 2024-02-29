import { token } from 'brandi';
import { CryptoConfig } from './crypto';
import { MySQLDatabaseConfig } from './db';
import { GRPCServerConfig } from './grpc-server';
import { HTTPServerConfig } from './http-server';
import { KafkaConfig } from './kafka';
import { LogConfig } from './log';

export class ApplicationConfig {
    declare logConfig: LogConfig;
    declare mySQLDatabaseConfig: MySQLDatabaseConfig;
    declare kafkaConfig: KafkaConfig;
    declare gRPCServerConfig: GRPCServerConfig;
    declare httpServerConfig: HTTPServerConfig;
    declare cryptoConfig: CryptoConfig;

    public static fromEnv(): ApplicationConfig {
        const config = new ApplicationConfig();
        config.logConfig = LogConfig.fromEnv();
        config.mySQLDatabaseConfig = MySQLDatabaseConfig.fromEnv();
        config.kafkaConfig = KafkaConfig.fromEnv();
        config.gRPCServerConfig = GRPCServerConfig.fromEnv();
        config.httpServerConfig = HTTPServerConfig.fromEnv();
        config.cryptoConfig = CryptoConfig.fromEnv();
        return config;
    }
}

export const APPLICATION_CONFIG_TOKEN = token<ApplicationConfig>('ApplicationConfig');
