import React from 'react';

import { BaseInput } from '@ids-partials/BaseInput';
import { createCssClassNames } from '@ids-core';

import { BaseChoiceInputProps } from './BaseChoiceInput.types';

export const BaseChoiceInput = ({
    name,
    type,
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
}: BaseChoiceInputProps) => {
    const componentClassName = createCssClassNames({
        'ids-choice-input': true,
        [className]: !!className,
    });
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
        <div className={componentClassName}>
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
                type={type}
                value={value}
            />
        </div>
    );
};
