import React from 'react';

import BaseInput from '@ids-internal/partials/BaseInput';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { CheckboxProps } from './Checkbox.types';

const Checkbox = ({
    name,
    onBlur = () => undefined,
    onChange = () => undefined,
    onFocus = () => undefined,
    onInput = () => undefined,
    className = '',
    disabled = false,
    error = false,
    extraAria = {},
    id = undefined,
    inputClassName = '',
    ref,
    required = false,
    title = '',
    value = false,
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
                className={inputClassName}
                disabled={disabled}
                error={error}
                extraInputAttrs={{
                    checked: value,
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
            />
        </div>
    );
};

export default Checkbox;

export const CheckboxStateful = withStateValue<boolean>(Checkbox);
