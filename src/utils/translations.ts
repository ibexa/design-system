import { xliff12ToJs } from 'xliff';

import xliffContent from '../../packages/components/assets/ibexa_design_system.en.xliff';

let translations = {};

interface TranslationEntryType {
    source: string;
    target: string;
}

interface XliffContentType {
    resources: {
        ibexa_design_system?: Record<string, TranslationEntryType>;
    };
}

void xliff12ToJs(xliffContent).then(({ resources }: XliffContentType) => {
    if (resources.ibexa_design_system) {
        translations = resources.ibexa_design_system;
    }
});

const getTranslations = (): Partial<Record<string, TranslationEntryType>> => translations;

export { getTranslations };
