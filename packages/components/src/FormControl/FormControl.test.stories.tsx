import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { FormControlStateful } from './FormControl';

const meta: Meta<typeof FormControlStateful> = {
    component: FormControlStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['!dev'],
    argTypes: {
        extraClasses: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
    },
    args: {
        input: {
            name: 'default-input',
        },
        onValidate: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof FormControlStateful>;

export const TestNotRequired: Story = {
    name: 'Events',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        await step('FormControl handles input', async () => {
            await expect(args.onValidate).toHaveBeenLastCalledWith(true, []);
            await userEvent.type(input, 'Lorem Ipsum');
            await expect(args.onValidate).toHaveBeenLastCalledWith(true, []);
            await expect(input).toHaveValue('Lorem Ipsum');
        });

        await step('InputText handles clear button', async () => {
            const clearBtn = canvas.getByRole('button');

            await userEvent.click(clearBtn);
            await expect(args.onValidate).toHaveBeenLastCalledWith(true, []);
            await expect(input).toHaveValue('');
        });
    },
};

export const TestRequired: Story = {
    name: 'Events',
    args: {
        input: {
            name: 'default-input',
            required: true,
        },
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const input = canvas.getByRole('textbox');

        await step('FormControl handles input', async () => {
            await expect(args.onValidate).toHaveBeenLastCalledWith(true, []);
            await userEvent.type(input, 'Lorem Ipsum');
            await expect(args.onValidate).toHaveBeenLastCalledWith(true, []);
            await expect(input).toHaveValue('Lorem Ipsum');
        });

        await step('InputText handles clear button', async () => {
            const clearBtn = canvas.getByRole('button');

            await userEvent.click(clearBtn);
            await expect(args.onValidate).toHaveBeenLastCalledWith(false, expect.any(Array));
            await expect(input).toHaveValue('');
        });
    },
};
