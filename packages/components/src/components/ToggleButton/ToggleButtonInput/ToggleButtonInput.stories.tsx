import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { ToggleButtonInputSize, ToggleButtonInputStateful } from '.';

const meta: Meta<typeof ToggleButtonInputStateful> = {
    component: ToggleButtonInputStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        name: 'default-input',
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
    argTypes: {
        onBlur: { control: { disable: true } },
        onChange: { control: { disable: true } },
        onFocus: { control: { disable: true } },
        onInput: { control: { disable: true } },
        ref: { control: { disable: true } },
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

type Story = StoryObj<typeof ToggleButtonInputStateful>;

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
        size: ToggleButtonInputSize.Small,
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
        size: ToggleButtonInputSize.Small,
    },
};

export const CustomLabelUnchecked: Story = {
    name: 'Custom Label / Unchecked',
    args: {
        checked: false,
        offLabel: 'Inactive',
        onLabel: 'Active',
    },
};

export const CustomLabelChecked: Story = {
    name: 'Custom Label / Checked',
    args: {
        checked: true,
        offLabel: 'Inactive',
        onLabel: 'Active',
    },
};
