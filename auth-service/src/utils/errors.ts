import { status } from '@grpc/grpc-js';
import { HttpStatus, HttpStatusMessage } from '../constants';
import { HttpStatusConverter } from './http-status';

export class ErrorWithStatus extends Error {
    constructor(
        public readonly message: string,
        public readonly status: number,
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    public static wrapWithStatus(e: unknown, status: HttpStatus): ErrorWithStatus {
        if (e instanceof Error) {
            return new ErrorWithStatus(e.message, status);
        }

        return new ErrorWithStatus(JSON.stringify(e), status);
    }

    public static wrapWithGRPCStatus(e: unknown, status: status): ErrorWithStatus {
        if (e instanceof Error) {
            return new ErrorWithStatus(e.message, HttpStatusConverter.fromGRPCStatus(status));
        }

        return new ErrorWithStatus(JSON.stringify(e), status);
    }
}

export class BadRequestException extends ErrorWithStatus {
    constructor(message = HttpStatusMessage[HttpStatus.BAD_REQUEST]) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class ForbiddenException extends ErrorWithStatus {
    constructor(message = HttpStatusMessage[HttpStatus.FORBIDDEN]) {
        super(message, HttpStatus.FORBIDDEN);
    }
}

export class UnAuthorizedException extends ErrorWithStatus {
    constructor(message = HttpStatusMessage[HttpStatus.UNAUTHORIZED]) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

export class NotFoundException extends ErrorWithStatus {
    constructor(message = HttpStatusMessage[HttpStatus.NOT_FOUND]) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class ItemExistedException extends ErrorWithStatus {
    constructor(message = HttpStatusMessage[HttpStatus.ITEM_EXISTED]) {
        super(message, HttpStatus.ITEM_EXISTED);
    }
}

export class ItemNotFoundException extends ErrorWithStatus {
    constructor(message = HttpStatusMessage[HttpStatus.ITEM_NOT_FOUND]) {
        super(message, HttpStatus.ITEM_NOT_FOUND);
    }
}

export class InternalServerErrorException extends ErrorWithStatus {
    constructor(message = HttpStatusMessage[HttpStatus.INTERNAL_SERVER_ERROR]) {
        super(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
