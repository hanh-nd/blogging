import { Container } from 'brandi';
import dotenv from 'dotenv';
import * as config from '../config';
import * as cache from '../dataaccess/cache';
import * as db from '../dataaccess/db';
import * as kafka from '../dataaccess/kafka';
import * as jobs from '../jobs';
import * as userManagement from '../modules/users';
import * as gRPCService from '../server/grpc';
import { AUTH_SERVICE_GRPC_SERVER_TOKEN } from '../server/grpc/server';
import * as utils from '../utils';

export async function startGRPCServer(envPath?: string): Promise<void> {
    dotenv.config({ path: envPath });

    const container = new Container();

    // binding services
    config.bindToContainer(container);
    cache.bindToContainer(container);
    await db.bindToContainer(container);
    await kafka.bindToContainer(container);
    jobs.bindToContainer(container);
    userManagement.bindToContainer(container);
    gRPCService.bindToContainer(container);
    utils.bindToContainer(container);

    const server = container.get(AUTH_SERVICE_GRPC_SERVER_TOKEN);
    server.loadProtoAndStart('src/proto/service/user_service.proto');
}
