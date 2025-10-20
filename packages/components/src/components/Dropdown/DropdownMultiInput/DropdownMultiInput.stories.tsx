import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { DropdownDecorator } from '../../../../../../src/storybook/decorators/DropdownDecorator';
import { DropdownMultiInputStateful } from '.';

const meta: Meta<typeof DropdownMultiInputStateful> = {
    component: DropdownMultiInputStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        items: [
            { id: 'value1', label: 'Item 1' },
            { id: 'value2', label: 'Item 2' },
            { id: 'value3', label: 'Item 3' },
        ],
        name: 'default-input',
        onChange: action('on-change'),
    },
    decorators: [DropdownDecorator],
};

export default meta;

type Story = StoryObj<typeof DropdownMultiInputStateful>;

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

export const Selected: Story = {
    name: 'Selected',
    args: {
        value: ['value2'],
    },
};

export const SelectedDisabled: Story = {
    name: 'Selected (Disabled)',
    args: {
        disabled: true,
        value: ['value2'],
    },
};

export const SelectedError: Story = {
    name: 'Selected (Error)',
    args: {
        error: true,
        value: ['value2'],
    },
};

export const ManyItems: Story = {
    name: 'Many Items',
    args: {
        items: [
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' },
            { id: '3', label: 'Item 3' },
            { id: '4', label: 'Item 4' },
            { id: '5', label: 'Item 5' },
            { id: '6', label: 'Item 6' },
            { id: '7', label: 'Item 7' },
            { id: '8', label: 'Item 8' },
            { id: '9', label: 'Item 9' },
            { id: '10', label: 'Item 10' },
            { id: '11', label: 'Item 11' },
            { id: '12', label: 'Item 12' },
        ],
    },
    parameters: {
        wrapperHeight: 400,
    },
};
