import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { BadgeProps } from './Badge.types';

const MAX_CIRCULAR_LENGTH = 2;

const Badge = ({ children, size = 'medium', className = '', title = '' }: BadgeProps) => {
const content = typeof children === 'string' ? children : '';
    const isExpanded = content.length > MAX_CIRCULAR_LENGTH;

    const componentClassName = createCssClassNames({
        'ids-badge': true,
        [`ids-badge--${size}`]: !!size,
        'ids-badge--expanded': isExpanded,
        [className]: !!className,
    });

    return (
        <div className={componentClassName} title={title}>
            {children}
        </div>
    );
};

export default Badge;
