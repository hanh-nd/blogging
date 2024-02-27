import { injected, token } from 'brandi';
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { LOG_CONFIG_TOKEN, LogConfig } from '../config/log';

export function initializeLogger(config: LogConfig): Logger {
    const logger = createLogger({
        format: format.combine(format.timestamp(), format.json()),
        defaultMeta: { service: 'auth-service' },
        transports: [
            new transports.DailyRotateFile({
                // level: 'info',
                filename: '%DATE%.info.log',
                dirname: config.logDir,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: config.maxSize,
                maxFiles: config.maxFiles,
            }),
            new transports.DailyRotateFile({
                level: 'error',
                filename: '%DATE%.error.log',
                dirname: config.logDir,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: config.maxSize,
                maxFiles: config.maxFiles,
            }),
        ],
    });

    logger.transports.forEach((t) => t.on('error', console.error));

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console());
    }

    return logger;
}

injected(initializeLogger, LOG_CONFIG_TOKEN);

export const LOGGER_TOKEN = token<Logger>('Logger');
