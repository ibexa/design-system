import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { ThreeStateCheckboxStateful } from './';

const meta: Meta<typeof ThreeStateCheckboxStateful> = {
    component: ThreeStateCheckboxStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        name: 'default-input',
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
};

export default meta;

type Story = StoryObj<typeof ThreeStateCheckboxStateful>;

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

export const Indeterminate: Story = {
    name: 'Indeterminate',
    args: {
        indeterminate: true,
    },
};

export const IndeterminateDisabled: Story = {
    name: 'Indeterminate (Disabled)',
    args: {
        indeterminate: true,
        disabled: true,
    },
};

export const IndeterminateError: Story = {
    name: 'Indeterminate (Error)',
    args: {
        indeterminate: true,
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
