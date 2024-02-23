import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { injected, token } from 'brandi';
import { Logger } from 'winston';
import { GRPCServerConfig, GRPC_SERVER_CONFIG_TOKEN } from '../../config/grpc-server';
import { ProtoGrpcType } from '../../proto/gen/user_service';
import { LOGGER_TOKEN } from '../../utils/logging';
import { USER_SERVICE_HANDLERS_FACTORY_TOKEN, UserServiceHandlersFactory } from './handler';

export class UserServiceGRPCServer {
    constructor(
        private readonly handlerFactory: UserServiceHandlersFactory,
        private readonly gRPCServerConfig: GRPCServerConfig,
        private readonly logger: Logger,
    ) {}

    public loadProtoAndStart(path: string): void {
        const protoGRPC = this.loadProtoGRPC(path);
        const server = new Server();
        server.addService(protoGRPC.UserService.service, this.handlerFactory.getHandlers());
        server.bindAsync(`0.0.0.0:${this.gRPCServerConfig.port}`, ServerCredentials.createInsecure(), (error, port) => {
            if (error) {
                this.logger.error('Failed to start gRPC server', error);
                return;
            }

            this.logger.info(`gRPC server started at: ${port}`);
        });
    }

    private loadProtoGRPC(path: string): ProtoGrpcType {
        const definition = loadSync(path, {
            keepCase: false,
            enums: Number,
            defaults: false,
            oneofs: true,
        });

        const packageDefinition = loadPackageDefinition(definition);
        return packageDefinition as unknown as ProtoGrpcType;
    }
}

injected(UserServiceGRPCServer, USER_SERVICE_HANDLERS_FACTORY_TOKEN, GRPC_SERVER_CONFIG_TOKEN, LOGGER_TOKEN);

export const AUTH_SERVICE_GRPC_SERVER_TOKEN = token<UserServiceGRPCServer>('UserServiceGRPCServer');
