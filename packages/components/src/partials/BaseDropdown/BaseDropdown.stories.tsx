import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BASE_DROPDOWN_CLASS, BaseDropdown } from './';
import DropdownDecorator from '../../../../../src/storybook/decorators/DropdownDecorator';

interface DropdownItem {
    id: number;
    label: string;
}

const getArguments = (items: DropdownItem[]) => ({
    items,
    renderSource: () => (
        <select>
            {items.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.label}
                </option>
            ))}
        </select>
    ),
});
const renderItem = (item: DropdownItem) => item.label;

const meta: Meta<typeof BaseDropdown<DropdownItem>> = {
    title: 'components/src/base/BaseDropdown',
    component: BaseDropdown<DropdownItem>,
    tags: ['autodocs', 'foundation', 'base'],
    args: {
        renderItem,
        children: <div className={BASE_DROPDOWN_CLASS.PLACEHOLDER}>Select an item</div>,
        ...getArguments([
            { id: 1, label: 'Item 1' },
            { id: 2, label: 'Item 2' },
            { id: 3, label: 'Item 3' },
        ]),
    },
    decorators: [DropdownDecorator],
};

export default meta;

type Story = StoryObj<typeof BaseDropdown<DropdownItem>>;

export const Default: Story = {
    name: 'Default',
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

export const LongItems: Story = {
    name: 'Long items',
    args: {
        ...getArguments([
            { id: 1, label: 'This is a very long item that should be tested in the dropdown' },
            { id: 2, label: 'This is a very long item that should be tested in the dropdown' },
            { id: 3, label: 'This is a very long item that should be tested in the dropdown' },
        ]),
    },
};

export const ManyItems: Story = {
    name: 'Many items',
    args: {
        ...getArguments([
            { id: 1, label: 'Item 1' },
            { id: 2, label: 'Item 2' },
            { id: 3, label: 'Item 3' },
            { id: 4, label: 'Item 4' },
            { id: 5, label: 'Item 5' },
            { id: 6, label: 'Item 6' },
            { id: 7, label: 'Item 7' },
            { id: 8, label: 'Item 8' },
            { id: 9, label: 'Item 9' },
            { id: 10, label: 'Item 10' },
            { id: 11, label: 'Item 11' },
            { id: 12, label: 'Item 12' },
        ]),
    },
    parameters: {
        wrapperHeight: 400,
    },
};
