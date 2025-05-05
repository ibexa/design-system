import { ContextDecorator } from './decorators';

import './styles.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
    decorators: [ContextDecorator],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
