import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { InputTextStateful } from './InputText';

const meta: Meta<typeof InputTextStateful> = {
    component: InputTextStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['dev', 'test'],
    args: {
        name: 'default-input',
        onChange: fn(),
        onValidate: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof InputTextStateful>;

export const NotRequired: Story = {
    name: 'Not required',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        await step('InputText handles change event', async () => {
            const insertText = 'Lorem Ipsum';
            const insertTextLength = insertText.length;

            await userEvent.type(input, insertText);

            await expect(args.onChange).toHaveBeenCalledTimes(insertTextLength);
            await expect(input).toHaveValue(insertText);
            await expect(args.onValidate).toHaveBeenCalledWith(true, []);
        });

        const clearBtn = canvas.getByRole('button');

        await step('InputText handles clear event', async () => {
            await userEvent.click(clearBtn);
            
            await expect(args.onChange).toHaveBeenLastCalledWith('');
            await expect(input).toHaveValue('');
            await expect(args.onValidate).toHaveBeenCalledWith(true, []);
        });
    },
};

export const Required: Story = {
    name: 'Required',
    args: {
        input: {
            required: true,
        },
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        await step('InputText handles change event', async () => {
            const insertText = 'Lorem Ipsum';
            const insertTextLength = insertText.length;

            await userEvent.type(input, insertText);

            await expect(args.onChange).toHaveBeenCalledTimes(insertTextLength);
            await expect(input).toHaveValue(insertText);
            await expect(args.onValidate).toHaveBeenCalledWith(true, []);
            await expect(input).toHaveAttribute('aria-invalid', 'false');
        });

        const clearBtn = canvas.getByRole('button');

        await step('InputText handles clear event', async () => {
            await userEvent.click(clearBtn);
            
            await expect(args.onChange).toHaveBeenLastCalledWith('');
            await expect(input).toHaveValue('');
            await expect(args.onValidate).toHaveBeenLastCalledWith(false, expect.anything());
            await expect(input).toHaveAttribute('aria-invalid', 'true');
        });
    },
};
