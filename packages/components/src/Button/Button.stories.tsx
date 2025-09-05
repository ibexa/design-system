import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import Button, { ButtonType } from './';

const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation'],
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof Button>;

/***** Primary *****/

export const Primary: Story = {
    name: 'Primary / Default',
    args: {
        type: ButtonType.Primary,
        icon: 'edit',
        children: 'Button label',
    },
};

export const PrimaryTextOnly: Story = {
    name: 'Primary / Text only',
    args: {
        type: ButtonType.Primary,
        children: 'Button label',
    },
};

export const PrimaryDisabled: Story = {
    name: 'Primary / Disabled',
    args: {
        type: ButtonType.Primary,
        icon: 'edit',
        children: 'Button label',
        disabled: true,
    },
};

/***** Secondary *****/

export const Secondary: Story = {
    name: 'Secondary / Default',
    args: {
        type: ButtonType.Secondary,
        icon: 'edit',
        children: 'Button label',
    },
};

export const SecondaryTextOnly: Story = {
    name: 'Secondary / Text only',
    args: {
        type: ButtonType.Secondary,
        children: 'Button label',
    },
};

export const SecondaryDisabled: Story = {
    name: 'Secondary / Disabled',
    args: {
        type: ButtonType.Secondary,
        icon: 'edit',
        children: 'Button label',
        disabled: true,
    },
};

/***** Tertiary *****/

export const Tertiary: Story = {
    name: 'Tertiary / Default',
    args: {
        type: ButtonType.Tertiary,
        icon: 'edit',
        children: 'Button label',
    },
};

export const TertiaryTextOnly: Story = {
    name: 'Tertiary / Text only',
    args: {
        type: ButtonType.Tertiary,
        children: 'Button label',
    },
};

export const TertiaryDisabled: Story = {
    name: 'Tertiary / Disabled',
    args: {
        type: ButtonType.Tertiary,
        icon: 'edit',
        children: 'Button label',
        disabled: true,
    },
};

/***** Secondary Alt *****/

export const SecondaryAlt: Story = {
    name: 'Secondary Alt / Default',
    args: {
        type: ButtonType.SecondaryAlt,
        icon: 'edit',
        children: 'Button label',
    },
};

export const SecondaryAltTextOnly: Story = {
    name: 'Secondary Alt / Text only',
    args: {
        type: ButtonType.SecondaryAlt,
        children: 'Button label',
    },
};

export const SecondaryAltDisabled: Story = {
    name: 'Secondary Alt / Disabled',
    args: {
        type: ButtonType.SecondaryAlt,
        icon: 'edit',
        children: 'Button label',
        disabled: true,
    },
};

/***** Secondary Alt Small *****/

export const SecondaryAltSmall: Story = {
    name: 'Secondary Alt Small / Default',
    args: {
        type: ButtonType.SecondaryAlt,
        size: 'small',
        icon: 'edit',
        children: 'Button label',
    },
};

export const SecondaryAltSmallTextOnly: Story = {
    name: 'Secondary Alt Small / Text only',
    args: {
        type: ButtonType.SecondaryAlt,
        size: 'small',
        children: 'Button label',
    },
};

/***** Tertiary Alt Small *****/

export const TertiaryAltSmall: Story = {
    name: 'Tertiary Alt Small / Default',
    args: {
        type: ButtonType.TertiaryAlt,
        size: 'small',
        children: 'Button label',
    },
};

export const TertiaryAltSmallTextOnly: Story = {
    name: 'Tertiary Alt Small / Text only',
    args: {
        type: ButtonType.TertiaryAlt,
        size: 'small',
        icon: 'edit',
        children: 'Button label',
    },
};

/***** Varia *****/

export const VariaLongChildren: Story = {
    name: 'Varia / Long children',
    args: {
        type: ButtonType.Primary,
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lorem magna',
    },
};

export const VariaHTMLChildren: Story = {
    name: 'Varia / HTML children',
    args: {
        type: ButtonType.Primary,
        children: (
            <>
                <b>Button</b>&nbsp;<i>label</i>
            </>
        ),
    },
};
