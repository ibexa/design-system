import BaseValidator from './BaseValidator';

export default class IsEmptyStringValidator extends BaseValidator {
    getErrorMessage(): string {
        const Translator = this._translator;

        return Translator.trans(/*@Desc("This field cannot be empty.")*/ 'ibexa.validators.is_empty_string');
    }

    validate(value: string): boolean {
        return value.trim() !== '';
    }
}
