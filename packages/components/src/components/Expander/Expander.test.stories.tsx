import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Expander } from './';

const meta: Meta<typeof Expander> = {
    component: Expander,
    tags: ['!dev'],
    args: {
        collapseLabel: 'Show more',
        expandLabel: 'Show less',
        onClick: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof Expander>;

export const ExpanderIsNotExpanded: Story = {
    args: {
        isExpanded: false,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Initial state - not expanded', async () => {
            const expander = canvas.getByRole('button');

            await expect(expander).not.toHaveClass('ids-expander--is-expanded');
            await expect(expander).toHaveAttribute('aria-expanded', 'false');
        });

        await step('Click expander', async () => {
            const expander = canvas.getByRole('button');

            await userEvent.click(expander);

            await expect(args.onClick).toHaveBeenCalledOnce();
        });
    },
};

export const ExpanderIsExpanded: Story = {
    args: {
        isExpanded: true,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Initial state - expanded', async () => {
            const expander = canvas.getByRole('button');

            await expect(expander).toHaveClass('ids-expander--is-expanded');
            await expect(expander).toHaveAttribute('aria-expanded', 'true');
        });

        await step('Click expander', async () => {
            const expander = canvas.getByRole('button');

            await userEvent.click(expander);

            await expect(args.onClick).toHaveBeenCalledOnce();
        });
    },
};
