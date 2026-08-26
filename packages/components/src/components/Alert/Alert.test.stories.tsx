import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Alert, AlertRole, AlertType, AlertVariant } from './';

const meta: Meta<typeof Alert> = {
    component: Alert,
    tags: ['!dev'],
    args: {
        title: 'Alert title',
        children: 'Alert description',
        type: AlertType.Success,
        isDismissible: true,
        onDismiss: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const TestDismiss: Story = {
    name: 'Dismiss',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Close button click calls onDismiss', async () => {
            const alert = canvas.getByRole('status');
            const closeButton = canvas.getByRole('button');

            await expect(alert).toHaveClass('ids-alert', 'ids-alert--success', 'ids-alert--floating');
            await expect(closeButton).toHaveClass('ids-alert__close-btn');

            await userEvent.click(closeButton);

            await expect(args.onDismiss).toHaveBeenCalledOnce();
        });
    },
};

export const TestNonDismissible: Story = {
    name: 'Non-dismissible',
    args: {
        isDismissible: false,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('No close button is rendered', async () => {
            await expect(canvas.queryByRole('button')).not.toBeInTheDocument();
        });
    },
};

export const TestTitleOnly: Story = {
    name: 'Title only',
    args: {
        children: null,
        variant: AlertVariant.Toast,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Description container is not rendered', async () => {
            const alert = canvas.getByRole('status');

            await expect(alert).toHaveClass('ids-alert--toast');
            await expect(alert.querySelector('.ids-alert__description')).toBeNull();
            await expect(alert.querySelector('.ids-alert__actions')).toBeNull();
        });
    },
};

export const TestDescriptionOnly: Story = {
    name: 'Description only',
    args: {
        title: '',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Title container is not rendered without a title', async () => {
            const alert = canvas.getByRole('status');

            await expect(alert.querySelector('.ids-alert__title')).toBeNull();
            await expect(alert.querySelector('.ids-alert__description')).toHaveTextContent('Alert description');
        });
    },
};

export const TestErrorRole: Story = {
    name: 'Error role',
    args: {
        type: AlertType.Error,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Error alerts default to role="alert" with the error icon', async () => {
            const alert = canvas.getByRole('alert');
            const icon = alert.querySelector('.ids-alert__icon use');

            await expect(alert).toHaveClass('ids-alert--error');
            await expect(icon?.getAttribute('xlink:href')).toContain('#alert-error');
        });
    },
};

export const TestRoleOverride: Story = {
    name: 'Role override',
    args: {
        type: AlertType.Error,
        role: AlertRole.Status,
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('The role prop wins over the type default', async () => {
            await expect(canvas.getByRole('status')).toHaveClass('ids-alert--error');
        });
    },
};

export const TestIconPath: Story = {
    name: 'Icon path',
    args: {
        iconPath: '/custom/sprite.svg#hide',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('iconPath overrides the default icon', async () => {
            const icon = canvas.getByRole('status').querySelector('.ids-alert__icon use');

            await expect(icon?.getAttribute('xlink:href')).toBe('/custom/sprite.svg#hide');
        });
    },
};
