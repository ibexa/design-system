import React, { useEffect, useState } from 'react';

import { createCssClassNames } from '../internal/shared/css.class.names';
import { useGenerateSimpleNumberId } from '../internal/hooks/generators';

import { InputProps } from './Input.types';

const INPUT_ID_PREFIX = 'ids-input-';

const Input = ({
    name,
    onBlur = () => undefined,
    onChange = () => undefined,
    onFocus = () => undefined,
    onInput = () => undefined,
    controlled = true,
    disabled = false,
    error = false,
    extraAria = {},
    extraClasses = '',
    id = undefined,
    placeholder = '',
    readonly = false,
    required = false,
    size = 'basic',
    type = 'text',
    value = '',
}: InputProps) => {
    const componentGeneratedNumberId = useGenerateSimpleNumberId();
    const [componentValue, setComponentValue] = useState(value);
    const componentId = id ?? `${INPUT_ID_PREFIX}${componentGeneratedNumberId.toString()}`;
    const classes = createCssClassNames({
        'ids-input': true,
        [`ids-input--${type}`]: !!type,
        [`ids-input--${size}`]: !!size,
        'ids-input--disabled': disabled,
        'ids-input--error': error,
        [extraClasses]: true,
    });
    const componentOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        onBlur(event);
    };
    const componentOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (!controlled) {
            setComponentValue(newValue);
        }

        onChange(newValue, event);
    }
    const componentOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        onFocus(event);
    }
    const componentOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (!controlled) {
            setComponentValue(newValue);
        }

        onInput(newValue, event);
    }

    useEffect(() => {
        if (!controlled) {
            setComponentValue(value);
        }
    }, [value, controlled]);

    return (
        <input
            className={classes}
            disabled={disabled}
            id={componentId}
            name={name}
            onBlur={componentOnBlur}
            onChange={componentOnChange}
            onFocus={componentOnFocus}
            onInput={componentOnInput}
            placeholder={placeholder}
            readOnly={readonly}
            required={required}
            value={controlled ? value : componentValue}
            {...extraAria}
        />
    );
};

export default Input;
