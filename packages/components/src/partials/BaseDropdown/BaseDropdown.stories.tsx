import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { BaseDropdown } from './';
import { DropdownDecorator } from '@ids-sb-decorators/DropdownDecorator';
import { generateItemsArray } from '@ids-sb-utils/generators';

interface DropdownItem {
    id: string;
    label: string;
}

const DEFAULT_ITEMS_LENGTH = 5;
const MANY_ITEMS_LENGTH = 50;
const WRAPPER_HEIGHT_FOR_LONG_LIST = 400;

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

const meta: Meta<typeof BaseDropdown<DropdownItem>> = {
    title: 'components/src/base/BaseDropdown',
    component: BaseDropdown<DropdownItem>,
    tags: ['autodocs', 'foundation', 'base'],
    parameters: {
        chromatic: { disableSnapshot: true },
    },
    args: {
        ...getArguments(generateItemsArray(DEFAULT_ITEMS_LENGTH)),
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
        ...getArguments(
            generateItemsArray(DEFAULT_ITEMS_LENGTH, {
                label: 'This is a very long item that should be tested in the dropdown',
            }),
        ),
    },
};

export const ManyItems: Story = {
    name: 'Many items',
    args: {
        ...getArguments(generateItemsArray(MANY_ITEMS_LENGTH)),
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
};

export const CloseBottom: Story = {
    name: 'Close bottom',
    args: {
        ...getArguments(generateItemsArray(MANY_ITEMS_LENGTH)),
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
        styles: { paddingTop: 'calc(100vh - 300px)' },
    },
};

export const Scrolling: Story = {
    name: 'Scrolling',
    args: {
        ...getArguments(generateItemsArray(MANY_ITEMS_LENGTH)),
        maxVisibleItems: 15,
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
        styles: { padding: 'calc(40vh) 0' },
    },
};

export const ScrollingWithTop: Story = {
    name: 'Scrolling (Top Placement)',
    args: {
        ...getArguments(generateItemsArray(MANY_ITEMS_LENGTH)),
        maxVisibleItems: 15,
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
        styles: { padding: 'calc(60vh) 0' },
    },
};

export const AllowScrollingOffScreen: Story = {
    name: 'Allow Scrolling Off Screen',
    args: {
        ...getArguments(generateItemsArray(MANY_ITEMS_LENGTH)),
        maxVisibleItems: 15,
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
        styles: { padding: 'calc(100vh) 0' },
    },
};
