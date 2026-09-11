import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from 'storybook/actions';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';

import { Alert, AlertType, AlertVariant } from './';

const DESCRIPTION = 'Success message description that might be quite long, at least for 2 lines.';

const meta: Meta<typeof Alert> = {
    component: Alert,
    tags: ['autodocs', 'foundation'],
    args: {
        title: 'Success message',
        children: DESCRIPTION,
        type: AlertType.Success,
        variant: AlertVariant.Floating,
        isDismissible: true,
        onDismiss: action('onDismiss'),
    },
    argTypes: {
        onDismiss: { control: { disable: true } },
        actions: { control: { disable: true } },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const FloatingSuccess: Story = {
    name: 'Floating / Success',
};

export const FloatingWarning: Story = {
    name: 'Floating / Warning',
    args: {
        title: 'Warning message',
        type: AlertType.Warning,
    },
};

export const FloatingError: Story = {
    name: 'Floating / Error',
    args: {
        title: 'Error message',
        type: AlertType.Error,
    },
};

export const FloatingInfo: Story = {
    name: 'Floating / Info',
    args: {
        title: 'Info message',
        type: AlertType.Info,
    },
};

export const LocalSuccess: Story = {
    name: 'Local / Success',
    args: {
        variant: AlertVariant.Local,
    },
};

export const LocalWarning: Story = {
    name: 'Local / Warning',
    args: {
        title: 'Warning message',
        type: AlertType.Warning,
        variant: AlertVariant.Local,
    },
};

export const LocalError: Story = {
    name: 'Local / Error',
    args: {
        title: 'Error message',
        type: AlertType.Error,
        variant: AlertVariant.Local,
    },
};

export const LocalInfo: Story = {
    name: 'Local / Info',
    args: {
        title: 'Info message',
        type: AlertType.Info,
        variant: AlertVariant.Local,
    },
};

export const ToastSuccess: Story = {
    name: 'Toast / Success',
    args: {
        children: null,
        variant: AlertVariant.Toast,
    },
};

export const ToastWarning: Story = {
    name: 'Toast / Warning',
    args: {
        title: 'Warning message',
        children: null,
        type: AlertType.Warning,
        variant: AlertVariant.Toast,
    },
};

export const ToastError: Story = {
    name: 'Toast / Error',
    args: {
        title: 'Error message',
        children: null,
        type: AlertType.Error,
        variant: AlertVariant.Toast,
    },
};

export const ToastInfo: Story = {
    name: 'Toast / Info',
    args: {
        title: 'Info message',
        children: null,
        type: AlertType.Info,
        variant: AlertVariant.Toast,
    },
};

export const TitleOnly: Story = {
    name: 'Title only',
    args: {
        children: null,
    },
};

export const DescriptionOnly: Story = {
    name: 'Description only',
    args: {
        title: '',
        children: (
            <>
                Your password has been changed. You can <a href="#">log in</a> now.
            </>
        ),
    },
};

export const WithActions: Story = {
    name: 'With actions',
    args: {
        actions: (
            <>
                <Button onClick={action('onConfirm')} size={ButtonSize.Small} type={ButtonType.Secondary}>
                    Confirm
                </Button>
                <Button onClick={action('onCancel')} size={ButtonSize.Small} type={ButtonType.TertiaryAlt}>
                    Cancel
                </Button>
            </>
        ),
    },
};

export const NonDismissible: Story = {
    name: 'Non-dismissible',
    args: {
        isDismissible: false,
    },
};

export const LongContent: Story = {
    name: 'Long content',
    args: {
        title: 'A rather long info message title that wraps onto a second line inside the alert box',
        children: `${DESCRIPTION} ${DESCRIPTION} ${DESCRIPTION}`,
        type: AlertType.Info,
    },
};

export const CustomIcon: Story = {
    name: 'Custom icon',
    args: {
        title: 'You do not have permission to view this item',
        icon: 'lock',
        type: AlertType.Info,
    },
};
