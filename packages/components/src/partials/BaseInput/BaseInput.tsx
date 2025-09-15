import React from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import { useGetOrCreateId } from '@ids-hooks/generators';

import { BaseInputProps } from './BaseInput.types';

export const BaseInput = ({
    name,
    disabled = false,
    error = false,
    className = '',
    extraInputAttrs = {},
    id = undefined,
    ref,
    required = false,
    size = 'medium',
    title = '',
    type = 'text',
    value = '',
}: BaseInputProps) => {
    const componentId = useGetOrCreateId(id);
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
            ref={ref}
            title={title}
            type={type}
            value={value}
            {...extraInputAttrs}
        />
    );
};
