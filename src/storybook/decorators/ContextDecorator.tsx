import React from 'react';

import { PartialStoryFn } from 'storybook/internal/types';

import { AssetsProvider } from '@ids-context/Assets';
import { TranslatorProvider } from '@ids-context/Translator';
import { getTranslations } from '../../utils/translations';

const Assets = {
    getIconPath: (name: string) => `./img/all-icons.svg#${name}`,
};
const Translator = {
    trans: (key: string, parameters: Record<string, string> = {}) => {
        const translations = getTranslations();
        let translation = translations[key]?.target ?? key;

        for (const parameterKey in parameters) {
            if (Object.hasOwn(parameters, parameterKey)) {
                translation = translation.replaceAll(`%${parameterKey}%`, parameters[parameterKey]);
            }
        }

        return translation;
    },
};

export const ContextDecorator = (Story: PartialStoryFn) => (
    <AssetsProvider value={Assets}>
        <TranslatorProvider value={Translator}>
            <Story />
        </TranslatorProvider>
    </AssetsProvider>
);
