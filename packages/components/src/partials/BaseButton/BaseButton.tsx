import React from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { BaseButtonProps, BaseButtonSize, BaseButtonType } from './BaseButton.types';

export const BaseButton = ({
    onClick,
    children = null,
    ariaLabel,
    disabled = false,
    extraAria = {},
    className = '',
    size = BaseButtonSize.Medium,
    title = '',
    type = BaseButtonType.Primary,
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
