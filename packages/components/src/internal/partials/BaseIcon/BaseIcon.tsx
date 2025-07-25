import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { BaseIconProps } from './BaseIcon.types';

const Icon = ({ path, className = '', name='', size = 'small' }: BaseIconProps) => {
    const componentClassName = createCssClassNames({
        'ids-icon': true,
        [`ids-icon--${size}`]: true,
        [className]: !!className,
    });

    return (
        <svg aria-label={name} className={componentClassName} role="img">
            <use xlinkHref={path} />
        </svg>
    );
};

export default Icon;
