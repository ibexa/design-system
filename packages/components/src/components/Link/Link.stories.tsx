import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { Link, LinkSize, LinkType, LinkVariant } from './';

const meta: Meta<typeof Link> = {
    component: Link,
    tags: ['autodocs', 'foundation'],
    args: {
        children: 'Link label',
        href: '#',
        onClick: action('on-click'),
    },
    argTypes: {
        onClick: { control: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Link>;

/***** Button Variant - Primary *****/

export const ButtonPrimary: Story = {
    name: 'Button / Primary / Default',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Primary,
        icon: 'edit',
    },
};

export const ButtonPrimaryTextOnly: Story = {
    name: 'Button / Primary / Text only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Primary,
    },
};

export const ButtonPrimaryIconOnly: Story = {
    name: 'Button / Primary / Icon only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Primary,
        icon: 'edit',
        children: undefined,
    },
};

/***** Button Variant - Secondary *****/

export const ButtonSecondary: Story = {
    name: 'Button / Secondary / Default',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Secondary,
        icon: 'edit',
    },
};

export const ButtonSecondaryTextOnly: Story = {
    name: 'Button / Secondary / Text only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Secondary,
    },
};

export const ButtonSecondaryIconOnly: Story = {
    name: 'Button / Secondary / Icon only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Secondary,
        icon: 'edit',
        children: undefined,
    },
};

/***** Button Variant - Tertiary (Default) *****/

export const ButtonTertiary: Story = {
    name: 'Button / Tertiary / Default',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Tertiary,
        icon: 'edit',
    },
};

export const ButtonTertiaryTextOnly: Story = {
    name: 'Button / Tertiary / Text only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Tertiary,
    },
};

export const ButtonTertiaryIconOnly: Story = {
    name: 'Button / Tertiary / Icon only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Tertiary,
        icon: 'edit',
        children: undefined,
    },
};

/***** Button Variant - Secondary Alt *****/

export const ButtonSecondaryAlt: Story = {
    name: 'Button / Secondary Alt / Default',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.SecondaryAlt,
        icon: 'edit',
    },
};

export const ButtonSecondaryAltTextOnly: Story = {
    name: 'Button / Secondary Alt / Text only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.SecondaryAlt,
    },
};

export const ButtonSecondaryAltIconOnly: Story = {
    name: 'Button / Secondary Alt / Icon only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.SecondaryAlt,
        icon: 'edit',
        children: undefined,
    },
};

/***** Button Variant - Tertiary Alt *****/

export const ButtonTertiaryAlt: Story = {
    name: 'Button / Tertiary Alt / Default',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
        icon: 'edit',
    },
};

export const ButtonTertiaryAltTextOnly: Story = {
    name: 'Button / Tertiary Alt / Text only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
    },
};

export const ButtonTertiaryAltIconOnly: Story = {
    name: 'Button / Tertiary Alt / Icon only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
        icon: 'edit',
        children: undefined,
    },
};

/***** Button Variant - Small Size *****/

export const ButtonSecondaryAltSmall: Story = {
    name: 'Button / Secondary Alt Small / Default',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.SecondaryAlt,
        size: LinkSize.Small,
        icon: 'edit',
    },
};

export const ButtonSecondaryAltSmallTextOnly: Story = {
    name: 'Button / Secondary Alt Small / Text only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.SecondaryAlt,
        size: LinkSize.Small,
    },
};

export const ButtonSecondaryAltSmallIconOnly: Story = {
    name: 'Button / Secondary Alt Small / Icon only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.SecondaryAlt,
        size: LinkSize.Small,
        icon: 'edit',
        children: undefined,
    },
};

export const ButtonTertiaryAltSmall: Story = {
    name: 'Button / Tertiary Alt Small / Default',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
        size: LinkSize.Small,
        icon: 'edit',
    },
};

export const ButtonTertiaryAltSmallTextOnly: Story = {
    name: 'Button / Tertiary Alt Small / Text only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
        size: LinkSize.Small,
    },
};

export const ButtonTertiaryAltSmallIconOnly: Story = {
    name: 'Button / Tertiary Alt Small / Icon only',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
        size: LinkSize.Small,
        icon: 'edit',
        children: undefined,
    },
};

/***** Text Variant *****/

export const TextDefault: Story = {
    name: 'Text / Default',
    args: {
        variant: LinkVariant.Text,
        href: 'https://example.com',
        children: 'Learn more',
    },
};

export const TextExternal: Story = {
    name: 'Text / External link (target="_blank")',
    args: {
        variant: LinkVariant.Text,
        href: 'https://example.com',
        target: '_blank',
        children: 'Open in new tab',
    },
};

export const TextLong: Story = {
    name: 'Text / Long text',
    args: {
        variant: LinkVariant.Text,
        href: '#',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed lorem magna',
    },
};

/***** Varia *****/

export const VariaButtonLongChildren: Story = {
    name: 'Varia / Button with long children',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Primary,
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    },
};

export const VariaButtonHTMLChildren: Story = {
    name: 'Varia / Button with HTML children',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Primary,
        children: (
            <>
                <b>Link</b>&nbsp;<i>label</i>
            </>
        ),
    },
};

export const VariaButtonIconUrl: Story = {
    name: 'Varia / Button with icon URL',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
        size: LinkSize.Small,
        iconUrl: '/assets/icons.svg#calendar-schedule',
        children: 'Reschedule',
    },
};
