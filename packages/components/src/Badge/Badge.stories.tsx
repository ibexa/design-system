import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

const meta: Meta<typeof Badge> = {
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    name: 'Default',
    args: {
        children: '1',
        size: 'medium',
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        children: '1',
        size: 'small',
    },
};

export const LongContent: Story = {
    name: 'LongContent',
    args: {
        children: '99+',
        size: 'medium',
    },
};
