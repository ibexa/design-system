import React from 'react';

import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { BadgeProps, BadgeSize } from './Badge.types';

const MAX_BADGE_VALUE = 99;
const THRESHOLD = {
    [BadgeSize.Medium]: 100,
    [BadgeSize.Small]: 10,
};
export const Badge = ({ className = '', size = BadgeSize.Medium, value }: BadgeProps) => {
    const isStretched = value >= THRESHOLD[size];
    const componentClassName = createCssClassNames({
        'ids-badge': true,
        [`ids-badge--${size}`]: true,
        'ids-badge--stretched': isStretched,
        [className]: !!className,
    });
    const formatBadgeValue = (badgeValue: number): string => {
        return badgeValue > MAX_BADGE_VALUE ? `${MAX_BADGE_VALUE}+` : badgeValue.toString();
    };

    return <div className={componentClassName}>zzzz{formatBadgeValue(value)}</div>;
};
