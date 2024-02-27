import { Container } from 'brandi';
import { AUTH_SERVICE_HANDLERS_FACTORY_TOKEN, AuthServiceHandlersFactory } from './handler';
import { AUTH_SERVICE_GRPC_SERVER_TOKEN, AuthServiceGRPCServer } from './server';

export function bindToContainer(container: Container): void {
    container.bind(AUTH_SERVICE_HANDLERS_FACTORY_TOKEN).toInstance(AuthServiceHandlersFactory).inSingletonScope();
    container.bind(AUTH_SERVICE_GRPC_SERVER_TOKEN).toInstance(AuthServiceGRPCServer).inSingletonScope();
}
