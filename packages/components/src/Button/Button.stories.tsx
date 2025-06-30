/* eslint-disable max-lines */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import Icon, { IconSizeType } from '../Icon';

import { BUTTON_SIZE_VALUES, BUTTON_TYPE_VALUES } from './Button.types';
import Button from './Button';

const meta: Meta<typeof Button> = {
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'buttons'],
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

const getChildrenWithHTML = (size: IconSizeType = 'small') => (
    <>
        <Icon name="edit" size={size} /> Button label
    </>
);

/***** Primary *****/

export const Primary: Story = {
    name: 'Primary / Default',
    args: {
        type: 'primary',
        children: getChildrenWithHTML(),
    },
};

export const PrimaryTextOnly: Story = {
    name: 'Primary / Text only',
    args: {
        type: 'primary',
        children: 'Button label',
    },
};

export const PrimaryIconOnly: Story = {
    name: 'Primary / Icon only',
    args: {
        type: 'primary',
        children: <Icon name="edit" />,
        iconOnly: true,
    },
};

export const PrimaryDisabled: Story = {
    name: 'Primary / Disabled',
    args: {
        type: 'primary',
        children: getChildrenWithHTML(),
        disabled: true,
    },
};

/***** Secondary *****/

export const Secondary: Story = {
    name: 'Secondary / Default',
    args: {
        type: 'secondary',
        children: getChildrenWithHTML(),
    },
};

export const SecondaryTextOnly: Story = {
    name: 'Secondary / Text only',
    args: {
        type: 'secondary',
        children: 'Button label',
    },
};

export const SecondaryIconOnly: Story = {
    name: 'Secondary / Icon only',
    args: {
        type: 'secondary',
        children: <Icon name="edit" />,
        iconOnly: true,
    },
};

export const SecondaryDisabled: Story = {
    name: 'Secondary / Disabled',
    args: {
        type: 'secondary',
        children: getChildrenWithHTML(),
        disabled: true,
    },
};

/***** Tertiary *****/

export const Tertiary: Story = {
    name: 'Tertiary / Default',
    args: {
        type: 'tertiary',
        children: getChildrenWithHTML(),
    },
};

export const TertiaryTextOnly: Story = {
    name: 'Tertiary / Text only',
    args: {
        type: 'tertiary',
        children: 'Button label',
    },
};

export const TertiaryIconOnly: Story = {
    name: 'Tertiary / Icon only',
    args: {
        type: 'tertiary',
        children: <Icon name="edit" />,
        iconOnly: true,
    },
};

export const TertiaryDisabled: Story = {
    name: 'Tertiary / Disabled',
    args: {
        type: 'tertiary',
        children: getChildrenWithHTML(),
        disabled: true,
    },
};

/***** Secondary Alt *****/

export const SecondaryAlt: Story = {
    name: 'Secondary Alt / Default',
    args: {
        type: 'secondary-alt',
        children: getChildrenWithHTML(),
    },
};

export const SecondaryAltTextOnly: Story = {
    name: 'Secondary Alt / Text only',
    args: {
        type: 'secondary-alt',
        children: 'Button label',
    },
};

export const SecondaryAltIconOnly: Story = {
    name: 'Secondary Alt / Icon only',
    args: {
        type: 'secondary-alt',
        children: <Icon name="edit" />,
        iconOnly: true,
    },
};

export const SecondaryAltDisabled: Story = {
    name: 'Secondary Alt / Disabled',
    args: {
        type: 'secondary-alt',
        children: getChildrenWithHTML(),
        disabled: true,
    },
};

/***** Secondary Alt Small *****/

export const SecondaryAltSmall: Story = {
    name: 'Secondary Alt Small / Default',
    args: {
        type: 'secondary-alt',
        size: 'small',
        children: getChildrenWithHTML('tiny-small'),
    },
};

export const SecondaryAltSmallTextOnly: Story = {
    name: 'Secondary Alt Small / Text only',
    args: {
        type: 'secondary-alt',
        size: 'small',
        children: 'Button label',
    },
};

export const SecondaryAltSmallIconOnly: Story = {
    name: 'Secondary Alt Small / Icon only',
    args: {
        type: 'secondary-alt',
        size: 'small',
        children: <Icon name="edit" size="tiny-small" />,
        iconOnly: true,
    },
};

/***** Tertiary Alt Small *****/

export const TertiaryAltSmall: Story = {
    name: 'Tertiary Alt Small / Default',
    args: {
        type: 'tertiary-alt',
        size: 'small',
        children: getChildrenWithHTML('tiny-small'),
    },
};

export const TertiaryAltSmallTextOnly: Story = {
    name: 'Tertiary Alt Small / Text only',
    args: {
        type: 'tertiary-alt',
        size: 'small',
        children: 'Button label',
    },
};

export const TertiaryAltSmallIconOnly: Story = {
    name: 'Tertiary Alt Small / Icon only',
    args: {
        type: 'tertiary-alt',
        size: 'small',
        children: <Icon name="edit" size="tiny-small" />,
        iconOnly: true,
    },
};

/***** Secondary Alt X-Small *****/

export const SecondaryAltXSmall: Story = {
    name: 'Secondary Alt X-Small / Default',
    args: {
        type: 'secondary-alt',
        size: 'extra-small',
        children: getChildrenWithHTML('tiny'),
    },
};

export const SecondaryAltXSmallTextOnly: Story = {
    name: 'Secondary Alt X-Small / Text only',
    args: {
        type: 'secondary-alt',
        size: 'extra-small',
        children: 'Button label',
    },
};

export const SecondaryAltXSmallIconOnly: Story = {
    name: 'Secondary Alt X-Small / Icon only',
    args: {
        type: 'secondary-alt',
        size: 'extra-small',
        children: <Icon name="edit" size="tiny" />,
        iconOnly: true,
    },
};

/***** Tertiary Alt X-Small *****/

export const TertiaryAltXSmall: Story = {
    name: 'Tertiary Alt X-Small / Default',
    args: {
        type: 'tertiary-alt',
        size: 'extra-small',
        children: getChildrenWithHTML('tiny'),
    },
};

export const TertiaryAltXSmallTextOnly: Story = {
    name: 'Tertiary Alt X-Small / Text only',
    args: {
        type: 'tertiary-alt',
        size: 'extra-small',
        children: 'Button label',
    },
};

export const TertiaryAltXSmallIconOnly: Story = {
    name: 'Tertiary Alt X-Small / Icon only',
    args: {
        type: 'tertiary-alt',
        size: 'extra-small',
        children: <Icon name="edit" size="tiny" />,
        iconOnly: true,
    },
};

/***** Varia *****/

export const VariaLongchildren: Story = {
    name: 'Varia / Long children',
    args: {
        type: 'primary',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lorem magna',
    },
};
