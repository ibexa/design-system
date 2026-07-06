import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { ButtonProps, ButtonSize, ButtonType, IconPosition } from './Button.types';

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
    iconUrl,
    isFocusable = true,
    ref = null,
    size = ButtonSize.Medium,
    title = '',
    type = ButtonType.Primary,
    iconPosition = IconPosition.Start,
    ...nativeButtonProps
}: ButtonProps) => {
    const hasIcon = !!icon || !!iconUrl;
    const iconOnly = hasIcon && !children;
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
            if (iconUrl !== undefined) {
                return iconUrl;
            }

            return icon;
        }

        return typeof children === 'string' ? children : '';
    };
    const renderIcon = () => {
        if (iconUrl) {
            const iconSize = ICON_SIZE_MAPPING[size];

            return (
                <div className="ids-btn__icon">
                    <Icon path={iconUrl} size={iconSize} />
                </div>
            );
        }

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

    const isIconEnd = iconPosition === IconPosition.End;

    return (
        <button
            {...nativeButtonProps}
            aria-disabled={disabled}
            aria-label={getBtnAriaLabel()}
            className={componentClassName}
            disabled={disabled}
            onClick={onClick}
            ref={ref}
            role="button"
            tabIndex={isFocusable && !disabled ? 0 : -1}
            title={title}
            type="button"
            {...extraAria}
        >
            {!isIconEnd && renderIcon()}
            {renderLabel()}
            {isIconEnd && renderIcon()}
        </button>
    );
};
