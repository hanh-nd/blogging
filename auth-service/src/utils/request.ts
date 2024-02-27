import { HttpStatus } from '@src/constants';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { ValidationError, validateSync } from 'class-validator';
import 'reflect-metadata';
import { ErrorWithStatus } from './errors';

export async function validateRequest<T>(obj: object, constructor: ClassConstructor<T>) {
    const request = plainToClass(constructor, obj) as object;
    const validationErrorResults = validateSync(request, {
        validationError: { target: false },
    });

    if (validationErrorResults.length) {
        throw new ErrorWithStatus(formatValidationError(validationErrorResults), HttpStatus.UNPROCESSABLE_ENTITY);
    }
}

function formatValidationError(errors: ValidationError[]) {
    return (
        'Invalid request: ' +
        errors
            .map((error) => {
                return Object.values(error.constraints || {}).join('. ');
            })
            .join('. ')
    );
}
