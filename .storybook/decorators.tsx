import React from 'react';
import { StoryFn } from '@storybook/react';

import AssetsProvider from '../packages/components/src/context/Assets/Assets';
import TranslatorProvider from '../packages/components/src/context/Translator/Translator';
import { getTranslations } from '../src/utils/translations';

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

export const ContextDecorator = (Story: StoryFn) => (
    <AssetsProvider value={Assets}>
        <TranslatorProvider value={Translator}>
            <Story />
        </TranslatorProvider>
    </AssetsProvider>
);
