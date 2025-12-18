import type { Meta, StoryObj } from '@storybook/react';

import { Badge, BadgeSize, BadgeVariant } from '.';

const meta: Meta<typeof Badge> = {
    component: Badge,
    tags: ['autodocs', 'foundation'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    name: 'Default',
    args: {
        value: '1',
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        value: '1',
        size: BadgeSize.Small,
    },
};

export const Number: Story = {
    name: 'Number',
    args: {
        value: '1',
        variant: BadgeVariant.Number,
        size: BadgeSize.Medium,
    },
};

export const StretchedNumber: Story = {
    name: 'Stretched Number',
    args: {
        value: '100',
        variant: BadgeVariant.Number,
        size: BadgeSize.Medium,
    },
};
