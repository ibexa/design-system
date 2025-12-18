import React from 'react';

import { createCssClassNames } from '@ids-core';

import { BadgeProps, BadgeSize, BadgeVariant } from './Badge.types';

const MAX_BADGE_VALUE = 99;
const THRESHOLD = {
    [BadgeSize.Medium]: 100,
    [BadgeSize.Small]: 10,
};
const STRING_THRESHOLD = {
    [BadgeSize.Medium]: 3,
    [BadgeSize.Small]: 2,
};
export const Badge = ({
    className = '',
    maxValue = MAX_BADGE_VALUE,
    size = BadgeSize.Medium,
    value,
    variant = BadgeVariant.String,
}: BadgeProps) => {
    const isStretched = variant === BadgeVariant.Number ? parseInt(value, 10) >= THRESHOLD[size] : value.length >= STRING_THRESHOLD[size];
    const componentClassName = createCssClassNames({
        'ids-badge': true,
        [`ids-badge--${size}`]: true,
        'ids-badge--stretched': isStretched,
        [className]: !!className,
    });
    const formatBadgeValue = (badgeValue: string): string => {
        if (variant === BadgeVariant.String) {
            return badgeValue.toString();
        }

        const numericValue = parseInt(badgeValue, 10);

        return numericValue > maxValue ? `${maxValue}+` : numericValue.toString();
    };

    return <div className={componentClassName}>{formatBadgeValue(value)}</div>;
};
