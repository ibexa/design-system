import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { InputTextFieldSize, InputTextFieldStateful } from '.';

const meta: Meta<typeof InputTextFieldStateful> = {
    component: InputTextFieldStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        id: 'default-input',
        name: 'default-input',
        helperText: 'This is a helper text',
        label: 'Input Label',
        input: {
            type: 'text',
        },
        onChange: action('on-change'),
        onValidate: action('on-validate'),
    },
};

export default meta;

type Story = StoryObj<typeof InputTextFieldStateful>;

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
            size: InputTextFieldSize.Small,
            type: 'text',
        },
    },
};

export const Number: Story = {
    name: 'Number',
    args: {
        input: {
            type: 'number',
        },
    },
};
