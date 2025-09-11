import React, { createContext } from 'react';

import { AssetsProps, AssetsType } from './Assets.types';

export const AssetsContext = createContext<AssetsType>({
    getIconPath: () => '',
});

export const AssetsProvider = ({ children, value }: AssetsProps) => {
    return <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>;
};
