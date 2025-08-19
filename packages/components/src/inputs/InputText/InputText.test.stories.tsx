import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { InputTextStateful } from './InputText';

const meta: Meta<typeof InputTextStateful> = {
    component: InputTextStateful,
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

type Story = StoryObj<typeof InputTextStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        await step('InputText handles focus event', async () => {
            await expect(args.onFocus).not.toHaveBeenCalled();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();

            await userEvent.click(input);

            await expect(args.onFocus).toHaveBeenCalledOnce();
        });

        await step('InputText handles blur event', async () => {
            await expect(args.onBlur).not.toHaveBeenCalled();

            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledOnce();
        });

        await step('InputText handles change event', async () => {
            const insertText = 'Lorem Ipsum';
            const insertTextLength = insertText.length;
            const numberOfExpectedFocusCalls = 2;

            await userEvent.type(input, insertText);

            await expect(args.onFocus).toHaveBeenCalledTimes(numberOfExpectedFocusCalls);
            await expect(args.onChange).toHaveBeenCalledTimes(insertTextLength);
            await expect(args.onInput).toHaveBeenCalledTimes(insertTextLength);
            await expect(input).toHaveValue(insertText);
        });

        const clearBtn = canvas.getByRole('button');

        await step('InputText handles clear event', async () => {
            await userEvent.click(clearBtn);

            await expect(args.onChange).toHaveBeenLastCalledWith('');
            await expect(input).toHaveValue('');
        });
    },
};
