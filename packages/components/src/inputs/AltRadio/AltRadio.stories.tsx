import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { AltRadioStateful } from './';

const meta: Meta<typeof AltRadioStateful> = {
    component: AltRadioStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        label: '1:1',
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

type Story = StoryObj<typeof AltRadioStateful>;

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
