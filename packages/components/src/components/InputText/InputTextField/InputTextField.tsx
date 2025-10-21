import React, { useEffect } from 'react';

import { useInitValidators, useValidateInput } from './InputTextField.utils';
import { BaseField } from '@ids-partials/BaseField';
import { HelperTextType } from '@ids-components/HelperText';
import { InputTextInput } from '../InputTextInput';
import { createCssClassNames } from '@ids-core';
import { withStateValue } from '@ids-hoc/withStateValue';

import { InputTextFieldProps, InputTextFieldValueType } from './InputTextField.types';

export const InputTextField = ({
    className = '',
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
}: InputTextFieldProps) => {
    const componentClassName = createCssClassNames({
        'ids-input-text-field': true,
        [className]: !!className,
    });
    const validators = useInitValidators({ required });
    const { isValid, messages } = useValidateInput({ validators, value });
    const helperTextProps = {
        children: isValid ? helperText : messages.join(', '),
        type: isValid ? HelperTextType.Default : HelperTextType.Error,
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
        <BaseField className={componentClassName} helperText={helperTextProps} label={labelProps} type="input-text">
            <InputTextInput {...inputProps} />
        </BaseField>
    );
};

export const InputTextFieldStateful = withStateValue<InputTextFieldProps, InputTextFieldValueType>(InputTextField);
