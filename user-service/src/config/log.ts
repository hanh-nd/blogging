import { token } from 'brandi';

export class LogConfig {
    constructor(
        public readonly logDir?: string,
        public readonly maxSize?: string,
        public readonly maxFiles?: number,
    ) {}

    public static fromEnv(): LogConfig {
        return {
            logDir: process.env.LOG_DIR || 'logs',
            maxSize: process.env.LOG_MAX_SIZE || '20m',
            maxFiles: parseInt(process.env.LOG_MAX_FILES || '168', 10),
        };
    }
}

export const LOG_CONFIG_TOKEN = token<LogConfig>('LogConfig');
