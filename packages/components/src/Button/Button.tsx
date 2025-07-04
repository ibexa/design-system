import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import Icon, { IconSizeType } from '../Icon';

import { ButtonProps, ButtonSizeType } from './Button.types';

const ICON_SIZE_MAPPING: Record<ButtonSizeType, IconSizeType> = {
    medium: 'small',
    small: 'tiny-small',
} as const;

const Button = ({
    onClick,
    children = null,
    ariaLabel,
    disabled = false,
    extraAria = {},
    extraClasses = '',
    icon = '',
    size = 'medium',
    title = '',
    type = 'primary',
}: ButtonProps) => {
    const isIconOnly = icon !== '' && children === null;
    const classes = createCssClassNames({
        'ids-btn': true,
        [`ids-btn--${type}`]: true,
        [`ids-btn--${size}`]: true,
        'ids-btn--disabled': disabled,
        'ids-btn--icon-only': isIconOnly,
        [extraClasses]: !!extraClasses,
    });
    const getBtnAriaLabel = () => {
        if (ariaLabel) {
            return ariaLabel;
        } else if (isIconOnly) {
            return icon;
        }

        return typeof children === 'string' ? children : undefined;
    };
    const getIcon = () => {
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
    const getTextLabel = () => {
        if (isIconOnly) {
            return null;
        }

        return <div className="ids-btn__label">{children}</div>;
    };

    return (
        <button
            aria-disabled={disabled}
            aria-label={getBtnAriaLabel()}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            role="button"
            title={title}
            type="button"
            {...extraAria}
        >
            {getIcon()}
            {getTextLabel()}
        </button>
    );
};

export default Button;
