import type { Meta, StoryObj } from '@storybook/react';

import { CustomIcon } from './';

const meta: Meta<typeof CustomIcon> = {
    component: CustomIcon,
    tags: ['autodocs', 'foundation'],
    args: {
        path: './img/all-icons.svg#bookmarks',
    },
};

export default meta;

type Story = StoryObj<typeof CustomIcon>;

export const Default: Story = {
    name: 'Default',
};

export const WithName: Story = {
    name: 'Icon with name',
    args: {
        name: 'Bookmarks Button',
    },
};
