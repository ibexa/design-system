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

            await expect(btn).not.toHaveClass('disabled');

            await userEvent.click(btn);

            await expect(args.onClick).toHaveBeenCalledOnce();
        });
    },
};
