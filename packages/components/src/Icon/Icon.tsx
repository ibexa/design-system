import React, { useContext } from 'react';

import { AssetsContext, AssetsType, GetIconPathType } from '../context/Assets';

import { createCssClassNames } from '../internal/shared/css.class.names';

import { IconProps } from './Icon.types';

const Icon = ({ cssClass = '', name, customPath, size = undefined }: IconProps) => {
    const { getIconPath }: { getIconPath: GetIconPathType } = useContext<AssetsType>(AssetsContext);
    const classes = createCssClassNames({
        'ids-icon': true,
        [`ids-icon--${size ?? ''}`]: !!size,
        [cssClass]: !!cssClass,
    });
    const linkHref = customPath ?? getIconPath(name);

    return (
        <svg aria-label={name} className={classes} role="img">
            <use xlinkHref={linkHref} />
        </svg>
    );
};

export default Icon;
