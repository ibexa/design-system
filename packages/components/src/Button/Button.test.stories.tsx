import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import Button from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
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
        extraClasses: {
            control: 'text',
        },
    },
    args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const TestActive: Story = {
    name: 'Primary',
    args: {
        type: 'primary',
        children: 'Button label',
        disabled: false,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Button is clickable', async () => {
            const btn = canvas.getByText('Button label');

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
        type: 'primary',
        children: 'Button label',
        disabled: true,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Button is not clickable', async () => {
            const btn = canvas.getByText('Button label');

            await expect(btn).toHaveClass('ids-btn--disabled');
            await expect(btn).toHaveAttribute('aria-disabled', 'true');
            await expect(btn).toHaveStyle({ pointerEvents: 'none' });
        });
    },
};
