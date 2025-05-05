import React, { createContext } from 'react';

import { TranslatorProps, TranslatorType } from './Translator.types';

export const TranslatorContext = createContext<TranslatorType>({
    trans: () => '',
});

const TranslatorProvider = ({ children, value }: TranslatorProps) => {
    return <TranslatorContext.Provider value={value}>{children}</TranslatorContext.Provider>;
};

export default TranslatorProvider;
