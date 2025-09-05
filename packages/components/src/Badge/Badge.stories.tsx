import type { Meta, StoryObj } from '@storybook/react';

import { BadgeSize } from './Badge.types';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation'],
    argTypes: {
        className: {
            control: 'text',
        },
        size: {
            control: 'select',
            options: Object.values(BadgeSize),
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    name: 'Default',
    args: {
        value: 1,
        size: BadgeSize.Medium,
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        value: 1,
        size: BadgeSize.Small,
    },
};

export const Wide: Story = {
    name: 'Wide',
    args: {
        value: 100,
        size: BadgeSize.Medium,
    },
};
