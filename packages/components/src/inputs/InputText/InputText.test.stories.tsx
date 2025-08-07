import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import InputText from './InputText';

const meta: Meta<typeof InputText> = {
    component: InputText,
    parameters: {
        layout: 'centered',
    },
    tags: ['!dev'],
    argTypes: {
        size: {
            control: 'select',
        },
        type: {
            control: 'select',
        },
        className: {
            control: 'text',
        },
    },
    args: {
        onBlur: fn(),
        onChange: fn(),
        onFocus: fn(),
        onInput: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const TestActive: Story = {
    name: 'Events',
    args: {
        name: 'default-input',
    },
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
        });
    },
};
