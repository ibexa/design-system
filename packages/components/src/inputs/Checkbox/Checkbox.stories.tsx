import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { CheckboxStateful } from './Checkbox';

const meta: Meta<typeof CheckboxStateful> = {
    component: CheckboxStateful,
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
        checked: {
            control: 'boolean',
        },
    },
    args: {
        value: 'checkbox-value',
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
};

export default meta;

type Story = StoryObj<typeof CheckboxStateful>;

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
        disabled: true,
        checked: true,
    },
};

export const CheckedError: Story = {
    name: 'Checked (Error)',
    args: {
        name: 'default-input',
        error: true,
        checked: true,
    },
};
