import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { InputTextSize } from '../../inputs/InputText';

import { FormControlInputTextStateful } from './';

const meta: Meta<typeof FormControlInputTextStateful> = {
    component: FormControlInputTextStateful,
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

type Story = StoryObj<typeof FormControlInputTextStateful>;

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
            size: InputTextSize.Small,
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
