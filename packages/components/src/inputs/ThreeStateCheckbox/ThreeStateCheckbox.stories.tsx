import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import Checkbox from './ThreeStateCheckbox';

const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
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
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Empty: Story = {
    name: 'Empty',
    args: {
        name: 'default-input',
    },
};

export const EmptyDisabled: Story = {
    name: 'Empty (Disabled)',
    args: {
        name: 'default-input',
        disabled: true,
    },
};

export const EmptyError: Story = {
    name: 'Empty (Error)',
    args: {
        name: 'default-input',
        error: true,
    },
};

export const Indeterminate: Story = {
    name: 'Indeterminate',
    args: {
        name: 'default-input',
        checked: true,
        indeterminate: true,
    },
};

export const IndeterminateDisabled: Story = {
    name: 'Indeterminate (Disabled)',
    args: {
        name: 'default-input',
        checked: true,
        indeterminate: true,
        disabled: true,
    },
};

export const IndeterminateError: Story = {
    name: 'Indeterminate (Error)',
    args: {
        name: 'default-input',
        checked: true,
        indeterminate: true,
        error: true,
    },
};

export const Checked: Story = {
    name: 'Checked',
    args: {
        name: 'default-input',
        checked: true,
    },
};

export const CheckedDisabled: Story = {
    name: 'Checked (Disabled)',
    args: {
        name: 'default-input',
        checked: true,
        disabled: true,
    },
};

export const CheckedError: Story = {
    name: 'Checked (Error)',
    args: {
        name: 'default-input',
        checked: true,
        error: true,
    },
};
