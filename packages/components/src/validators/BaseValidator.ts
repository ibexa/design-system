import { TranslatorType } from '@ids-context/Translator';

export default abstract class BaseValidator<T> {
    protected _translator: TranslatorType;

    constructor(translator: TranslatorType) {
        this._translator = translator;
    }

    abstract getErrorMessage(): string;

    abstract validate(_value: T): boolean;
}
