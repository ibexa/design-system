import BaseValidator from '../../validators/BaseValidator';

export interface ValidationResult {
    isValid: boolean;
    messages: string[];
}

export const validateInput = <T>(value: T, validators: BaseValidator<T>[]): ValidationResult => {
    const errors = validators.reduce((errorsAcc: string[], validator) => {
        if (!validator.validate(value)) {
            return [...errorsAcc, validator.getErrorMessage()];
        }

        return errorsAcc;
    }, []);

    return { isValid: !errors.length, messages: errors };
};
