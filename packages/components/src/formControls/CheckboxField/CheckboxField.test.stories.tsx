import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { CheckboxFieldStateful } from './CheckboxField';

const meta: Meta<typeof CheckboxFieldStateful> = {
    component: CheckboxFieldStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['!dev'],
    args: {
        id: 'default-input',
        label: 'Checkbox Label',
        name: 'default-input',
        onBlur: fn(),
        onChange: fn(),
        onFocus: fn(),
        onInput: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof CheckboxFieldStateful>;

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
