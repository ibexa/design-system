import type { Meta, StoryObj } from '@storybook/react';

import Icon from './Icon';
import { IconSizeValues } from './Icon.types';

const meta: Meta<typeof Icon> = {
    component: Icon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
        },
        customPath: {
            control: 'text',
        },
        cssClass: {
            control: 'text',
        },
        size: {
            options: Object.values(IconSizeValues),
        },
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const IconNamed: Story = {
    name: 'Icon',
    args: {
        name: 'bookmark',
    },
};

export const IconTiny: Story = {
    name: 'Icon Tiny',
    args: {
        name: 'bookmark',
        size: 'tiny',
    },
};

export const IconTinySmall: Story = {
    name: 'Icon Tiny-Small',
    args: {
        name: 'bookmark',
        size: 'tiny-small',
    },
};

export const IconSmall: Story = {
    name: 'Icon Small',
    args: {
        name: 'bookmark',
        size: 'small',
    },
};

export const IconSmallMedium: Story = {
    name: 'Icon Small-Medium',
    args: {
        name: 'bookmark',
        size: 'small-medium',
    },
};

export const IconMedium: Story = {
    name: 'Icon Medium',
    args: {
        name: 'bookmark',
        size: 'medium',
    },
};

export const IconMediumLarge: Story = {
    name: 'Icon Medium-Large',
    args: {
        name: 'bookmark',
        size: 'medium-large',
    },
};

export const IconLarge: Story = {
    name: 'Icon Large',
    args: {
        name: 'bookmark',
        size: 'large',
    },
};

export const IconExtraLarge: Story = {
    name: 'Icon Extra-Large',
    args: {
        name: 'bookmark',
        size: 'extra-large',
    },
};

export const IconCustomPath: Story = {
    name: 'Icon with custom path',
    args: {
        customPath: './img/all-icons.svg#browse',
    },
};

export const IconCssClass: Story = {
    name: 'Icon with css class',
    args: {
        name: 'bookmark',
        cssClass: 'ibexa-icon ibexa-icon--primary',
    },
};
