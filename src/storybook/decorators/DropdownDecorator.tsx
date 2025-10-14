import React from 'react';

import { PartialStoryFn } from 'storybook/internal/types';

const DEFAULT_WRAPPER_HEIGHT = 200;

export const DropdownDecorator = (
    Story: PartialStoryFn,
    { parameters }: { parameters: { wrapperHeight?: number; styles?: React.CSSProperties } },
) => (
    <div style={{ height: parameters.wrapperHeight ?? DEFAULT_WRAPPER_HEIGHT, ...parameters.styles }}>
        <div style={{ overflow: 'hidden', padding: 20 }}>
            <Story />
        </div>
    </div>
);
