import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AltRadiosListFieldStateful } from '.';

const meta: Meta<typeof AltRadiosListFieldStateful> = {
    component: AltRadiosListFieldStateful,
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

type Story = StoryObj<typeof AltRadiosListFieldStateful>;

export const DefaultClickLastItem: Story = {
    name: 'Default / Click last item',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input3 = canvas.getByText('Item 3');

        await step('Click last item', async () => {
            await userEvent.click(input3);

            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenLastCalledWith('item3');
            await expect(input3).toHaveClass('ids-alt-radio__tile--checked');
        });
    },
};

export const DefaultClickSecondItem: Story = {
    name: 'Default / Click second item',
    play: async ({ canvasElement, context, step, args }) => {
        await DefaultClickLastItem.play?.(context);

        const canvas = within(canvasElement);
        const input2 = canvas.getByText('Item 2');
        const input3 = canvas.getByText('Item 3');

        await step('Click second item', async () => {
            await userEvent.click(input2);

            await expect(args.onChange).toHaveBeenCalledTimes(2); // eslint-disable-line no-magic-numbers
            await expect(args.onChange).toHaveBeenLastCalledWith('item2');
            await expect(input2).toHaveClass('ids-alt-radio__tile--checked');
            await expect(input3).not.toHaveClass('ids-alt-radio__tile--checked');
        });
    },
};

export const DefaultClickSecondItemAgain: Story = {
    name: 'Default / Click second item again',
    play: async ({ canvasElement, context, step, args }) => {
        await DefaultClickSecondItem.play?.(context);

        const canvas = within(canvasElement);
        const input2 = canvas.getByText('Item 2');

        await step('Click second item once more', async () => {
            await userEvent.click(input2);

            await expect(args.onChange).toHaveBeenCalledTimes(2); // eslint-disable-line no-magic-numbers
        });
    },
};
