import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { ICON_BUTTON_SIZE_VALUES, ICON_BUTTON_TYPE_VALUES } from './IconButton.types';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'buttons'],
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(ICON_BUTTON_SIZE_VALUES),
        },
        type: {
            control: 'select',
            options: Object.values(ICON_BUTTON_TYPE_VALUES),
        },
        className: {
            control: 'text',
        },
    },
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

/***** Primary *****/

export const Primary: Story = {
    name: 'Primary / Default',
    args: {
        type: 'primary',
        icon: 'edit',
    },
};

export const PrimaryDisabled: Story = {
    name: 'Primary / Disabled',
    args: {
        type: 'primary',
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary *****/

export const Secondary: Story = {
    name: 'Secondary / Default',
    args: {
        type: 'secondary',
        icon: 'edit',
    },
};

export const SecondaryDisabled: Story = {
    name: 'Secondary / Disabled',
    args: {
        type: 'secondary',
        icon: 'edit',
        disabled: true,
    },
};

/***** Tertiary *****/

export const Tertiary: Story = {
    name: 'Tertiary / Default',
    args: {
        type: 'tertiary',
        icon: 'edit',
    },
};

export const TertiaryDisabled: Story = {
    name: 'Tertiary / Disabled',
    args: {
        type: 'tertiary',
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary Alt *****/

export const SecondaryAlt: Story = {
    name: 'Secondary Alt / Default',
    args: {
        type: 'secondary-alt',
        icon: 'edit',
    },
};

export const SecondaryAltDisabled: Story = {
    name: 'Secondary Alt / Disabled',
    args: {
        type: 'secondary-alt',
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary Alt Small *****/

export const SecondaryAltSmall: Story = {
    name: 'Secondary Alt Small / Default',
    args: {
        type: 'secondary-alt',
        size: 'small',
        icon: 'edit',
    },
};

/***** Tertiary Alt Small *****/

export const TertiaryAltSmall: Story = {
    name: 'Tertiary Alt Small / Default',
    args: {
        type: 'tertiary-alt',
        icon: 'edit',
        size: 'small',
    },
};

/***** Varia *****/

export const VariaWithAriaLabel: Story = {
    name: 'Varia / With aria-label',
    args: {
        type: 'primary',
        icon: 'edit',
        ariaLabel: 'Edit Button',
    },
};
