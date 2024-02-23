import { Container } from 'brandi';
import { USER_SERVICE_HANDLERS_FACTORY_TOKEN, UserServiceHandlersFactory } from './handler';
import { AUTH_SERVICE_GRPC_SERVER_TOKEN, UserServiceGRPCServer } from './server';

export function bindToContainer(container: Container): void {
    container.bind(USER_SERVICE_HANDLERS_FACTORY_TOKEN).toInstance(UserServiceHandlersFactory).inSingletonScope();
    container.bind(AUTH_SERVICE_GRPC_SERVER_TOKEN).toInstance(UserServiceGRPCServer).inSingletonScope();
}
