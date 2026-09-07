import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';
import { action } from 'storybook/actions';

import { generateGroupedItemsArray, generateItemsArray } from '@ids-sb-utils/generators';
import { DropdownDecorator } from '@ids-sb-decorators/DropdownDecorator';
import { DropdownMultiInputStateful } from '.';

const DEFAULT_ITEMS_LENGTH = 5;
const MANY_ITEMS_LENGTH = 50;
const WRAPPER_HEIGHT_FOR_LONG_LIST = 500;
const GROUPED_GROUPS_COUNT = 3;
const GROUPED_ITEMS_PER_GROUP = 3;
const GROUPED_UNGROUPED_COUNT = 1;
const MANY_GROUPED_GROUPS_COUNT = 6;
const MANY_GROUPED_ITEMS_PER_GROUP = 8;
const GROUPED_ITEMS = generateGroupedItemsArray(GROUPED_GROUPS_COUNT, GROUPED_ITEMS_PER_GROUP, GROUPED_UNGROUPED_COUNT);
const MANY_GROUPED_ITEMS = generateGroupedItemsArray(MANY_GROUPED_GROUPS_COUNT, MANY_GROUPED_ITEMS_PER_GROUP, GROUPED_UNGROUPED_COUNT);
const NARROW_WRAPPER_WIDTH = 220;
const LONG_LABEL_ITEMS = generateItemsArray(DEFAULT_ITEMS_LENGTH).map((item) => ({
    ...item,
    label: `Control unit${item.id} | germany | 7 | physical`,
}));

const meta: Meta<typeof DropdownMultiInputStateful> = {
    component: DropdownMultiInputStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        items: generateItemsArray(DEFAULT_ITEMS_LENGTH),
        name: 'default-input',
        onChange: action('on-change'),
    },
    argTypes: {
        onChange: { control: { disable: true } },
    },
    decorators: [DropdownDecorator],
};

export default meta;

type Story = StoryObj<typeof DropdownMultiInputStateful>;

export const Empty: Story = {
    name: 'Empty',
};

export const EmptyOpenedMenu: Story = {
    name: 'Empty (Opened Menu)',
    tags: ['!dev'],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await userEvent.click(dropdownWidget);
    },
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
        value: ['2'],
    },
};

export const SelectedOpenedMenu: Story = {
    name: 'Selected (Opened Menu)',
    tags: ['!dev'],
    args: {
        value: ['2'],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Item 2', { selector: '.ids-dropdown__selection-info-items' });

        await userEvent.click(dropdownWidget);
    },
};

export const SelectedDisabled: Story = {
    name: 'Selected (Disabled)',
    args: {
        disabled: true,
        value: ['2'],
    },
};

export const SelectedError: Story = {
    name: 'Selected (Error)',
    args: {
        error: true,
        value: ['2'],
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

export const ManyItemsOpenedMenu: Story = {
    name: 'Many Items (Opened Menu)',
    tags: ['!dev'],
    args: {
        items: generateItemsArray(MANY_ITEMS_LENGTH),
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await userEvent.click(dropdownWidget);
    },
};

export const ManyItemsManySelected: Story = {
    name: 'Many Items / Many Selected',
    args: {
        items: generateItemsArray(MANY_ITEMS_LENGTH),
        value: ['3', '4', '8', '11'],
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
};

export const ManyItemsManySelectedOpenedMenu: Story = {
    name: 'Many Items / Many Selected (Opened Menu)',
    tags: ['!dev'],
    args: {
        items: generateItemsArray(MANY_ITEMS_LENGTH),
        value: ['3', '4', '8'],
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.queryByText('Item 3', { selector: '.ids-dropdown__selection-info-items', exact: false });

        if (dropdownWidget) {
            await userEvent.click(dropdownWidget);
        }
    },
};

export const NarrowLongLabels: Story = {
    name: 'Narrow / Long Labels',
    args: {
        items: LONG_LABEL_ITEMS,
        value: ['1', '2'],
    },
    parameters: {
        styles: { width: NARROW_WRAPPER_WIDTH },
    },
};

export const NarrowLongLabelsOpenedMenu: Story = {
    name: 'Narrow / Long Labels (Opened Menu)',
    tags: ['!dev'],
    args: {
        items: LONG_LABEL_ITEMS,
        value: ['1', '2'],
    },
    parameters: {
        styles: { width: NARROW_WRAPPER_WIDTH },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('+1', { selector: '.ids-dropdown__selection-info-items' });

        await userEvent.click(dropdownWidget);
    },
};

export const Grouped: Story = {
    name: 'Grouped',
    args: {
        items: GROUPED_ITEMS,
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
};

export const GroupedOpenedMenu: Story = {
    name: 'Grouped (Opened Menu)',
    tags: ['!dev'],
    args: {
        items: GROUPED_ITEMS,
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await userEvent.click(dropdownWidget);
    },
};

export const GroupedSelectedOpenedMenu: Story = {
    name: 'Grouped / Selected (Opened Menu)',
    tags: ['!dev'],
    args: {
        items: GROUPED_ITEMS,
        value: ['group-2-item-1'],
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
    play: async ({ canvasElement }) => {
        const dropdownWidget = canvasElement.querySelector('.ids-dropdown__widget');

        if (dropdownWidget) {
            await userEvent.click(dropdownWidget);
        }
    },
};

export const GroupedManyItemsOpenedMenu: Story = {
    name: 'Grouped / Many Items (Opened Menu)',
    tags: ['!dev'],
    args: {
        items: MANY_GROUPED_ITEMS,
    },
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT_FOR_LONG_LIST,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await userEvent.click(dropdownWidget);
    },
};
