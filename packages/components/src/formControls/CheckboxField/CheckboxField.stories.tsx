import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { CheckboxFieldStateful } from './CheckboxField';

const meta: Meta<typeof CheckboxFieldStateful> = {
    component: CheckboxFieldStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'base'],
    argTypes: {
        className: { control: 'text' },
    },
    args: {
        id: 'default-input',
        label: 'Checkbox Label',
        name: 'default-input',
        value: 'checkbox-value',
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
};

export default meta;

type Story = StoryObj<typeof CheckboxFieldStateful>;

export const Empty: Story = {
    name: 'Empty',
};

export const EmptyDisabled: Story = {
    name: 'Empty (Disabled)',
    args: {
        disabled: true,
    },
};

export const EmptyError: Story = {
    name: 'Empty (Error)',
    args: {
        error: true,
    },
};

export const Checked: Story = {
    name: 'Checked',
    args: {
        checked: true,
    },
};

export const CheckedDisabled: Story = {
    name: 'Checked (Disabled)',
    args: {
        disabled: true,
        checked: true,
    },
};

export const CheckedError: Story = {
    name: 'Checked (Error)',
    args: {
        error: true,
        checked: true,
    },
};
