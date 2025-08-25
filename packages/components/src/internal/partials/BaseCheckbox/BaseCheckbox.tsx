import React from 'react';

import BaseInput from '@ids-internal/partials/BaseInput';

import { BaseCheckboxProps } from './BaseCheckbox.types';

const Checkbox = ({
    name,
    onBlur = () => undefined,
    onChange = () => undefined,
    onFocus = () => undefined,
    onInput = () => undefined,
    checked = false,
    className = '',
    disabled = false,
    error = false,
    extraAria = {},
    id = undefined,
    inputClassName = '',
    ref,
    required = false,
    title = '',
    value = '',
}: BaseCheckboxProps) => {
    const componentOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur(event);
    };
    const componentOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked, event);
    };
    const componentOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus(event);
    };
    const componentOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInput(event.target.checked, event);
    };

    return (
        <div className={className}>
            <BaseInput
                className={inputClassName}
                disabled={disabled}
                error={error}
                extraInputAttrs={{
                    checked,
                    onBlur: componentOnBlur,
                    onChange: componentOnChange,
                    onFocus: componentOnFocus,
                    onInput: componentOnInput,
                    ...extraAria,
                }}
                id={id}
                name={name}
                ref={ref}
                required={required}
                title={title}
                type="checkbox"
                value={value}
            />
        </div>
    );
};

export default Checkbox;
