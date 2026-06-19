import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const currDir = path.dirname(fileURLToPath(import.meta.url));

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['../packages/assets/src/', '../assets/'],
    addons: [
        getAbsolutePath("@storybook/addon-docs"),
        getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
        getAbsolutePath("@storybook/addon-a11y"),
        getAbsolutePath("storybook-addon-pseudo-states"),
        {
            name: getAbsolutePath("@storybook/addon-coverage"),
            options: {
                istanbul: {
                    exclude: ['**/.storybook/**', '**/*.stories.*', '**/storybook-static/**', '**/storybook/**'],
                },
            },
        },
        {
            name: getAbsolutePath("@storybook/addon-styling-webpack"),
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
        getAbsolutePath("@chromatic-com/storybook"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-webpack5"),
        options: {},
    },
    core: {
        allowedHosts: true,
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

function getAbsolutePath(value) {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
