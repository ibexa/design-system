import type { Meta, StoryObj } from '@storybook/react';

import { Icon, IconSize } from './';

const meta: Meta<typeof Icon> = {
    component: Icon,
    tags: ['autodocs', 'foundation'],
    args: {
        name: 'favourite-outline',
    },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const IconNamed: Story = {
    name: 'Icon',
};

export const IconTiny: Story = {
    name: 'Icon Tiny',
    args: {
        size: IconSize.Tiny,
    },
};

export const IconTinySmall: Story = {
    name: 'Icon Tiny-Small',
    args: {
        size: IconSize.TinySmall,
    },
};

export const IconSmall: Story = {
    name: 'Icon Small',
    args: {
        size: IconSize.Small,
    },
};

export const IconSmallMedium: Story = {
    name: 'Icon Small-Medium',
    args: {
        size: IconSize.SmallMedium,
    },
};

export const IconMedium: Story = {
    name: 'Icon Medium',
    args: {
        size: IconSize.Medium,
    },
};

export const IconMediumLarge: Story = {
    name: 'Icon Medium-Large',
    args: {
        size: IconSize.MediumLarge,
    },
};

export const IconLarge: Story = {
    name: 'Icon Large',
    args: {
        size: IconSize.Large,
    },
};

export const IconLargeHuge: Story = {
    name: 'Icon Large-Huge',
    args: {
        size: IconSize.LargeHuge,
    },
};

export const IconHuge: Story = {
    name: 'Icon Huge',
    args: {
        size: IconSize.Huge,
    },
};

export const IconCssClass: Story = {
    name: 'Icon with css class',
    args: {
        className: 'ids-icon ids-icon--primary',
    },
};

export const CustomIcon: Story = {
    name: 'Custom Icon',
    args: {
        name: undefined,
        path: './img/all-icons.svg#bookmarks',
    },
};

export const CustomIconWithName: Story = {
    name: 'Custom Icon with name',
    args: {
        name: 'Bookmarks Button',
        path: './img/all-icons.svg#bookmarks',
    },
};
