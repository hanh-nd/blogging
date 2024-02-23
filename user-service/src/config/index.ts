import { Container } from 'brandi';
import { APPLICATION_CONFIG_TOKEN, ApplicationConfig } from './config';
import { MY_SQL_DATABASE_CONFIG_TOKEN } from './db';
import { GRPC_SERVER_CONFIG_TOKEN } from './grpc-server';
import { HTTP_SERVER_CONFIG_TOKEN } from './http-server';
import { KAFKA_CONFIG_TOKEN } from './kafka';
import { LOG_CONFIG_TOKEN } from './log';

export function bindToContainer(container: Container) {
    container.bind(APPLICATION_CONFIG_TOKEN).toInstance(ApplicationConfig.fromEnv).inSingletonScope();
    container
        .bind(LOG_CONFIG_TOKEN)
        .toInstance(() => container.get(APPLICATION_CONFIG_TOKEN).logConfig)
        .inSingletonScope();
    container
        .bind(MY_SQL_DATABASE_CONFIG_TOKEN)
        .toInstance(() => container.get(APPLICATION_CONFIG_TOKEN).mySQLDatabaseConfig)
        .inSingletonScope();
    container
        .bind(KAFKA_CONFIG_TOKEN)
        .toInstance(() => container.get(APPLICATION_CONFIG_TOKEN).kafkaConfig)
        .inSingletonScope();
    container
        .bind(GRPC_SERVER_CONFIG_TOKEN)
        .toInstance(() => container.get(APPLICATION_CONFIG_TOKEN).gRPCServerConfig)
        .inSingletonScope();
    container
        .bind(HTTP_SERVER_CONFIG_TOKEN)
        .toInstance(() => container.get(APPLICATION_CONFIG_TOKEN).httpServerConfig)
        .inSingletonScope();
}
