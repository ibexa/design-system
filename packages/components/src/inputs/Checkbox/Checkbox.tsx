import React from 'react';

import BaseInput from '@ids-internal/partials/BaseInput';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { CheckboxProps } from './Checkbox.types';

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
    ref,
    required = false,
    title = '',
    value = '',
}: CheckboxProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox': true,
        [className]: true,
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
        <div className={checkboxClassName}>
            <BaseInput
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
