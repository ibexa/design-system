import React from 'react';

import { createCssClassNames } from '../../shared/css.class.names';
import { useGenerateSimpleNumberId } from '../../hooks/generators';

import { BaseInputProps } from './BaseInput.types';

const INPUT_ID_PREFIX = 'ids-input-';

const BaseInput = ({
    name,
    type,
    disabled = false,
    error = false,
    extraClasses = '',
    extraInputAttrs = {},
    id = undefined,
    required = false,
    size = 'basic',
    value = '',
}: BaseInputProps) => {
    const componentGeneratedNumberId = useGenerateSimpleNumberId();
    const componentId = id ?? `${INPUT_ID_PREFIX}${componentGeneratedNumberId.toString()}`;
    const classes = createCssClassNames({
        'ids-input': true,
        [`ids-input--${type}`]: !!type,
        [`ids-input--${size}`]: !!size,
        'ids-input--disabled': disabled,
        'ids-input--error': error,
        'ids-input--required': required,
        [extraClasses]: true,
    });

    return (
        <input
            aria-invalid={error}
            aria-required={required}
            className={classes}
            disabled={disabled}
            id={componentId}
            name={name}
            type={type}
            value={value}
            {...extraInputAttrs}
        />
    );
};

export default BaseInput;
