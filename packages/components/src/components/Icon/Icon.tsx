import React, { useContext } from 'react';

import { AssetsContext, AssetsType } from '@ids-context/Assets';
import { createCssClassNames } from '@ids-core';

import { IconProps, IconSize } from './Icon.types';

export const Icon = ({ path, className = '', name = '', size = IconSize.Small }: IconProps) => {
    const { getIconPath } = useContext<AssetsType>(AssetsContext);
    const iconPath = path ?? getIconPath(name);
    const componentClassName = createCssClassNames({
        'ids-icon': true,
        [`ids-icon--${size}`]: true,
        [className]: !!className,
    });

    return (
        <svg aria-label={name} className={componentClassName} role="img">
            <use xlinkHref={iconPath} />
        </svg>
    );
};
