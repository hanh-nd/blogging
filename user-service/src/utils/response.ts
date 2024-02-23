import { HttpStatus, HttpStatusMessage } from '../constants';

export interface IErrorResponse {
    key?: string;
    errorCode: number;
    message?: string;
}

export class SuccessResponse {
    constructor(data: unknown = {}) {
        return {
            success: true,
            code: HttpStatus.OK,
            message: 'Success',
            data,
        };
    }
}
export class ErrorResponse {
    constructor(
        code = HttpStatus.INTERNAL_SERVER_ERROR,
        message = HttpStatusMessage[HttpStatus.INTERNAL_SERVER_ERROR],
        errors: IErrorResponse[] = [],
    ) {
        return {
            success: false,
            code,
            message,
            errors,
        };
    }
}
