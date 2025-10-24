import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { BaseValidator, IsEmptyStringValidator, type ValidationResult } from '@ids-core';
import { TranslatorContext } from '@ids-context/Translator';
import { validateInput } from '@ids-shared/validators';

import { InputTextFieldValueType } from './InputTextField.types';

export const useInitValidators = ({ required }: { required: boolean }) => {
    const translator = useContext(TranslatorContext);
    const validators = useMemo(() => {
        const validatorsList: BaseValidator<InputTextFieldValueType>[] = [];

        if (required) {
            validatorsList.push(new IsEmptyStringValidator(translator));
        }

        return validatorsList;
    }, [required, translator]);

    return validators;
};

export const useValidateInput = ({
    validators,
    value,
}: {
    validators: BaseValidator<InputTextFieldValueType>[];
    value: InputTextFieldValueType;
}): ValidationResult => {
    const initialValue = useRef(value);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (initialValue.current !== value) {
            setIsDirty(true);
        }

        initialValue.current = value;
    }, [value]);

    return useMemo(() => {
        if (!isDirty) {
            return { isValid: true, messages: [] };
        }

        return validateInput<InputTextFieldValueType>(value, validators);
    }, [initialValue.current, value, validators]);
};
