import React, { useContext, useEffect, useMemo } from 'react';

import BaseFormControl from '@ids-internal/partials/BaseFormControl';
import InputText from '../../inputs/InputText';
import IsEmptyStringValidator from '@ibexa/ids-core/validators/IsEmptyStringValidator';
import { TranslatorContext } from '@ids-context/Translator';
import { validateInput } from '@ids-internal/shared/validators';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { FormControlInputTextProps } from './InputText.types';
import { ValidationResult } from '@ibexa/ids-core/types/validation';

const FormControlInputText = ({
    helperText,
    helperTextExtra = {},
    id,
    input = {},
    label,
    labelExtra = {},
    name,
    onChange = () => undefined,
    onValidate = () => undefined,
    value = '',
}: FormControlInputTextProps) => {
    const translator = useContext(TranslatorContext);
    const required = input.required ?? false;
    const validators = useMemo(() => {
        const validatorsList = [];

        if (required) {
            validatorsList.push(new IsEmptyStringValidator(translator));
        }

        return validatorsList;
    }, [required, translator]);
    const { isValid, messages } = useMemo<ValidationResult>(
        () => validateInput<string | number>(value, validators),
        [value, validators],
    );
    const helperTextProps = {
        children: isValid ? helperText : messages.join(', '),
        type: isValid ? ('default' as const) : ('error' as const),
        ...helperTextExtra,
    };
    const labelProps = {
        children: label,
        error: !isValid,
        htmlFor: id,
        required,
        ...labelExtra,
    };
    const inputProps = {
        ...input,
        error: !isValid,
        id,
        name,
        onChange,
        value,
    };

    useEffect(() => {
        onValidate(isValid, messages);
    }, [isValid, messages, onValidate]);

    return (
        <BaseFormControl helperText={helperTextProps} label={labelProps} type="input-text">
            <InputText {...inputProps} />
        </BaseFormControl>
    );
};

export default FormControlInputText;

export const FormControlInputTextStateful = withStateValue<string | number>(FormControlInputText);
