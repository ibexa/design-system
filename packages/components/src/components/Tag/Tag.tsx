import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { TagGhostType, TagProps, TagSize, TagType } from './Tag.types';

export const Tag = ({ children, className = '', isDark = false, icon, size = TagSize.Medium, type }: TagProps) => {
    const isGhostType = (tagType: TagType | TagGhostType): tagType is TagGhostType => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        return Object.values(TagGhostType).includes(tagType as TagGhostType);
    };
    const isGhost = isGhostType(type);
    const componentClassName = createCssClassNames({
        'ids-tag': true,
        [`ids-tag--${type}`]: true,
        [`ids-tag--${size}`]: true,
        [`ids-tag--dark`]: isDark,
        [className]: !!className,
    });

    const renderDot = () => {
        if (isGhost) {
            return <div className="ids-tag__ghost-dot" />;
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
            <div className="ids-tag__content">{children}</div>
        </div>
    );
};
