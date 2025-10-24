import type { Meta, StoryObj } from '@storybook/react';

import { Tag, TagGhostType, TagSize, TagType } from './';

const meta: Meta<typeof Tag> = {
    component: Tag,
    tags: ['autodocs', 'foundation'],
    args: {
        children: 'Label',
        size: TagSize.Medium,
    },
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
    name: 'Primary / Default',
    args: {
        type: TagType.Primary,
    },
};

export const PrimaryAlt: Story = {
    name: 'Primary Alt',
    args: {
        type: TagType.PrimaryAlt,
    },
};

export const PrimaryAltSmall: Story = {
    name: 'Primary Alt Small',
    args: {
        type: TagType.PrimaryAlt,
        size: TagSize.Small,
    },
};

export const Success: Story = {
    name: 'Success',
    args: {
        type: TagType.Success,
    },
};

export const Info: Story = {
    name: 'Info',
    args: {
        type: TagType.Info,
    },
};

export const Warning: Story = {
    name: 'Warning',
    args: {
        type: TagType.Warning,
    },
};

export const Neutral: Story = {
    name: 'Neutral',
    args: {
        type: TagType.Neutral,
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        type: TagType.Error,
    },
};

export const IconTag: Story = {
    name: 'Icon tag',
    args: {
        icon: 'translation-language',
        type: TagType.IconTag,
    },
};

export const SuccessGhost: Story = {
    name: 'Success Ghost',
    args: {
        type: TagGhostType.SuccessGhost,
    },
};

export const NeutralGhost: Story = {
    name: 'Neutral Ghost',
    args: {
        type: TagGhostType.NeutralGhost,
    },
};

export const ErrorGhost: Story = {
    name: 'Error Ghost',
    args: {
        type: TagGhostType.ErrorGhost,
    },
};
