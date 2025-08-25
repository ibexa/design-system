import React from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import type { BadgeProps } from './Badge.types';

const MAX_BADGE_VALUE = 99;

const formatBadgeValue = (value: number): string => {
    return value > MAX_BADGE_VALUE ? '99+' : value.toString();
};

const Badge = ({ value, size = 'medium', className = '' }: BadgeProps) => {
    const isExpanded = value > MAX_BADGE_VALUE;

    const componentClassName = createCssClassNames({
        'ids-badge': true,
        [`ids-badge--${size}`]: true,
        'ids-badge--expanded': isExpanded,
        [className]: !!className,
    });

    return (
        <div className={componentClassName}>
            {formatBadgeValue(value)}
        </div>
    );
};

export default Badge;
