import type { Meta, StoryObj } from '@storybook/react';

import CustomIcon from './';

const meta: Meta<typeof CustomIcon> = {
    component: CustomIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation'],
};

export default meta;

type Story = StoryObj<typeof CustomIcon>;

export const Default: Story = {
    name: 'Default',
    args: {
        path: './img/all-icons.svg#bookmarks',
    },
};

export const WithName: Story = {
    name: 'Icon with name',
    args: {
        path: './img/all-icons.svg#bookmarks',
        name: 'Bookmarks Button',
    },
};
