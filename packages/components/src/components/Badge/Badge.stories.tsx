import type { Meta, StoryObj } from '@storybook/react';

import { Badge, BadgeSize } from '.';

const meta: Meta<typeof Badge> = {
    component: Badge,
    tags: ['autodocs', 'foundation'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    name: 'Default',
    args: {
        value: 1,
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        value: 1,
        size: BadgeSize.Small,
    },
};

export const Stretched: Story = {
    name: 'Stretched',
    args: {
        value: 100,
        size: BadgeSize.Medium,
    },
};
