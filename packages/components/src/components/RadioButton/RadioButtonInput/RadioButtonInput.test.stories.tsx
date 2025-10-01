import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { RadioButtonInputStateful } from '.';

const meta: Meta<typeof RadioButtonInputStateful> = {
    component: RadioButtonInputStateful,
    tags: ['!dev'],
    args: {
        name: 'default-input',
        onBlur: fn(),
        onChange: fn(),
        onFocus: fn(),
        onInput: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof RadioButtonInputStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole<HTMLInputElement>('radio');

        await step('Click radio button', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledWith(true, expect.anything());
            await expect(args.onInput).toHaveBeenCalledOnce();
            await expect(args.onInput).toHaveBeenCalledWith(true, expect.anything());
        });

        await step('Click outside radio button', async () => {
            await expect(args.onBlur).not.toHaveBeenCalled();

            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledOnce();
        });
    },
};
