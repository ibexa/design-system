import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BaseDropdown } from './';
import { DropdownDecorator } from '@ids-sb-decorators/DropdownDecorator';

interface DropdownItem {
    id: string;
    label: string;
}

const MANY_ITEMS_LENGTH = 50;

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

const generateItems = (length: number) =>
    Array.from({ length }, (value, index) => {
        const id = String(index + 1); // eslint-disable-line no-magic-numbers

        return {
            id,
            label: `Item ${id}`,
        };
    });

const meta: Meta<typeof BaseDropdown<DropdownItem>> = {
    title: 'components/src/base/BaseDropdown',
    component: BaseDropdown<DropdownItem>,
    tags: ['autodocs', 'foundation', 'base'],
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    args: {
        ...getArguments([
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' },
            { id: '3', label: 'Item 3' },
        ]),
    },
    decorators: [DropdownDecorator],
};

export default meta;

type Story = StoryObj<typeof BaseDropdown<DropdownItem>>;

export const Default: Story = {
    name: 'Default',
    parameters: {
        chromatic: { disableSnapshot: false },
    },
};

export const EmptyDisabled: Story = {
    name: 'Empty (Disabled)',
    parameters: {
        chromatic: { disableSnapshot: false },
    },
    args: {
        disabled: true,
    },
};

export const EmptyError: Story = {
    name: 'Empty (Error)',
    parameters: {
        chromatic: { disableSnapshot: false },
    },
    args: {
        error: true,
    },
};

export const LongItems: Story = {
    name: 'Long items',
    args: {
        ...getArguments([
            { id: '1', label: 'This is a very long item that should be tested in the dropdown' },
            { id: '2', label: 'This is a very long item that should be tested in the dropdown' },
            { id: '3', label: 'This is a very long item that should be tested in the dropdown' },
        ]),
    },
};

export const ManyItems: Story = {
    name: 'Many items',
    args: {
        ...getArguments(generateItems(MANY_ITEMS_LENGTH)),
    },
    parameters: {
        wrapperHeight: 400,
    },
};

export const CloseBottom: Story = {
    name: 'Close bottom',
    args: {
        ...getArguments(generateItems(MANY_ITEMS_LENGTH)),
    },
    parameters: {
        wrapperHeight: 400,
        styles: { paddingTop: 'calc(100vh - 300px)' },
    },
};

export const Scrolling: Story = {
    name: 'Scrolling',
    args: {
        ...getArguments(generateItems(MANY_ITEMS_LENGTH)),
        maxVisibleItems: 15,
    },
    parameters: {
        wrapperHeight: 400,
        styles: { padding: 'calc(40vh) 0' },
    },
};

export const ScrollingWithTop: Story = {
    name: 'Scrolling (Top Placement)',
    args: {
        ...getArguments(generateItems(MANY_ITEMS_LENGTH)),
        maxVisibleItems: 15,
    },
    parameters: {
        wrapperHeight: 400,
        styles: { padding: 'calc(60vh) 0' },
    },
};

export const AllowScrollingOffScreen: Story = {
    name: 'Allow Scrolling Off Screen',
    args: {
        ...getArguments(generateItems(MANY_ITEMS_LENGTH)),
        maxVisibleItems: 15,
    },
    parameters: {
        wrapperHeight: 400,
        styles: { padding: 'calc(100vh) 0' },
    },
};
