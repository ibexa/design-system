import React from 'react';

import BaseButton from '@ids-internal/partials/BaseButton';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import Icon, { IconSizeType } from '../Icon';

import { IconButtonProps, IconButtonSizeType } from './IconButton.types';

const ICON_SIZE_MAPPING: Record<IconButtonSizeType, IconSizeType> = {
    medium: 'small',
    small: 'tiny-small',
} as const;

const IconButton = ({ ariaLabel, className = '', icon = '', size = 'medium', ...restProps }: IconButtonProps) => {
    const componentClassName = createCssClassNames({
        'ids-btn--icon-only': true,
        [className]: !!className,
    });
    const renderIcon = () => {
        const iconSize = ICON_SIZE_MAPPING[size];

        return (
            <div className="ids-btn__icon">
                <Icon name={icon} size={iconSize} />
            </div>
        );
    };

    return (
        <BaseButton ariaLabel={ariaLabel ?? icon} className={componentClassName} size={size} {...restProps}>
            {renderIcon()}
        </BaseButton>
    );
};

export default IconButton;
