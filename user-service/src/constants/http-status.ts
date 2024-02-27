import { status } from '@grpc/grpc-js';
import { BiDirectionalMap } from '../utils/map';

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    INVALID_USERNAME_OR_PASSWORD = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    GROUP_HAS_CHILDREN = 410,
    GROUP_MAX_QUANTITY = 412,
    ITEM_NOT_FOUND = 444,
    ITEM_EXISTED = 445,
    ITEM_INVALID = 446,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export const HttpStatusMessage = {
    [HttpStatus.OK]: 'Success',
    [HttpStatus.CREATED]: 'Created',
    [HttpStatus.BAD_REQUEST]: 'Bad Request',
    [HttpStatus.UNAUTHORIZED]: 'Unuserorized',
    [HttpStatus.INVALID_USERNAME_OR_PASSWORD]: 'Invalid Username or Password',
    [HttpStatus.FORBIDDEN]: 'Forbidden',
    [HttpStatus.NOT_FOUND]: 'Not Found',
    [HttpStatus.CONFLICT]: 'Conflict',
    [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
    [HttpStatus.GROUP_HAS_CHILDREN]: 'Group has children',
    [HttpStatus.GROUP_MAX_QUANTITY]: 'Group max quantity',
    [HttpStatus.ITEM_NOT_FOUND]: 'Item not found',
    [HttpStatus.ITEM_EXISTED]: 'Item existed',
    [HttpStatus.ITEM_INVALID]: 'Item invalid',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [HttpStatus.SERVICE_UNAVAILABLE]: 'Service Unavailable',
};

export const GRPCHttpStatusMap = new BiDirectionalMap<status, HttpStatus>([
    [status.OK, HttpStatus.OK],
    [status.ALREADY_EXISTS, HttpStatus.ITEM_EXISTED],
    [status.NOT_FOUND, HttpStatus.NOT_FOUND],
    [status.INTERNAL, HttpStatus.INTERNAL_SERVER_ERROR],
    [status.UNAUTHENTICATED, HttpStatus.UNAUTHORIZED],
    [status.INVALID_ARGUMENT, HttpStatus.UNPROCESSABLE_ENTITY],
    [status.PERMISSION_DENIED, HttpStatus.FORBIDDEN],
    [status.NOT_FOUND, HttpStatus.ITEM_NOT_FOUND],
]);
