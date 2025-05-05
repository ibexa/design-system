import ibexaConfig from 'eslint-config-ibexa/eslint';

export default [
    ...ibexaConfig,
    {
        files: ['**/*.stories.js', '**/*.stories.jsx', '**/*.stories.ts', '**/*.stories.tsx'],
        rules: {
            "sort-keys": "off",
        },
    },
];
