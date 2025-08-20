import BaseValidator from '../../validators/BaseValidator';

export interface ValidateReturnType {
    isValid: boolean;
    messages: string[];
}

export const validateInput = <T>(value: T, validators: BaseValidator<T>[]): ValidateReturnType => {
    const errors = validators
        .filter((validator: BaseValidator<T>) => !validator.validate(value))
        .map((validator: BaseValidator<T>) => validator.getErrorMessage());

    return { isValid: !errors.length, messages: errors };
};
