import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { ToggleSize, ToggleStateful } from './';

const meta: Meta<typeof ToggleStateful> = {
    component: ToggleStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        name: 'default-input',
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
    decorators: [
        (Story) => {
            return (
                <form name="default-form">
                    <Story />
                </form>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof ToggleStateful>;

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
    name: 'Empty (Small)',
    args: {
        size: ToggleSize.Small,
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
    name: 'Checked (Small)',
    args: {
        checked: true,
        size: ToggleSize.Small,
    },
};
