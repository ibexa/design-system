import type { Meta, StoryObj } from '@storybook/react';

import Autosave, { AUTOSAVE_STATUS } from './Autosave';

const meta: Meta<typeof Autosave> = {
    component: Autosave,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        isDarkMode: {
            control: 'boolean',
        },
        isEnabled: {
            control: 'boolean',
        },
        status: {
            options: Object.values(AUTOSAVE_STATUS),
        },
    },
};

export default meta;

type Story = StoryObj<typeof Autosave>;

export const LightOn: Story = {
    name: 'Initial (Light)',
    args: {},
};

export const LightSaving: Story = {
    name: 'Saving (Light)',
    args: {
        status: 'saving',
    },
};

export const LightSaved: Story = {
    name: 'Saved (Light)',
    args: {
        status: 'saved',
    },
};

export const LightOff: Story = {
    name: 'Off (Light)',
    args: {
        isEnabled: false,
    },
};

export const LightError: Story = {
    name: 'Error (Light)',
    args: {
        status: 'error',
    },
};

export const DarkOn: Story = {
    name: 'Initial (Dark)',
    args: {
        isDarkMode: true,
    },
};

export const DarkSaving: Story = {
    name: 'Saving (Dark)',
    args: {
        isDarkMode: true,
        status: 'saving',
    },
};

export const DarkSaved: Story = {
    name: 'Saved (Dark)',
    args: {
        isDarkMode: true,
        status: 'saved',
    },
};

export const DarkOff: Story = {
    name: 'Off (Dark)',
    args: {
        isDarkMode: true,
        isEnabled: false,
    },
};

export const DarkError: Story = {
    name: 'Error (Dark)',
    args: {
        isDarkMode: true,
        status: 'error',
    },
};
