import { ContextDecorator } from '@ids-sb-decorators/ContextDecorator';

import './styles.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
    decorators: [ContextDecorator],
    parameters: {
        layout: 'centered',
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
            sort: 'requiredFirst',
        },
    },
};

export default preview;
