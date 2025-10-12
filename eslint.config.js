import getIbexaConfig from '@ibexa/eslint-config/eslint';

export default [
    ...getIbexaConfig(),
    {
        files: ['**/*.stories.js', '**/*.stories.jsx', '**/*.stories.ts', '**/*.stories.tsx'],
        rules: {
            'sort-keys': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
        },
    },
];
