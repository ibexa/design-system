import React from 'react';

import { createCssClassNames } from '../internal/shared/css.class.names';

import { ButtonProps } from './Button.types';

const Button = ({
    onClick,
    children,
    ariaLabel,
    disabled = false,
    extraAria = {},
    extraClasses = '',
    size = 'large',
    type = 'primary',
}: ButtonProps) => {
    const classes = createCssClassNames({
        'ids-btn': true,
        [`ids-btn--${type}`]: !!type,
        [`ids-btn--${size}`]: !!size,
        'ids-btn--disabled': disabled,
        [extraClasses]: true,
    });
    const btnAriaLabel = ariaLabel ?? (typeof children === 'string' ? children : undefined);

    return (
        <button
            aria-disabled={disabled}
            aria-label={btnAriaLabel}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            role="button"
            type="button"
            {...extraAria}
        >
            {children}
        </button>
    );
};

export default Button;
