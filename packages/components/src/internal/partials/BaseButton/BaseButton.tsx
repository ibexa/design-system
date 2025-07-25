import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { BaseButtonProps } from './BaseButton.types';

const BaseButton = ({
    onClick,
    children = null,
    ariaLabel,
    disabled = false,
    extraAria = {},
    className = '',
    size = 'medium',
    title = '',
    type = 'primary',
}: BaseButtonProps) => {
    const componentClassName = createCssClassNames({
        'ids-btn': true,
        [`ids-btn--${type}`]: true,
        [`ids-btn--${size}`]: true,
        'ids-btn--disabled': disabled,
        [className]: !!className,
    });

    return (
        <button
            aria-disabled={disabled}
            aria-label={ariaLabel}
            className={componentClassName}
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

export default BaseButton;
