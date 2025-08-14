import { TranslatorType } from '@ids-context/Translator';

export default abstract class BaseValidator {
    protected _translator!: TranslatorType;

    setTranslator(translator: TranslatorType) {
        this._translator = translator;
    }

    abstract getErrorMessage(): string;

    abstract validate(_value: unknown): boolean;
}

export type BaseValidatorType = typeof BaseValidator;
