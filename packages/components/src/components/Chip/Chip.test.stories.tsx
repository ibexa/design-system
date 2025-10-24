import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Chip } from './';

const meta: Meta<typeof Chip> = {
    component: Chip,
    tags: ['!dev'],
    args: {
        children: 'Chips',
        isDeletable: true,
        onDelete: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const TestEnabled: Story = {
    name: 'Enabled',
    args: {
        disabled: false,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Chip delete button is clicked', async () => {
            const chip = canvas.getByText('Chips').closest('.ids-chip');
            const deleteButton = canvas.getByRole('button');

            await expect(chip).not.toHaveClass('ids-chip--disabled');
            await expect(chip).toHaveAttribute('aria-disabled', 'false');

            await userEvent.click(deleteButton);

            await expect(args.onDelete).toHaveBeenCalledOnce();
        });
    },
};

export const TestDisabled: Story = {
    name: 'Disabled',
    args: {
        disabled: true,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step(`Chip can't be clicked`, async () => {
            const chip = canvas.getByText('Chips').closest('.ids-chip');
            const deleteButton = canvas.getByRole('button');

            await expect(chip).toHaveClass('ids-chip--disabled');
            await expect(chip).toHaveAttribute('aria-disabled', 'true');
            await expect(deleteButton).toBeDisabled();
            await expect(deleteButton).toHaveAttribute('tabindex', '-1');
        });
    },
};
