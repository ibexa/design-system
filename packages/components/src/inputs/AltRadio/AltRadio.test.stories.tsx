import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { AltRadioStateful } from './AltRadio';

const meta: Meta<typeof AltRadioStateful> = {
    component: AltRadioStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['!dev'],
    args: {
        name: 'default-input',
        label: '1:1',
        onBlur: fn(),
        onChange: fn(),
        onFocus: fn(),
        onInput: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof AltRadioStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('button');

        await step('Radio Button handles focus event', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onInput).toHaveBeenCalledOnce();
        });

        await step('Radio Button handles blur event', async () => {
            await expect(args.onBlur).not.toHaveBeenCalled();

            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledOnce();
        });
    },
};
