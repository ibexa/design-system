import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DropdownMultiInputStateful } from '.';

const meta: Meta<typeof DropdownMultiInputStateful> = {
    component: DropdownMultiInputStateful,
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

type Story = StoryObj<typeof DropdownMultiInputStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('Select an item');

        await step('Select first and last item on list', async () => {
            await userEvent.click(dropdownWidget);

            const firstItem = canvas.getByText('Item 1', { selector: '.ids-dropdown__item-label' });
            const lastItem = canvas.getByText('Item 3', { selector: '.ids-dropdown__item-label' });

            await userEvent.click(firstItem);
            await userEvent.click(lastItem);
            await userEvent.click(canvasElement);

            const selectedItem = canvas.getByText('Item 1', { selector: 'div' });
            const overflowItem = canvas.getByText('+1', { selector: 'div' });

            await expect(selectedItem).toBeVisible();
            await expect(overflowItem).toBeVisible();
            await expect(() => {
                canvas.getByText('Item 2', { selector: 'div' });
            }).toThrowError();
        });

        await step('Uncheck last item on list', async () => {
            await userEvent.click(dropdownWidget);

            const lastItem = canvas.getByText('Item 3', { selector: '.ids-dropdown__item-label' });

            await userEvent.click(lastItem);

            const selectedInfo = canvas.getByText('Item 1', { selector: 'div' });

            await expect(selectedInfo).toBeVisible();
            await expect(() => {
                canvas.getByText('Item 3', { selector: 'div' });
            }).toThrowError();
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

        await step('Groups render with group semantics and checkbox items inside', async () => {
            await userEvent.click(dropdownWidget);

            const groups = canvasElement.querySelectorAll('.ids-dropdown__items .ids-dropdown__group');
            const fruitsLabel = canvas.getByText('Fruits', { selector: '.ids-dropdown__group-label' });

            await expect(groups).toHaveLength(GROUPS_COUNT);
            await expect(groups[0]).toHaveAttribute('aria-labelledby', fruitsLabel.id);
            await expect(groups[0].querySelectorAll('.ids-input--checkbox')).toHaveLength(GROUPS_COUNT);
        });

        await step('Selecting a grouped item shows its chip and keeps the optgroup in the source select', async () => {
            const appleItem = canvas.getByText('Apple', { selector: '.ids-dropdown__item-label' });

            await userEvent.click(appleItem);
            await userEvent.click(canvasElement);

            const selectedChip = canvas.getByText('Apple', { selector: 'div' });
            const groupedOption = canvasElement.querySelector('select optgroup[label="Fruits"] option[value="apple"]');

            await expect(selectedChip).toBeVisible();
            await expect(groupedOption).not.toBeNull();
        });
    },
};
