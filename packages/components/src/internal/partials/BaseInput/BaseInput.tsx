import React from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import { useGenerateSimpleNumberId } from '@ids-internal/hooks/generators';

import { BaseInputProps } from './BaseInput.types';

const INPUT_ID_PREFIX = 'ids-input-';

const BaseInput = ({
    name,
    disabled = false,
    error = false,
    className = '',
    extraInputAttrs = {},
    id = undefined,
    required = false,
    size = 'medium',
    title = '',
    type = 'text',
    value = '',
}: BaseInputProps) => {
    const componentGeneratedNumberId = useGenerateSimpleNumberId();
    const componentId = id ?? `${INPUT_ID_PREFIX}${componentGeneratedNumberId.toString()}`;
    const componentClassName = createCssClassNames({
        'ids-input': true,
        [`ids-input--${type}`]: true,
        [`ids-input--${size}`]: true,
        'ids-input--disabled': disabled,
        'ids-input--error': error,
        'ids-input--required': required,
        [className]: !!className,
    });

    return (
        <input
            aria-invalid={error}
            aria-required={required}
            className={componentClassName}
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
