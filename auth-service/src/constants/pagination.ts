import { IsNumber, IsOptional } from 'class-validator';

export const DEFAULT_PAGE_VALUE = 1;
export const DEFAULT_PAGE_SIZE = 20;

export class BaseGetListOptions {
    @IsOptional()
    keyword?: string;
}

export class BaseGetListRequest {
    @IsNumber()
    @IsOptional()
    page?: number;

    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsOptional()
    options?: BaseGetListOptions;
}
