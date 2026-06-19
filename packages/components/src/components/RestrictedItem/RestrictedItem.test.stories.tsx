import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, within } from 'storybook/test';

import { RestrictedItem } from './';

const meta: Meta<typeof RestrictedItem> = {
    component: RestrictedItem,
    tags: ['!dev'],
};

export default meta;

type Story = StoryObj<typeof RestrictedItem>;

export const RendersBlurredName: Story = {
    args: {
        name: 'Secret document',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Name text is present in the DOM', async () => {
            await expect(canvas.getByText('Secret document')).toBeInTheDocument();
        });

        await step('Restricted badge is visible', async () => {
            await expect(canvas.getByText('Restricted')).toBeInTheDocument();
        });

        await step('Footer message is visible', async () => {
            await expect(
                canvas.getByText("Output hidden — you don't have permission to view this content item"),
            ).toBeInTheDocument();
        });
    },
};

export const CustomMessageIsRendered: Story = {
    args: {
        name: 'Secret document',
        message: 'Contact your administrator to request access.',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Custom footer message is visible', async () => {
            await expect(
                canvas.getByText('Contact your administrator to request access.'),
            ).toBeInTheDocument();
        });
    },
};