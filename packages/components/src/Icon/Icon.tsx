import React, { useContext } from 'react';

import { AssetsContext, AssetsType } from '@ids-context/Assets';
import BaseIcon from '@ids-internal/partials/BaseIcon';

import { IconProps } from './Icon.types';

const Icon = ({ name, ...restProps }: IconProps) => {
    const { getIconPath } = useContext<AssetsType>(AssetsContext);
    const path = getIconPath(name);

    return <BaseIcon name={name} path={path} {...restProps} />;
};

export default Icon;
