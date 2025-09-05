import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import IconButton, { IconButtonSize, IconButtonType } from './';

const meta: Meta<typeof IconButton> = {
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation'],
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

/***** Primary *****/

export const Primary: Story = {
    name: 'Primary / Default',
    args: {
        type: IconButtonType.Primary,
        icon: 'edit',
    },
};

export const PrimaryDisabled: Story = {
    name: 'Primary / Disabled',
    args: {
        type: IconButtonType.Primary,
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary *****/

export const Secondary: Story = {
    name: 'Secondary / Default',
    args: {
        type: IconButtonType.Secondary,
        icon: 'edit',
    },
};

export const SecondaryDisabled: Story = {
    name: 'Secondary / Disabled',
    args: {
        type: IconButtonType.Secondary,
        icon: 'edit',
        disabled: true,
    },
};

/***** Tertiary *****/

export const Tertiary: Story = {
    name: 'Tertiary / Default',
    args: {
        type: IconButtonType.Tertiary,
        icon: 'edit',
    },
};

export const TertiaryDisabled: Story = {
    name: 'Tertiary / Disabled',
    args: {
        type: IconButtonType.Tertiary,
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary Alt *****/

export const SecondaryAlt: Story = {
    name: 'Secondary Alt / Default',
    args: {
        type: IconButtonType.SecondaryAlt,
        icon: 'edit',
    },
};

export const SecondaryAltDisabled: Story = {
    name: 'Secondary Alt / Disabled',
    args: {
        type: IconButtonType.SecondaryAlt,
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary Alt Small *****/

export const SecondaryAltSmall: Story = {
    name: 'Secondary Alt Small / Default',
    args: {
        type: IconButtonType.SecondaryAlt,
        size: IconButtonSize.Small,
        icon: 'edit',
    },
};

/***** Tertiary Alt Small *****/

export const TertiaryAltSmall: Story = {
    name: 'Tertiary Alt Small / Default',
    args: {
        type: IconButtonType.TertiaryAlt,
        size: IconButtonSize.Small,
        icon: 'edit',
    },
};

/***** Varia *****/

export const VariaWithAriaLabel: Story = {
    name: 'Varia / With aria-label',
    args: {
        type: IconButtonType.Primary,
        icon: 'edit',
        ariaLabel: 'Edit Button',
    },
};
