const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

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
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: { implementation: require.resolve('sass') },
                            },
                        ],
                    },
                ],
            },
        },
        path.resolve(__dirname, '../src/storybook/addons/framework-selector/index.ts'),
        '@chromatic-com/storybook'
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
            '@ids-components': path.resolve(__dirname, '../packages/components/src/components'),
            '@ids-context': path.resolve(__dirname, '../packages/components/src/context'),
            '@ids-hoc': path.resolve(__dirname, '../packages/components/src/hoc'),
            '@ids-hooks': path.resolve(__dirname, '../packages/components/src/hooks'),
            '@ids-partials': path.resolve(__dirname, '../packages/components/src/partials'),
            '@ids-shared': path.resolve(__dirname, '../packages/components/src/shared'),
            '@ids-core': path.resolve(__dirname, '../packages/components/src/core'),
        };

        webpackConfig.plugins.push(new NodePolyfillPlugin());

        return webpackConfig;
    },
    env: (envConfig) => ({
        ...envConfig,
        TWIG_COMPONENTS_BASE_URL: 'http://localhost:8000',
    }),
};
export default config;
