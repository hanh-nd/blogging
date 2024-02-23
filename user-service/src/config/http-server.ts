import { token } from 'brandi';

export class HTTPServerConfig {
    constructor(public readonly port?: number) {}

    public static fromEnv(): HTTPServerConfig {
        return {
            port: parseInt(process.env.HTTP_PORT || '3000', 10),
        };
    }
}

export const HTTP_SERVER_CONFIG_TOKEN = token<HTTPServerConfig>('HTTPServerConfig');
