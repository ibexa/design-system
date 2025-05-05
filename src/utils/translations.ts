import { xliff12ToJs } from 'xliff';

import xliffContent from '../../packages/components/assets/translations.xliff';

let translations = {};

interface TranslationEntryType {
    source: string;
    target: string;
}

interface XliffContentType {
    resources: {
        ibexa_react_components?: Record<string, TranslationEntryType>;
    };
}

void xliff12ToJs(xliffContent).then(({ resources }: XliffContentType) => {
    if (resources.ibexa_react_components) {
        translations = resources.ibexa_react_components;
    }
});

const getTranslations = (): Partial<Record<string, TranslationEntryType>> => translations;

export { getTranslations };
