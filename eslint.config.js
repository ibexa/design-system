import getIbexaConfig from '@ibexa/eslint-config/eslint';

export default [
    ...getIbexaConfig(),
    {
        files: ['**/*.stories.js', '**/*.stories.jsx', '**/*.stories.ts', '**/*.stories.tsx'],
        rules: {
            'sort-keys': 'off',
        },
    },
];
