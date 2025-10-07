import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DropdownSingleInputStateful } from '.';

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

            const dropdownItem = canvas.getByText(itemLabel, { selector: 'li' });
            const firstItem = canvas.getByText('Item 1', { selector: 'li' });

            await expect(document.activeElement).toBe(firstItem);

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

            const dropdownItem = canvas.getByText('Item 1', { selector: 'li' });

            await expect(dropdownItem).toBeVisible();
            await userEvent.click(canvasElement);
            await expect(() => {
                canvas.getByText('Item 1', { selector: 'li' });
            }).toThrowError();
        });
    },
};

export const ManyItems: Story = {
    name: 'Many Items',
    args: {
        items: [
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
        ],
    },
    play: async ({ canvasElement, step }) => {
        const ALL_ITEMS_COUNT = 12;
        const ITEMS_WITH_1_COUNT = 4;

        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await step('Search for items with "Item 1"', async () => {
            await userEvent.click(dropdownWidget);

            const visibleItemsAll = canvas.queryAllByText('Item ', { selector: 'li', exact: false });
            const searchInput = canvas.getByRole('textbox');

            await expect(document.activeElement).toBe(searchInput);
            await expect(visibleItemsAll).toHaveLength(ALL_ITEMS_COUNT);

            await userEvent.type(searchInput, 'Item 1');

            const visibleItemsFiltered = canvas.queryAllByText('Item ', { selector: 'li', exact: false });

            await expect(visibleItemsFiltered).toHaveLength(ITEMS_WITH_1_COUNT);
        });

        await step('Check if search is cleared after closing dropdown', async () => {
            await userEvent.click(canvasElement);
            await userEvent.click(dropdownWidget);

            const visibleItemsAll = canvas.queryAllByText('Item ', { selector: 'li', exact: false });
            const searchInput = canvas.getByRole('textbox');

            await expect(visibleItemsAll).toHaveLength(ALL_ITEMS_COUNT);
            await expect(searchInput).toHaveValue('');
        });
    },
};
