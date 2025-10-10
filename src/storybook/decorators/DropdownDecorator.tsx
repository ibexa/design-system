import React from 'react';

import { PartialStoryFn } from 'storybook/internal/types';

const DEFAULT_WRAPPER_HEIGHT = 200;

const DropdownDecorator = (Story: PartialStoryFn, { parameters }: { parameters: { wrapperHeight?: number } }) => (
    <div style={{ height: parameters.wrapperHeight ?? DEFAULT_WRAPPER_HEIGHT }}>
        <div style={{ overflow: 'hidden', padding: 20 }}>
            <Story />
        </div>
    </div>
);

export default DropdownDecorator;
