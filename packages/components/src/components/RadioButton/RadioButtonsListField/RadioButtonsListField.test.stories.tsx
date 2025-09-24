import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { RadioButtonsListFieldStateful } from '.';

const meta: Meta<typeof RadioButtonsListFieldStateful> = {
    component: RadioButtonsListFieldStateful,
    tags: ['!dev'],
    args: {
        label: 'Choice Inputs List Label',
        helperText: 'This is a helper text',
        value: 'item1',
        items: [
            { id: 'item1', label: 'Item 1', value: 'item1' },
            { id: 'item2', label: 'Item 2', value: 'item2' },
            { id: 'item3', label: 'Item 3', value: 'item3' },
        ],
        onChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof RadioButtonsListFieldStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input2 = canvas.getByRole<HTMLInputElement>('radio', { name: 'Item 2' });
        const input3 = canvas.getByRole<HTMLInputElement>('radio', { name: 'Item 3' });

        await step('Click last item', async () => {
            await userEvent.click(input3);

            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenLastCalledWith('item3');
            await expect(input3.checked).toBe(true);
        });

        await step('Click second item', async () => {
            await userEvent.click(input2);

            await expect(args.onChange).toHaveBeenCalledTimes(2); // eslint-disable-line no-magic-numbers
            await expect(args.onChange).toHaveBeenLastCalledWith('item2');
            await expect(input2.checked).toBe(true);
            await expect(input3.checked).toBe(false);
        });

        await step('Click second item once more', async () => {
            await userEvent.click(input2);

            await expect(args.onChange).toHaveBeenCalledTimes(2); // eslint-disable-line no-magic-numbers
        });
    },
};
