import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { ButtonProps } from './Button.types';

const Button = ({
    onClick,
    children,
    ariaLabel,
    disabled = false,
    extraAria = {},
    extraClasses = '',
    iconOnly = false,
    size = 'medium',
    title = '',
    type = 'primary',
}: ButtonProps) => {
    const classes = createCssClassNames({
        'ids-btn': true,
        [`ids-btn--${type}`]: true,
        [`ids-btn--${size}`]: true,
        'ids-btn--disabled': disabled,
        'ids-btn--icon-only': iconOnly,
        [extraClasses]: !!extraClasses,
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
            title={title}
            type="button"
            {...extraAria}
        >
            {children}
        </button>
    );
};

export default Button;
