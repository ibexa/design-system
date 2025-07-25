import React from 'react';

import BaseInput from '@ids-internal/partials/BaseInput';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { InputTextProps } from './InputText.types';

const Input = ({
    name,
    onBlur = () => undefined,
    onChange = () => undefined,
    onFocus = () => undefined,
    onInput = () => undefined,
    disabled = false,
    error = false,
    extraAria = {},
    className = '',
    id = undefined,
    placeholder = '',
    readOnly = false,
    required = false,
    size = 'medium',
    title = '',
    type = 'text',
    value = '',
}: InputTextProps) => {
    const componentOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur(event);
    };
    const componentOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, event);
    };
    const componentOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus(event);
    };
    const componentOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInput(event.target.value, event);
    };

    return (
        <BaseInput
            disabled={disabled}
            error={error}
            className={className}
            extraInputAttrs={{
                onBlur: componentOnBlur,
                onChange: componentOnChange,
                onFocus: componentOnFocus,
                onInput: componentOnInput,
                placeholder,
                readOnly,
                ...extraAria,
            }}
            id={id}
            name={name}
            required={required}
            size={size}
            title={title}
            type={type}
            value={value}
        />
    );
};

export default Input;
