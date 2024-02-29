import { HttpStatus } from '@src/constants';
import { ErrorWithStatus } from '@src/utils/errors';

interface WrapErrorStatusOptions {
    logging?: boolean;
    logger?: string;
}

export function WrapErrorStatus(options: WrapErrorStatusOptions = { logging: true }) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const fn = descriptor.value;
        descriptor.value = function (...args: any[]) {
            try {
                return fn.apply(this, args);
            } catch (error) {
                if (options.logging) {
                    console.log(
                        `[${this.constructor.name}][${propertyKey}] ${(error as Error).message}`,
                        (error as Error).stack,
                    );
                    const logger = (this as any)[options.logger || 'logger'];
                    if (logger) {
                        logger.error(
                            `[${this.constructor.name}][${propertyKey}], ${(error as Error).message}`,
                            ...args,
                        );
                    }
                }
                throw ErrorWithStatus.wrapWithStatus(error, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        };
    };
}
