import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { FormControlStateful } from './FormControl';

const meta: Meta<typeof FormControlStateful> = {
    component: FormControlStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        extraClasses: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
    },
    args: {
        input: {
            name: 'default-input',
            onBlur: action('on-blur'),
            onChange: action('on-change'),
            onFocus: action('on-focus'),
            onInput: action('on-input'),
        },
        onValidate: action('on-validate'),
    },
};

export default meta;

type Story = StoryObj<typeof FormControlStateful>;

export const Default: Story = {
    name: 'Default',
    args: {
        helperText: {
            content: 'This is a helper text',
        },
        label: {
            content: 'Label',
        },
    },
};

export const Required: Story = {
    name: 'Required',
    args: {
        helperText: {
            content: 'This is a helper text',
        },
        input: {
            name: 'required-input',
            required: true,
        },
        label: {
            content: 'Label',
        },
    },
};
