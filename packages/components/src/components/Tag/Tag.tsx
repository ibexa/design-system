import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { type TagCustomColorsStyle, TagGhostType, type TagProps, TagSize, type TagType } from './Tag.types';

export const Tag = ({ children, className = '', customColors, isDark = false, icon, size = TagSize.Medium, type }: TagProps) => {
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
        'ids-tag--custom-colors': !!customColors,
        [className]: !!className,
    });
    const customColorsStyle: TagCustomColorsStyle | undefined = customColors
        ? {
              '--ids-tag-custom-bg-color': customColors.background,
              '--ids-tag-custom-border-color': customColors.border ?? customColors.text,
              '--ids-tag-custom-text-color': customColors.text,
          }
        : undefined;

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
        <div className={componentClassName} style={customColorsStyle}>
            {renderDot()}
            {renderIcon()}
            <div className="ids-tag__content">{children}</div>
        </div>
    );
};
