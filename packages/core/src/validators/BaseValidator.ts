import { TranslatorType } from '../types/translator';

export abstract class BaseValidator<T> {
    protected _translator: TranslatorType;

    constructor(translator: TranslatorType) {
        this._translator = translator;
    }

    abstract getErrorMessage(): string;

    abstract validate(value: T): boolean;
}
