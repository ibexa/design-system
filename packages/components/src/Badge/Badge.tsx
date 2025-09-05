import React, { useCallback } from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { BadgeProps, BadgeSize } from './Badge.types';

const MAX_BADGE_VALUE = 99;

const Badge = ({ className = '', size = BadgeSize.Medium, value }: BadgeProps) => {
    const isWide = value > MAX_BADGE_VALUE;
    const componentClassName = createCssClassNames({
        'ids-badge': true,
        [`ids-badge--${size}`]: true,
        'ids-badge--wide': isWide,
        [className]: !!className,
    });
    const formatBadgeValue = useCallback((val: number): string => {
        return val > MAX_BADGE_VALUE ? `${MAX_BADGE_VALUE}+` : val.toString();
    }, []);

    return (
        <div className={componentClassName}>
            {formatBadgeValue(value)}
        </div>
    );
};

export default Badge;
