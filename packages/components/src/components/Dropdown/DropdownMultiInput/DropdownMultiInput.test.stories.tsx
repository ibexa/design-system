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

            const firstItem = canvas.getByText('Item 1', { selector: 'li' });
            const lastItem = canvas.getByText('Item 3', { selector: 'li' });

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

            const lastItem = canvas.getByText('Item 3', { selector: 'li' });

            await userEvent.click(lastItem);

            const selectedInfo = canvas.getByText('Item 1', { selector: 'div' });

            await expect(selectedInfo).toBeVisible();
            await expect(() => {
                canvas.getByText('Item 3', { selector: 'div' });
            }).toThrowError();
        });
    },
};
