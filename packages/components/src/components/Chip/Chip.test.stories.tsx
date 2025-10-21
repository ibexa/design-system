import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { Chip } from './';

const meta: Meta<typeof Chip> = {
    component: Chip,
    tags: ['!dev'],
    args: {
        children: 'Chip label',
        onClose: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const TestEnabled: Story = {
    name: 'Enabled',
    args: {
        disabled: false,
    },
    play: async ({ canvasElement, step, args }) => {},
};

export const TestDisabled: Story = {
    name: 'Disabled',
    args: {
        disabled: true,
    },
    play: async ({ canvasElement, step }) => {},
};
