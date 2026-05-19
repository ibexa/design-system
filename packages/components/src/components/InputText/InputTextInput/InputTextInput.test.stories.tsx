import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { InputTextInputStateful } from '.';

const meta: Meta<typeof InputTextInputStateful> = {
    component: InputTextInputStateful,
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

type Story = StoryObj<typeof InputTextInputStateful>;

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
        });

        const clearBtn = canvas.getByRole('button');

        await step('InputText handles clear event', async () => {
            await userEvent.click(clearBtn);

            await expect(args.onChange).toHaveBeenLastCalledWith('');
            await expect(input).toHaveValue('');
        });
    },
};

export const PasswordToggle: Story = {
    name: 'Password toggle',
    args: {
        type: 'password',
        value: 'qwerty123',
    },
    play: async ({ canvasElement, step }) => {
        const input = canvasElement.querySelector('input');
        const toggleBtn = canvasElement.querySelector('.ids-input-text__password-toggler');

        await step('Password input renders toggle action', async () => {
            await expect(input).not.toBeNull();
            await expect(toggleBtn).not.toBeNull();
            await expect(input).toHaveAttribute('type', 'password');
        });

        await step('Password toggle changes input type', async () => {
            if (!toggleBtn) {
                throw new Error('Password toggle button should be rendered.');
            }

            await userEvent.click(toggleBtn);
            await expect(input).toHaveAttribute('type', 'text');

            await userEvent.click(toggleBtn);
            await expect(input).toHaveAttribute('type', 'password');
        });
    },
};

export const SearchAction: Story = {
    name: 'Search action',
    args: {
        hasSearchAction: true,
        searchButtonType: 'button',
        type: 'search',
        value: 'Lorem Ipsum',
    },
    play: async ({ canvasElement, step }) => {
        const searchBtn = canvasElement.querySelector('.ids-input-text__search-btn');

        await step('Search action renders with configured type', async () => {
            await expect(searchBtn).not.toBeNull();
            await expect(searchBtn).toHaveAttribute('type', 'button');
        });
    },
};

export const PasswordWithSearchFlag: Story = {
    name: 'Password with search flag',
    args: {
        hasSearchAction: true,
        type: 'password',
        value: 'qwerty123',
    },
    play: async ({ canvasElement, step }) => {
        const toggleBtn = canvasElement.querySelector('.ids-input-text__password-toggler');
        const searchBtn = canvasElement.querySelector('.ids-input-text__search-btn');

        await step('Password input omits extra built-in actions when search flag is enabled', async () => {
            await expect(toggleBtn).toBeNull();
            await expect(searchBtn).toBeNull();
        });
    },
};
