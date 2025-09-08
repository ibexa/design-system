import React from 'react';

import Icon, { IconSize } from '../Icon';
import BaseButton from '@ids-internal/partials/BaseButton';

import { ButtonProps, ButtonSize } from './Button.types';

const ICON_SIZE_MAPPING: Record<ButtonSize, IconSize> = {
    [ButtonSize.Medium]: IconSize.Small,
    [ButtonSize.Small]: IconSize.TinySmall,
} as const;

const Button = ({ ariaLabel, children, icon, size = ButtonSize.Medium, ...restProps }: ButtonProps) => {
    const getBtnAriaLabel = () => {
        if (ariaLabel) {
            return ariaLabel;
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

    return (
        <BaseButton ariaLabel={getBtnAriaLabel()} size={size} {...restProps}>
            {renderIcon()}
            <div className="ids-btn__label">{children}</div>
        </BaseButton>
    );
};

export default Button;
