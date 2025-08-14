import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { InputTextStateful } from './InputText';

const meta: Meta<typeof InputTextStateful> = {
    component: InputTextStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'inputs'],
    argTypes: {
        className: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
        value: {
            control: 'text',
        },
    },
    args: {
        id: 'default-input',
        name: 'default-input',
        onChange: action('on-change'),
        onValidate: action('on-validate'),
    },
};

export default meta;

type Story = StoryObj<typeof InputTextStateful>;

export const Default: Story = {
    name: 'Default',
    args: {
        helperText: 'This is a helper text',
        label: 'Input Label',
        input: {
            size: 'medium',
            type: 'text',
        },
    },
};

export const Required: Story = {
    name: 'Required',
    args: {
        helperText: 'This is a helper text',
        label: 'Input Label',
        input: {
            size: 'medium',
            required: true,
            type: 'text',
        },
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        helperText: 'This is a helper text',
        label: 'Input Label',
        input: {
            size: 'small',
            type: 'text',
        },
    },
};

export const Number: Story = {
    name: 'Number',
    args: {
        helperText: 'This is a helper text',
        label: 'Input Label',
        input: {
            size: 'medium',
            type: 'number',
        },
    },
};
