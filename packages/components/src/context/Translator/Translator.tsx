import React, { createContext } from 'react';

import { TranslatorProps, TranslatorType } from './Translator.types';

export const TranslatorContext = createContext<TranslatorType>({
    trans: () => '',
});

export const TranslatorProvider = ({ children, value }: TranslatorProps) => {
    return <TranslatorContext.Provider value={value}>{children}</TranslatorContext.Provider>;
};
