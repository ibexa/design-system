import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button, ButtonType } from './';

const meta: Meta<typeof Button> = {
    component: Button,
    tags: ['!dev'],
    args: {
        type: ButtonType.Primary,
        children: 'Button label',
        onClick: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const TestEnabled: Story = {
    name: 'Enabled',
    args: {
        disabled: false,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Button is clicked', async () => {
            const btn = canvas.getByRole('button');

            await expect(btn).not.toHaveClass('ids-btn--disabled');
            await expect(btn).toHaveAttribute('aria-disabled', 'false');

            await userEvent.click(btn);

            await expect(args.onClick).toHaveBeenCalledOnce();
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

        await step(`Button can't be clicked`, async () => {
            const btn = canvas.getByRole('button');

            await expect(btn).toHaveClass('ids-btn--disabled');
            await expect(btn).toHaveAttribute('aria-disabled', 'true');
            await expect(btn).toHaveStyle({ pointerEvents: 'none' });
        });
    },
};
