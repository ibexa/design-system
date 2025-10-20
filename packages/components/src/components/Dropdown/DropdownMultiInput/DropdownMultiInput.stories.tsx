import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { DropdownDecorator } from '@ids-sb-decorators/DropdownDecorator';
import { DropdownMultiInputStateful } from '.';
import { generateItemsArray } from '@ids-sb-utils/generators';

const DEFAULT_ITEMS_LENGTH = 5;
const MANY_ITEMS_LENGTH = 50;
const WRAPPER_HEIGHT_FOR_LONG_LIST = 400;

const meta: Meta<typeof DropdownMultiInputStateful> = {
    component: DropdownMultiInputStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        items: generateItemsArray(DEFAULT_ITEMS_LENGTH),
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
        items: generateItemsArray(MANY_ITEMS_LENGTH),
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
};
