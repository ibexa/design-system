import { BaseValidator, type ValidationResult } from '@ids-core';

export const validateInput = <T>(value: T, validators: BaseValidator<T>[]): ValidationResult => {
    const errors = validators.reduce((errorsAcc: string[], validator) => {
        if (!validator.validate(value)) {
            return [...errorsAcc, validator.getErrorMessage()];
        }

        return errorsAcc;
    }, []);

    return { isValid: !errors.length, messages: errors };
};
