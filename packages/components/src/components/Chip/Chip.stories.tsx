import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { Chip } from './';

const meta: Meta<typeof Chip> = {
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation'],
    args: {
        children: 'Chips',
        onClose: action('onClose'),
        isClosable: true,
    },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
    name: 'Default',
    args: {
        error: false,
    },
};

export const More: Story = {
    name: 'More',
    args: {
        children: '+3',
        isClosable: false,
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        error: true,
    },
};
