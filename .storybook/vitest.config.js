import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            exclude: [...coverageConfigDefaults.exclude, '**/.storybook/**', '**/*.stories.*', '**/storybook-static/**', '**/storybook/**'],
        },
    },
});
