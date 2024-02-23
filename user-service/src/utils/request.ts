import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import 'reflect-metadata';

export async function validateRequest<T>(obj: object, constructor: ClassConstructor<T>) {
    const request = plainToClass(constructor, obj) as object;
    await validateOrReject(request, {
        validationError: { target: false },
    });
}
