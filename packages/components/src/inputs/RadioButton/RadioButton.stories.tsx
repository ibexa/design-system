import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { RadioButtonStateful } from './RadioButton';

const meta: Meta<typeof RadioButtonStateful> = {
    component: RadioButtonStateful,
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
        value: 'value1',
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

type Story = StoryObj<typeof RadioButtonStateful>;

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
