import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import ClearBtn from './';

const meta: Meta<typeof ClearBtn> = {
    component: ClearBtn,
    tags: ['autodocs', 'buttons'],
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof ClearBtn>;

export const Default: Story = {
    name: 'Default',
};

export const Disabled: Story = {
    name: 'Disabled',
    args: {
        disabled: true,
    },
};
