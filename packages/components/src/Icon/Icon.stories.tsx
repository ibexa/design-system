import type { Meta, StoryObj } from '@storybook/react';

import { ICON_SIZE_VALUES } from './Icon.types';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
    component: Icon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation'],
    argTypes: {
        name: {
            control: 'text',
        },
        className: {
            control: 'text',
        },
        size: {
            control: 'select',
            options: Object.values(ICON_SIZE_VALUES),
        },
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const IconNamed: Story = {
    name: 'Icon',
    args: {
        name: 'favourite-outline',
    },
};

export const IconTiny: Story = {
    name: 'Icon Tiny',
    args: {
        name: 'favourite-outline',
        size: 'tiny',
    },
};

export const IconTinySmall: Story = {
    name: 'Icon Tiny-Small',
    args: {
        name: 'favourite-outline',
        size: 'tiny-small',
    },
};

export const IconSmall: Story = {
    name: 'Icon Small',
    args: {
        name: 'favourite-outline',
        size: 'small',
    },
};

export const IconSmallMedium: Story = {
    name: 'Icon Small-Medium',
    args: {
        name: 'favourite-outline',
        size: 'small-medium',
    },
};

export const IconMedium: Story = {
    name: 'Icon Medium',
    args: {
        name: 'favourite-outline',
        size: 'medium',
    },
};

export const IconMediumLarge: Story = {
    name: 'Icon Medium-Large',
    args: {
        name: 'favourite-outline',
        size: 'medium-large',
    },
};

export const IconLarge: Story = {
    name: 'Icon Large',
    args: {
        name: 'favourite-outline',
        size: 'large',
    },
};

export const IconLargeHuge: Story = {
    name: 'Icon Large-Huge',
    args: {
        name: 'favourite-outline',
        size: 'large-huge',
    },
};

export const IconHuge: Story = {
    name: 'Icon Huge',
    args: {
        name: 'favourite-outline',
        size: 'huge',
    },
};

export const IconCssClass: Story = {
    name: 'Icon with css class',
    args: {
        name: 'favourite-outline',
        className: 'ids-icon ids-icon--primary',
    },
};
