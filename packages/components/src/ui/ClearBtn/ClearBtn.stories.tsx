import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import ClearBtn from './ClearBtn';

const meta: Meta<typeof ClearBtn> = {
    component: ClearBtn,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'buttons'],
    argTypes: {},
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
