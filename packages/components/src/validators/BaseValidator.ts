import { TranslatorType } from '@ids-context/Translator';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export default abstract class BaseValidator<T> {
    protected _translator!: TranslatorType;

    setTranslator(translator: TranslatorType) {
        this._translator = translator;
    }

    abstract getErrorMessage(): string;

    abstract validate(_value: T): boolean;
}
