import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { TagProps, TagSize, TagType } from './Tag.types';

export const Tag = ({ children, className = '', isDark = false, icon, size = TagSize.Medium, type = TagType.Primary }: TagProps) => {
    const isGhost = type.includes('ghost');
    const componentClassName = createCssClassNames({
        'ids-tag': true,
        [`ids-tag--${type}`]: true,
        [`ids-tag--${size}`]: true,
        [`ids-tag--dark`]: isDark,
        [className]: !!className,
    });

    const renderDot = () => {
        if (isGhost) {
            return <div className="ids-tag__ghost" />;
        }

        return null;
    };

    const renderIcon = () => {
        if (icon) {
            return (
                <div className="ids-tag__icon">
                    <Icon name={icon} size={IconSize.Small} />
                </div>
            );
        }

        return null;
    };

    return (
        <div className={componentClassName}>
            {renderDot()}
            {renderIcon()}
            {children}
        </div>
    );
};
