import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
    component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>;

const NUMBER_OF_CLICKS_FOCUS = 2;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('checkbox');

        await step('Checkbox handles focus event', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledTimes(NUMBER_OF_CLICKS_FOCUS);
            await expect(args.onInput).toHaveBeenCalledTimes(NUMBER_OF_CLICKS_FOCUS);
        });

        await step('Checkbox handles blur event', async () => {
            await expect(args.onBlur).not.toHaveBeenCalled();

            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledOnce();
        });
    },
};
