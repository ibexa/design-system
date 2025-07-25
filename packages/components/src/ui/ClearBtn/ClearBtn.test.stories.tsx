import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import Expander from './ClearBtn';

const meta: Meta<typeof Expander> = {
    component: Expander,
    parameters: {
        layout: 'centered',
    },
    tags: ['!dev'],
    argTypes: {},
    args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof Expander>;

export const TestActive: Story = {
    name: 'Primary',
    args: {
        disabled: false,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Button is clickable', async () => {
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

        await step('Button is not clickable', async () => {
            const btn = canvas.getByRole('button');

            await expect(btn).toHaveClass('ids-btn--disabled');
            await expect(btn).toHaveAttribute('aria-disabled', 'true');
            await expect(btn).toHaveStyle({ pointerEvents: 'none' });
        });
    },
};
