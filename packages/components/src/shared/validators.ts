import BaseValidator from '@ibexa/ids-core/validators/BaseValidator';
import type { ValidationResult } from '@ibexa/ids-core/types/validation';

export const validateInput = <T>(value: T, validators: BaseValidator<T>[]): ValidationResult => {
    const errors = validators.reduce((errorsAcc: string[], validator) => {
        if (!validator.validate(value)) {
            return [...errorsAcc, validator.getErrorMessage()];
        }

        return errorsAcc;
    }, []);

    return { isValid: !errors.length, messages: errors };
};
