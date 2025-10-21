import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Chip } from './';

const meta: Meta<typeof Chip> = {
    component: Chip,
    tags: ['!dev'],
    args: {
        children: 'Chip label',
        onClose: fn(),
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

        await step('Chip close button is clicked', async () => {
            const chip = canvas.getByRole('generic');
            const closeButton = canvas.getByRole('button');

            await expect(chip).not.toHaveClass('ids-chip--disabled');
            await expect(chip).toHaveAttribute('aria-disabled', 'false');

            await userEvent.click(closeButton);

            await expect(args.onClose).toHaveBeenCalledOnce();
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
            const chip = canvas.getByRole('generic');
            const closeButton = canvas.getByRole('button');

            await expect(chip).toHaveClass('ids-chip--disabled');
            await expect(chip).toHaveAttribute('aria-disabled', 'true');
            await expect(closeButton).toBeDisabled();
            await expect(closeButton).toHaveAttribute('tabindex', '-1');
        });
    },
};
