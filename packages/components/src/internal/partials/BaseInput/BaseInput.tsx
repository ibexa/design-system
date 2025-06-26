import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';
import { useGenerateSimpleNumberId } from '@ids-internal/hooks/generators';

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
    size = 'medium',
    title = '',
    value = '',
}: BaseInputProps) => {
    const componentGeneratedNumberId = useGenerateSimpleNumberId();
    const componentId = id ?? `${INPUT_ID_PREFIX}${componentGeneratedNumberId.toString()}`;
    const classes = createCssClassNames({
        'ids-input': true,
        [`ids-input--${type}`]: true,
        [`ids-input--${size}`]: true,
        'ids-input--disabled': disabled,
        'ids-input--error': error,
        'ids-input--required': required,
        [extraClasses]: !!extraClasses,
    });

    return (
        <input
            aria-invalid={error}
            aria-required={required}
            className={classes}
            disabled={disabled}
            id={componentId}
            name={name}
            title={title}
            type={type}
            value={value}
            {...extraInputAttrs}
        />
    );
};

export default BaseInput;
