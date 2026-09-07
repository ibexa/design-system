import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { FilterDropdownAction, FilterDropdownStateful, FilterDropdownType } from '.';

const meta: Meta<typeof FilterDropdownStateful> = {
    component: FilterDropdownStateful,
    tags: ['!dev'],
    args: {
        items: [
            { id: 'value1', label: 'Item 1' },
            { id: 'value2', label: 'Item 2' },
            { id: 'value3', label: 'Item 3' },
        ],
        label: 'Filter',
        name: 'filter',
        onChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof FilterDropdownStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ args, canvasElement, step }) => {
        const canvas = within(canvasElement);
        const trigger = canvas.getByRole('button', { name: 'Filter' });

        await step('Checking an item reports it and shows the counter', async () => {
            await userEvent.click(trigger);
            await userEvent.click(canvas.getByText('Item 1', { selector: '.ids-dropdown__item-label' }));

            await expect(args.onChange).toHaveBeenLastCalledWith(['value1'], 'value1', FilterDropdownAction.Check);
            await expect(canvasElement.querySelector('.ids-dropdown__counter')).toHaveTextContent('1');
            await expect(canvasElement.querySelector('.ids-dropdown__items-container')).not.toBeNull();
        });

        await step('Unchecking the item reports it', async () => {
            await userEvent.click(canvas.getByText('Item 1', { selector: '.ids-dropdown__item-label' }));

            await expect(args.onChange).toHaveBeenLastCalledWith([], 'value1', FilterDropdownAction.Uncheck);
            await expect(canvasElement.querySelector('.ids-dropdown__counter')).toBeNull();
        });

        await step('Clear reports an empty value, keeps the panel open and disables itself', async () => {
            await userEvent.click(canvas.getByText('Item 2', { selector: '.ids-dropdown__item-label' }));
            await userEvent.click(canvas.getByRole('button', { name: 'Clear' }));

            await expect(args.onChange).toHaveBeenLastCalledWith([], '', FilterDropdownAction.Clear);
            await expect(canvasElement.querySelector('.ids-dropdown__items-container')).not.toBeNull();
            await expect(canvas.getByRole('button', { name: 'Clear' })).toBeDisabled();
        });

        await step('A search with no match shows the no-results row', async () => {
            await userEvent.type(canvas.getByRole('textbox'), 'zzz');

            await expect(canvasElement.querySelector('.ids-dropdown__no-results')).not.toBeNull();
        });

        await step('Escape closes the panel and returns focus to the trigger', async () => {
            await userEvent.keyboard('{Escape}');

            await expect(canvasElement.querySelector('.ids-dropdown__items-container')).toBeNull();
            await expect(document.activeElement).toBe(trigger);
        });
    },
};

export const DashboardValue: Story = {
    name: 'Dashboard value',
    args: {
        type: FilterDropdownType.Dashboard,
        value: ['value2'],
    },
    play: async ({ canvasElement }) => {
        await expect(canvasElement.querySelector('.ids-dropdown__value')).toHaveTextContent('Item 2');
        await expect(canvasElement.querySelector('.ids-dropdown__trigger-label')).toHaveTextContent('Filter:');
        await expect(canvasElement.querySelector('.ids-dropdown__counter')).toBeNull();
    },
};

export const WithoutSearchAndDisabled: Story = {
    name: 'Without search and disabled',
    args: {
        disabled: true,
        hasSearch: false,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('A disabled trigger does not open the panel', async () => {
            await userEvent.click(canvas.getByRole('button', { name: 'Filter' }));

            await expect(canvasElement.querySelector('.ids-dropdown__items-container')).toBeNull();
        });
    },
};
