import BaseValidator from './BaseValidator';

export default class IsEmptyStringValidator extends BaseValidator {
    getErrorMessage(): string {
        return 'This field cannot be empty.';
    }

    validate(value: string): boolean {
        return value.trim() !== '';
    }
}
