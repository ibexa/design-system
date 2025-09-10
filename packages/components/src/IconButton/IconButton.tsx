import React from 'react';

import BaseButton from '@ids-internal/partials/BaseButton';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import Icon, { IconSize } from '../Icon';

import { IconButtonProps, IconButtonSize } from './IconButton.types';

const ICON_SIZE_MAPPING: Record<IconButtonSize, IconSize> = {
    [IconButtonSize.Medium]: IconSize.Small,
    [IconButtonSize.Small]: IconSize.TinySmall,
} as const;

const IconButton = ({ ariaLabel, className = '', icon = '', size = IconButtonSize.Medium, ...restProps }: IconButtonProps) => {
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
