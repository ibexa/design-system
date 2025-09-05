import React from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { BaseIconProps, BaseIconSize } from './BaseIcon.types';

const Icon = ({ path, className = '', name = '', size = BaseIconSize.Small }: BaseIconProps) => {
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
