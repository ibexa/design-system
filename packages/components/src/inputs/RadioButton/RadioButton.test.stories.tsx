import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { RadioButtonStateful } from './RadioButton';

const meta: Meta<typeof RadioButtonStateful> = {
    component: RadioButtonStateful,
    parameters: {
        layout: 'centered',
    },
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

type Story = StoryObj<typeof RadioButtonStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('radio');

        await step('Checkbox handles focus event', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onInput).toHaveBeenCalledOnce();
        });

        await step('Checkbox handles blur event', async () => {
            await expect(args.onBlur).not.toHaveBeenCalled();

            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledOnce();
        });
    },
};
