import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { ToggleButtonFieldSize, ToggleButtonFieldStateful } from '.';

const meta: Meta<typeof ToggleButtonFieldStateful> = {
    component: ToggleButtonFieldStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        id: 'default-input',
        name: 'default-input',
        helperText: 'This is a helper text',
        label: 'Input Label',
        onChange: action('on-change'),
    },
    argTypes: {
        onChange: { control: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof ToggleButtonFieldStateful>;

export const Default: Story = {
    name: 'Default',
};

export const Required: Story = {
    name: 'Required',
    args: {
        required: true,
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        input: {
            size: ToggleButtonFieldSize.Small,
        },
    },
};
