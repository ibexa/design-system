import { TranslatorType } from '@ids-context/Translator/Translator.types';

import BaseValidator from './BaseValidator';

interface ValidatorManagerOptions {
    translator: TranslatorType;
}

export interface ValidateReturnType {
    isValid: boolean;
    messages: string[];
}

export default class ValidatorManager<T> {
    private _validators: BaseValidator<T>[];
    private _translator: TranslatorType;

    constructor(validators: BaseValidator<T>[] = [], { translator }: ValidatorManagerOptions) {
        validators.forEach((validator) => {
            validator.setTranslator(translator);
        });

        this._validators = validators;
        this._translator = translator;
    }

    addValidator(validator: BaseValidator<T>): void {
        validator.setTranslator(this._translator);

        this._validators.push(validator);
    }

    removeValidator(validator: BaseValidator<T>): void {
        this._validators = this._validators.filter((savedValidator) => savedValidator !== validator);
    }

    validate(value: T): ValidateReturnType {
        const errors = this._validators
            .filter((validator: BaseValidator<T>) => !validator.validate(value))
            .map((validator: BaseValidator<T>) => validator.getErrorMessage());

        return { isValid: !errors.length, messages: errors };
    }
}
