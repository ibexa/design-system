import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DropdownSingleInputStateful } from '.';
import { generateItemsArray } from '@ids-sb-utils/generators';

const SEARCH_ITEMS_PER_GROUP = 5;
const SEARCH_GROUPS_COUNT = 3;
const SINGLE_MATCHING_GROUP_COUNT = 1;

const meta: Meta<typeof DropdownSingleInputStateful> = {
    component: DropdownSingleInputStateful,
    tags: ['!dev'],
    args: {
        items: [
            { id: 'value1', label: 'Item 1' },
            { id: 'value2', label: 'Item 2' },
            { id: 'value3', label: 'Item 3' },
        ],
        name: 'default-input',
        onChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof DropdownSingleInputStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');
        const selectItemAndAssert = async (itemLabel: string) => {
            await userEvent.click(dropdownWidget);

            const dropdownItem = canvas.getByText(itemLabel, { selector: '.ids-dropdown__item-label' });
            const firstItem = canvas.getByText('Item 1', { selector: '.ids-dropdown__item-label' });

            await expect(document.activeElement).toBe(firstItem.closest('li'));

            await userEvent.click(dropdownItem);

            const selectedInfo = canvas.getByText(itemLabel, { selector: 'div' });

            await expect(selectedInfo).toBeVisible();
            await expect(() => {
                canvas.getByText('Item 2', { selector: 'div' });
            }).toThrowError();
        };

        await step('Select first item on list', async () => {
            await selectItemAndAssert('Item 1');
        });

        await step('Select last item on list', async () => {
            await selectItemAndAssert('Item 3');
        });

        await step('Open dropdown and close without choosing item', async () => {
            await userEvent.click(dropdownWidget);

            const dropdownItem = canvas.getByText('Item 1', { selector: '.ids-dropdown__item-label' });

            await expect(dropdownItem).toBeVisible();
            await userEvent.click(canvasElement);
            await expect(() => {
                canvas.getByText('Item 1', { selector: '.ids-dropdown__item-label' });
            }).toThrowError();
        });
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
    play: async ({ canvasElement, step }) => {
        const ALL_ITEMS_COUNT = 12;
        const ITEMS_WITH_1_COUNT = 4;

        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await step('Search for items with "Item 1"', async () => {
            await userEvent.click(dropdownWidget);

            const visibleItemsAll = canvas.queryAllByText('Item ', { selector: '.ids-dropdown__item-label', exact: false });
            const searchInput = canvas.getByRole('textbox');

            await expect(document.activeElement).toBe(searchInput);
            await expect(visibleItemsAll).toHaveLength(ALL_ITEMS_COUNT);

            await userEvent.type(searchInput, 'Item 1');

            const visibleItemsFiltered = canvas.queryAllByText('Item ', { selector: '.ids-dropdown__item-label', exact: false });

            await expect(visibleItemsFiltered).toHaveLength(ITEMS_WITH_1_COUNT);
        });

        await step('Check if search is cleared after closing dropdown', async () => {
            await userEvent.click(canvasElement);
            await userEvent.click(dropdownWidget);

            const visibleItemsAll = canvas.queryAllByText('Item ', { selector: '.ids-dropdown__item-label', exact: false });
            const searchInput = canvas.getByRole('textbox');

            await expect(visibleItemsAll).toHaveLength(ALL_ITEMS_COUNT);
            await expect(searchInput).toHaveValue('');
        });
    },
};

export const Grouped: Story = {
    name: 'Grouped',
    args: {
        items: [
            { id: 'ungrouped', label: 'Ungrouped item' },
            {
                id: 'fruits',
                items: [
                    { id: 'apple', label: 'Apple' },
                    { id: 'banana', label: 'Banana' },
                ],
                label: 'Fruits',
            },
            {
                id: 'vegetables',
                items: [{ id: 'carrot', label: 'Carrot' }],
                label: 'Vegetables',
            },
        ],
    },
    play: async ({ canvasElement, step }) => {
        const GROUPS_COUNT = 2;
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await step('Groups render with group semantics and headers are not focusable', async () => {
            await userEvent.click(dropdownWidget);

            const groups = canvasElement.querySelectorAll('.ids-dropdown__items .ids-dropdown__group');
            const fruitsLabel = canvas.getByText('Fruits', { selector: '.ids-dropdown__group-label' });
            const ungroupedItem = canvas.getByText('Ungrouped item', { selector: '.ids-dropdown__item-label' });

            await expect(groups).toHaveLength(GROUPS_COUNT);
            await expect(groups[0]).toHaveAttribute('aria-labelledby', fruitsLabel.id);
            await expect(fruitsLabel).not.toHaveAttribute('tabindex');
            await expect(document.activeElement).toBe(ungroupedItem.closest('li'));
        });

        await step('ArrowDown from the last ungrouped item lands on the first grouped item', async () => {
            await userEvent.keyboard('{ArrowDown}');

            const appleItem = canvas.getByText('Apple', { selector: '.ids-dropdown__item-label' });

            await expect(document.activeElement).toBe(appleItem.closest('li'));
        });

        await step('Enter selects the grouped item and the source select keeps its optgroup', async () => {
            await userEvent.keyboard('{Enter}');

            const selectedInfo = canvas.getByText('Apple', { selector: 'div' });
            const groupedOption = canvasElement.querySelector('select optgroup[label="Fruits"] option[value="apple"]');

            await expect(selectedInfo).toBeVisible();
            await expect(groupedOption).not.toBeNull();
        });
    },
};

export const GroupedSearch: Story = {
    name: 'Grouped Search',
    args: {
        items: [
            {
                id: 'colors',
                items: generateItemsArray(SEARCH_ITEMS_PER_GROUP, { label: 'Color' }).map((item) => ({
                    ...item,
                    id: `color-${item.id}`,
                    label: `Color ${item.id}`,
                })),
                label: 'Colors',
            },
            {
                id: 'shapes',
                items: generateItemsArray(SEARCH_ITEMS_PER_GROUP, { label: 'Shape' }).map((item) => ({
                    ...item,
                    id: `shape-${item.id}`,
                    label: `Shape ${item.id}`,
                })),
                label: 'Shapes',
            },
            {
                id: 'sizes',
                items: generateItemsArray(SEARCH_ITEMS_PER_GROUP, { label: 'Size' }).map((item) => ({
                    ...item,
                    id: `size-${item.id}`,
                    label: `Size ${item.id}`,
                })),
                label: 'Sizes',
            },
        ],
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await step('Search keeps only the groups with a matching item', async () => {
            await userEvent.click(dropdownWidget);

            const searchInput = canvas.getByRole('textbox');

            await expect(canvasElement.querySelectorAll('.ids-dropdown__items .ids-dropdown__group')).toHaveLength(SEARCH_GROUPS_COUNT);

            await userEvent.type(searchInput, 'Shape');

            await expect(canvasElement.querySelectorAll('.ids-dropdown__items .ids-dropdown__group')).toHaveLength(
                SINGLE_MATCHING_GROUP_COUNT,
            );
            await expect(canvas.getByText('Shapes', { selector: '.ids-dropdown__group-label' })).toBeVisible();
        });

        await step('A term matching nothing shows the no-results message', async () => {
            const searchInput = canvas.getByRole('textbox');

            await userEvent.clear(searchInput);
            await userEvent.type(searchInput, 'zzz');

            const noResults = canvasElement.querySelector('.ids-dropdown__no-results');

            await expect(canvasElement.querySelectorAll('.ids-dropdown__items .ids-dropdown__group')).toHaveLength(0);
            await expect(noResults).not.toBeNull();
            await expect(noResults?.textContent).not.toBe('');
        });

        await step('Clearing the term restores every group', async () => {
            const searchInput = canvas.getByRole('textbox');

            await userEvent.clear(searchInput);

            await expect(canvasElement.querySelectorAll('.ids-dropdown__items .ids-dropdown__group')).toHaveLength(SEARCH_GROUPS_COUNT);
            await expect(canvasElement.querySelector('.ids-dropdown__no-results')).toBeNull();
        });
    },
};
