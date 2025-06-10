import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { INPUT_SIZE_VALUES, INPUT_TYPE_VALUES } from './Input.types';
import Input from './Input';

const meta: Meta<typeof Input> = {
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'inputs'],
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(INPUT_SIZE_VALUES),
        },
        type: {
            control: 'select',
            options: Object.values(INPUT_TYPE_VALUES),
        },
        extraClasses: {
            control: 'text',
        },
    },
    args: { onChange: action('on-change') },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    name: 'Default',
    args: {
        name: 'default-input',
    },
};

export const WithDefinedId: Story = {
    name: 'With defined ID',
    args: {
        name: 'default-input',
        id: 'defined-id',
    },
};

export const Disabled: Story = {
    name: 'Disabled',
    args: {
        name: 'default-input',
        disabled: true,
    },
};

export const DisabledFilled: Story = {
    name: 'Disabled Filled',
    args: {
        name: 'default-input',
        value: 'Lorem Ipsum',
        disabled: true,
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        name: 'default-input',
        error: true,
    },
};

export const ErrorFilled: Story = {
    name: 'Error Filled',
    args: {
        name: 'default-input',
        value: 'Lorem Ipsum',
        error: true,
    },
};

export const Noncontrolled: Story = {
    name: 'Non-controlled',
    args: {
        name: 'default-input',
        controlled: false,
    },
};
