import { status } from '@grpc/grpc-js';
import { GRPCHttpStatusMap, HttpStatus } from '../constants';

export class HttpStatusConverter {
    public static fromGRPCStatus(status: status): HttpStatus {
        return GRPCHttpStatusMap.get(status) || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    public static toGRPCStatus(httpStatus: HttpStatus): status {
        return GRPCHttpStatusMap.rGet(httpStatus) || status.INTERNAL;
    }
}
