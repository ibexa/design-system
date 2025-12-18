import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const currDir = path.dirname(fileURLToPath(import.meta.url));

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['../packages/assets/src/', '../assets/'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-webpack5-compiler-swc',
        '@storybook/addon-a11y',
        'storybook-addon-pseudo-states',
        {
            name: '@storybook/addon-coverage',
            options: {
                istanbul: {
                    exclude: ['**/.storybook/**', '**/*.stories.*', '**/storybook-static/**', '**/storybook/**'],
                },
            },
        },
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.scss$/,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                ],
            },
        },
        path.resolve(currDir, '../src/storybook/addons/framework-selector/index.ts'),
        '@chromatic-com/storybook',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    typescript: {
        check: true,
        reactDocgen: 'react-docgen-typescript',
    },
    webpackFinal: async (webpackConfig) => {
        webpackConfig.module.rules.push({
            test: /\.xliff$/,
            use: ['raw-loader'],
        });

        webpackConfig.resolve.alias = {
            ...webpackConfig.resolve.alias,
            '@ids-components': path.resolve(currDir, '../packages/components/src/components'),
            '@ids-context': path.resolve(currDir, '../packages/components/src/context'),
            '@ids-hoc': path.resolve(currDir, '../packages/components/src/hoc'),
            '@ids-hooks': path.resolve(currDir, '../packages/components/src/hooks'),
            '@ids-partials': path.resolve(currDir, '../packages/components/src/partials'),
            '@ids-sb-decorators': path.resolve(currDir, '../src/storybook/decorators'),
            '@ids-sb-utils': path.resolve(currDir, '../src/storybook/utils'),
            '@ids-shared': path.resolve(currDir, '../packages/components/src/shared'),
            '@ids-core': path.resolve(currDir, '../packages/core/src'),
        };

        webpackConfig.plugins.push(new NodePolyfillPlugin());

        return webpackConfig;
    },
};

export default config;
