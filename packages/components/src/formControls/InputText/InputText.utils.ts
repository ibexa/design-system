import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import BaseValidator from '@ibexa/ids-core/validators/BaseValidator';
import IsEmptyStringValidator from '@ibexa/ids-core/validators/IsEmptyStringValidator';
import { TranslatorContext } from '@ids-context/Translator';
import { ValidationResult } from '@ibexa/ids-core/types/validation';
import { validateInput } from '@ids-internal/shared/validators';

import { ValueType } from './InputText.types';

export const useInitValidators = ({ required }: { required: boolean }) => {
    const translator = useContext(TranslatorContext);
    const validators = useMemo(() => {
        const validatorsList: BaseValidator<ValueType>[] = [];

        if (required) {
            validatorsList.push(new IsEmptyStringValidator(translator));
        }

        return validatorsList;
    }, [required, translator]);

    return validators;
};

export const useValidateInput = ({ validators, value }: { validators: BaseValidator<ValueType>[]; value: ValueType }): ValidationResult => {
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

        return validateInput<ValueType>(value, validators);
    }, [initialValue.current, value, validators]);
};
