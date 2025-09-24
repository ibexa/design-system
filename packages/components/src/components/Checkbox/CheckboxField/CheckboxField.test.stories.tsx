import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { CheckboxFieldStateful } from './';

const meta: Meta<typeof CheckboxFieldStateful> = {
    component: CheckboxFieldStateful,
    tags: ['!dev'],
    args: {
        id: 'default-input',
        label: 'Checkbox Label',
        name: 'default-input',
        value: 'checkbox-value',
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
        const input = canvas.getByRole<HTMLInputElement>('checkbox');
        const label = canvas.getByText('Checkbox Label');
        const checkInputHandlers = async (nthCalled: number, currentValue: boolean) => {
            await expect(args.onChange).toHaveBeenCalledTimes(nthCalled);
            await expect(args.onChange).toHaveBeenLastCalledWith(currentValue, expect.anything());
            await expect(args.onInput).toHaveBeenCalledTimes(nthCalled);
            await expect(args.onInput).toHaveBeenLastCalledWith(currentValue, expect.anything());
            await expect(input.checked).toBe(currentValue);
        };

        await step('Click checkbox', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await checkInputHandlers(1, true); // eslint-disable-line no-magic-numbers
        });

        await step('Click checkbox again', async () => {
            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
            await checkInputHandlers(2, false); // eslint-disable-line no-magic-numbers
        });

        await step('Click outside checkbox', async () => {
            await expect(args.onBlur).not.toHaveBeenCalled();

            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledOnce();
        });

        await step('Click checkbox label', async () => {
            await userEvent.click(label);

            await checkInputHandlers(3, true); // eslint-disable-line no-magic-numbers
        });

        await step('Click checkbox label again', async () => {
            await userEvent.click(label);

            await checkInputHandlers(4, false); // eslint-disable-line no-magic-numbers
        });
    },
};
