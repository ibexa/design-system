import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { RadioButtonFieldStateful } from './';

const meta: Meta<typeof RadioButtonFieldStateful> = {
    component: RadioButtonFieldStateful,
    tags: ['!dev'],
    args: {
        id: 'default-input',
        label: 'Radio Button Label',
        name: 'default-input',
        onBlur: fn(),
        onChange: fn(),
        onFocus: fn(),
        onInput: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof RadioButtonFieldStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole<HTMLInputElement>('radio');

        await step('Click radio button', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(args.onInput).toHaveBeenCalledOnce();
            await expect(args.onInput).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(input.checked).toBe(true);
        });

        await step('Click radio button again', async () => {
            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(args.onInput).toHaveBeenCalledOnce();
            await expect(args.onInput).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(input.checked).toBe(true);
        });

        await step('Click outside checkbox', async () => {
            await expect(args.onBlur).not.toHaveBeenCalled();

            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledOnce();
        });
    },
};

export const UsingLabel: Story = {
    name: 'Using Label',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole<HTMLInputElement>('radio');
        const label = canvas.getByText('Radio Button Label');

        await step('Click radio button label', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(label);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(args.onInput).toHaveBeenCalledOnce();
            await expect(args.onInput).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(input.checked).toBe(true);
        });

        await step('Click radio button label again', async () => {
            await userEvent.click(label);

            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(args.onInput).toHaveBeenCalledOnce();
            await expect(args.onInput).toHaveBeenLastCalledWith(true, expect.anything());
            await expect(input.checked).toBe(true);
        });
    },
};
