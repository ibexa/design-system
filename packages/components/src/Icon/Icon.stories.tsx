import type { Meta, StoryObj } from '@storybook/react';

import Icon, { IconSize } from './';

const meta: Meta<typeof Icon> = {
    component: Icon,
    parameters: {
        layout: 'centered',
        controls: { exclude: ['path'] },
    },
    tags: ['autodocs', 'foundation'],
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
        size: IconSize.Tiny,
    },
};

export const IconTinySmall: Story = {
    name: 'Icon Tiny-Small',
    args: {
        name: 'favourite-outline',
        size: IconSize.TinySmall,
    },
};

export const IconSmall: Story = {
    name: 'Icon Small',
    args: {
        name: 'favourite-outline',
        size: IconSize.Small,
    },
};

export const IconSmallMedium: Story = {
    name: 'Icon Small-Medium',
    args: {
        name: 'favourite-outline',
        size: IconSize.SmallMedium,
    },
};

export const IconMedium: Story = {
    name: 'Icon Medium',
    args: {
        name: 'favourite-outline',
        size: IconSize.Medium,
    },
};

export const IconMediumLarge: Story = {
    name: 'Icon Medium-Large',
    args: {
        name: 'favourite-outline',
        size: IconSize.MediumLarge,
    },
};

export const IconLarge: Story = {
    name: 'Icon Large',
    args: {
        name: 'favourite-outline',
        size: IconSize.Large,
    },
};

export const IconLargeHuge: Story = {
    name: 'Icon Large-Huge',
    args: {
        name: 'favourite-outline',
        size: IconSize.LargeHuge,
    },
};

export const IconHuge: Story = {
    name: 'Icon Huge',
    args: {
        name: 'favourite-outline',
        size: IconSize.Huge,
    },
};

export const IconCssClass: Story = {
    name: 'Icon with css class',
    args: {
        name: 'favourite-outline',
        className: 'ids-icon ids-icon--primary',
    },
};
