import { token } from 'brandi';

export class GRPCServerConfig {
    constructor(public readonly port?: number) {}

    public static fromEnv(): GRPCServerConfig {
        return {
            port: parseInt(process.env.GRPC_PORT || '20000', 10),
        };
    }
}

export const GRPC_SERVER_CONFIG_TOKEN = token<GRPCServerConfig>('GRPCServerConfig');
