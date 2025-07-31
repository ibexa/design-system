import { TranslatorType } from '@ids-context/Translator/Translator.types';

import BaseValidator from './BaseValidator';

interface ValidatorManagerOptions {
    translator: TranslatorType;
};

export default class ValidatorManager {
    private _validators: BaseValidator[];
    private _translator: TranslatorType;

    constructor(validators: BaseValidator[] = [], { translator }: ValidatorManagerOptions) {
        validators.forEach((validator) => {
            validator.setTranslator(translator);
        });

        this._validators = validators;
        this._translator = translator;
    }

    addValidator(validator: BaseValidator): void {
        validator.setTranslator(this._translator);

        this._validators.push(validator);
    }

    removeValidator(validator: BaseValidator): void {
        this._validators = this._validators.filter((savedValidator) => savedValidator !== validator);
    }

    validate(value: unknown) {
        const errors = this._validators
            .filter((validator: BaseValidator) => !validator.validate(value))
            .map((validator: BaseValidator) => validator.getErrorMessage());

        return { isValid: !errors.length, messages: errors };
    }
}
