import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { Button, ButtonSize, ButtonType } from './';

const meta: Meta<typeof Button> = {
    component: Button,
    tags: ['autodocs', 'foundation'],
    args: {
        children: 'Button label',
        onClick: action('on-click'),
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

/***** Primary *****/

export const Primary: Story = {
    name: 'Primary / Default',
    args: {
        type: ButtonType.Primary,
        icon: 'edit',
    },
};

export const PrimaryTextOnly: Story = {
    name: 'Primary / Text only',
    args: {
        type: ButtonType.Primary,
    },
};

export const PrimaryIconOnly: Story = {
    name: 'Primary / Icon only',
    args: {
        type: ButtonType.Primary,
        icon: 'edit',
        children: undefined,
    },
};

export const PrimaryDisabled: Story = {
    name: 'Primary / Disabled',
    args: {
        type: ButtonType.Primary,
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary *****/

export const Secondary: Story = {
    name: 'Secondary / Default',
    args: {
        type: ButtonType.Secondary,
        icon: 'edit',
    },
};

export const SecondaryTextOnly: Story = {
    name: 'Secondary / Text only',
    args: {
        type: ButtonType.Secondary,
    },
};

export const SecondaryIconOnly: Story = {
    name: 'Secondary / Icon only',
    args: {
        type: ButtonType.Secondary,
        icon: 'edit',
        children: undefined,
    },
};

export const SecondaryDisabled: Story = {
    name: 'Secondary / Disabled',
    args: {
        type: ButtonType.Secondary,
        icon: 'edit',
        disabled: true,
    },
};

/***** Tertiary *****/

export const Tertiary: Story = {
    name: 'Tertiary / Default',
    args: {
        type: ButtonType.Tertiary,
        icon: 'edit',
    },
};

export const TertiaryTextOnly: Story = {
    name: 'Tertiary / Text only',
    args: {
        type: ButtonType.Tertiary,
    },
};

export const TertiaryIconOnly: Story = {
    name: 'Tertiary / Icon only',
    args: {
        type: ButtonType.Tertiary,
        icon: 'edit',
        children: undefined,
    },
};

export const TertiaryDisabled: Story = {
    name: 'Tertiary / Disabled',
    args: {
        type: ButtonType.Tertiary,
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary Alt *****/

export const SecondaryAlt: Story = {
    name: 'Secondary Alt / Default',
    args: {
        type: ButtonType.SecondaryAlt,
        icon: 'edit',
    },
};

export const SecondaryAltTextOnly: Story = {
    name: 'Secondary Alt / Text only',
    args: {
        type: ButtonType.SecondaryAlt,
    },
};

export const SecondaryAltIconOnly: Story = {
    name: 'Secondary Alt / Icon only',
    args: {
        type: ButtonType.SecondaryAlt,
        icon: 'edit',
        children: undefined,
    },
};

export const SecondaryAltDisabled: Story = {
    name: 'Secondary Alt / Disabled',
    args: {
        type: ButtonType.SecondaryAlt,
        icon: 'edit',
        disabled: true,
    },
};

/***** Secondary Alt Small *****/

export const SecondaryAltSmall: Story = {
    name: 'Secondary Alt Small / Default',
    args: {
        type: ButtonType.SecondaryAlt,
        size: ButtonSize.Small,
        icon: 'edit',
    },
};

export const SecondaryAltSmallTextOnly: Story = {
    name: 'Secondary Alt Small / Text only',
    args: {
        type: ButtonType.SecondaryAlt,
        size: ButtonSize.Small,
    },
};

export const SecondaryAltSmallIconOnly: Story = {
    name: 'Secondary Alt Small / Icon only',
    args: {
        type: ButtonType.SecondaryAlt,
        size: ButtonSize.Small,
        icon: 'edit',
        children: undefined,
    },
};

/***** Tertiary Alt Small *****/

export const TertiaryAltSmall: Story = {
    name: 'Tertiary Alt Small / Default',
    args: {
        type: ButtonType.TertiaryAlt,
        size: ButtonSize.Small,
        icon: 'edit',
    },
};

export const TertiaryAltSmallTextOnly: Story = {
    name: 'Tertiary Alt Small / Text only',
    args: {
        type: ButtonType.TertiaryAlt,
        size: ButtonSize.Small,
    },
};

export const TertiaryAltSmallIconOnly: Story = {
    name: 'Tertiary Alt Small / Icon only',
    args: {
        type: ButtonType.TertiaryAlt,
        size: ButtonSize.Small,
        icon: 'edit',
        children: undefined,
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
