import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { BUTTON_SIZE_VALUES, BUTTON_TYPE_VALUES } from './Button.types';
import Button from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(BUTTON_SIZE_VALUES),
        },
        type: {
            control: 'select',
            options: Object.values(BUTTON_TYPE_VALUES),
        },
        extraClasses: {
            control: 'text',
        },
    },
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    name: 'Primary',
    args: {
        type: 'primary',
        children: 'Button label',
        disabled: false,
    },
};

export const PrimaryDisabled: Story = {
    name: 'Primary (Disabled)',
    args: {
        type: 'primary',
        children: 'Button label',
        disabled: true,
    },
};

export const Secondary: Story = {
    name: 'Secondary',
    args: {
        type: 'secondary',
        children: 'Button label',
    },
};

export const SecondaryDisabled: Story = {
    name: 'Secondary (Disabled)',
    args: {
        type: 'secondary',
        children: 'Button label',
        disabled: true,
    },
};

export const SecondaryWithHTML: Story = {
    name: 'Secondary with HTML',
    args: {
        type: 'secondary',
        ariaLabel: 'Button label',
        children: (
            <>
                <b>Button</b>&nbsp;<u>Label</u>
            </>
        ),
    },
};

export const SecondaryWithExtraAria: Story = {
    name: 'Secondary with extra aria attributes',
    args: {
        type: 'secondary',
        children: 'Button label',
        disabled: false,
        extraAria: {
            'aria-expanded': false,
        },
    },
};

export const BlackSecondary: Story = {
    name: 'Black Secondary',
    args: {
        type: 'black-secondary',
        children: 'Button label',
        disabled: false,
    },
};

export const BlackSecondarySmall: Story = {
    name: 'Black Secondary (Small)',
    args: {
        type: 'black-secondary',
        children: 'Button label',
        size: 'small',
    },
};

export const BlackSecondaryExtraSmall: Story = {
    name: 'Black Secondary (Extra Small)',
    args: {
        type: 'black-secondary',
        children: 'Button label',
        size: 'extra-small',
    },
};

export const Longchildren: Story = {
    name: 'Long children',
    args: {
        type: 'primary',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lorem magna',
    },
};
