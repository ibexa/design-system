import type { Meta, StoryObj } from '@storybook/react';

import { CUSTOM_ICON_SIZE_VALUES } from './CustomIcon.types';
import CustomIcon from './CustomIcon';

const meta: Meta<typeof CustomIcon> = {
    component: CustomIcon,
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
        path: {
            control: 'text',
        },
        size: {
            control: 'select',
            options: Object.values(CUSTOM_ICON_SIZE_VALUES),
        },
    },
};

export default meta;

type Story = StoryObj<typeof CustomIcon>;

export const Default: Story = {
    name: 'Default',
    args: {
        path: '/bundles/ibexaadminuiassets/vendors/ids-assets/dist/img/all-icons.svg#browse',
    },
};

export const WithName: Story = {
    name: 'Icon with name',
    args: {
        path: '/bundles/ibexaadminuiassets/vendors/ids-assets/dist/img/all-icons.svg#browse',
        name: 'browse',
    },
};
