import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { RestrictedItem } from '.';

const meta: Meta<typeof RestrictedItem> = {
    component: RestrictedItem,
    tags: ['autodocs', 'foundation'],
};

export default meta;

type Story = StoryObj<typeof RestrictedItem>;

export const Default: Story = {
    name: 'Default',
    args: {
        name: 'Internal Pricing Strategy 2026',
    },
};

export const CustomMessage: Story = {
    name: 'Custom message',
    args: {
        name: 'Partner NDA Template v3',
        message: 'This content is restricted to authorised users only.',
    },
};