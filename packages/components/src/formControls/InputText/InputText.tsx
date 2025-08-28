import React, { useEffect } from 'react';

import { useInitValidators, useValidateInput } from './InputText.utils';
import BaseFormControl from '@ids-internal/partials/BaseFormControl';
import InputText from '../../inputs/InputText';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { FormControlInputTextProps, ValueType } from './InputText.types';

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
    required = false,
    value = '',
}: FormControlInputTextProps) => {
    const validators = useInitValidators({ required });
    const { isValid, messages } = useValidateInput({ validators, value });
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

export const FormControlInputTextStateful = withStateValue<ValueType>(FormControlInputText);
