import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { ButtonProps, ButtonSize, ButtonType } from './Button.types';

const ICON_SIZE_MAPPING: Record<ButtonSize, IconSize> = {
    [ButtonSize.Medium]: IconSize.Small,
    [ButtonSize.Small]: IconSize.TinySmall,
} as const;

export const Button = ({
    onClick,
    children = null,
    ariaLabel,
    disabled = false,
    extraAria = {},
    className = '',
    icon,
    isFocusable = true,
    size = ButtonSize.Medium,
    title = '',
    type = ButtonType.Primary,
}: ButtonProps) => {
    const iconOnly = !!icon && !children;
    const componentClassName = createCssClassNames({
        'ids-btn': true,
        [`ids-btn--${type}`]: true,
        [`ids-btn--${size}`]: true,
        'ids-btn--disabled': disabled,
        'ids-btn--icon-only': iconOnly,
        [className]: !!className,
    });
    const getBtnAriaLabel = () => {
        if (ariaLabel) {
            return ariaLabel;
        } else if (iconOnly) {
            return icon;
        }

        return typeof children === 'string' ? children : '';
    };
    const renderIcon = () => {
        if (icon) {
            const iconSize = ICON_SIZE_MAPPING[size];

            return (
                <div className="ids-btn__icon">
                    <Icon name={icon} size={iconSize} />
                </div>
            );
        }

        return null;
    };
    const renderLabel = () => {
        if (!iconOnly) {
            return <div className="ids-btn__label">{children}</div>;
        }

        return null;
    };

    return (
        <button
            aria-disabled={disabled}
            aria-label={getBtnAriaLabel()}
            className={componentClassName}
            disabled={disabled}
            onClick={onClick}
            role="button"
            tabIndex={isFocusable && !disabled ? 0 : -1}
            title={title}
            type="button"
            {...extraAria}
        >
            {renderIcon()}
            {renderLabel()}
        </button>
    );
};
