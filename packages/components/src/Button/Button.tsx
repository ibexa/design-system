import React from 'react';

import BaseButton from '@ids-internal/partials/BaseButton';

import Icon, { IconSizeType } from '../Icon';

import { ButtonProps, ButtonSizeType } from './Button.types';

const ICON_SIZE_MAPPING: Record<ButtonSizeType, IconSizeType> = {
    medium: 'small',
    small: 'tiny-small',
} as const;

const Button = ({
    ariaLabel,
    children,
    icon,
    size = 'medium',
    ...restProps
}: ButtonProps) => {
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
        <BaseButton
            ariaLabel={getBtnAriaLabel()}
            size={size}
            {...restProps}
        >
            {renderIcon()}
            <div className="ids-btn__label">{children}</div>
        </BaseButton>
    );
};

export default Button;
