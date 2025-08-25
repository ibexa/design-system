import type { Meta, StoryObj } from '@storybook/react';

import { BADGE_SIZE_VALUES } from './Badge.types';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'number',
        },
        className: {
            control: 'text',
        },
        size: {
            control: 'select',
            options: BADGE_SIZE_VALUES,
        },
    },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    name: 'Default',
    args: {
        value: 1,
        size: 'medium',
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        value: 1,
        size: 'small',
    },
};
