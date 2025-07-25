import React, { useContext } from 'react';

import BaseIcon from '@ids-internal/partials/BaseIcon';
import { AssetsContext, AssetsType } from '@ids-context/Assets';

import { IconProps } from './Icon.types';

const Icon = ({ name, ...restProps }: IconProps) => {
    const { getIconPath } = useContext<AssetsType>(AssetsContext);
    const path= getIconPath(name);

    return (
        <BaseIcon path={path} name={name} {...restProps} />
    );
};

export default Icon;
