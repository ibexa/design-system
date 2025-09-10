import type { Meta, StoryObj } from '@storybook/react';

import Autosave, { AutosaveStatus } from './';

const meta: Meta<typeof Autosave> = {
    component: Autosave,
    tags: ['autodocs', 'in-frequent'],
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
        status: AutosaveStatus.Saving,
    },
};

export const LightSaved: Story = {
    name: 'Saved (Light)',
    args: {
        status: AutosaveStatus.Saved,
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
        status: AutosaveStatus.Error,
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
        status: AutosaveStatus.Saving,
    },
};

export const DarkSaved: Story = {
    name: 'Saved (Dark)',
    args: {
        isDarkMode: true,
        status: AutosaveStatus.Saved,
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
        status: AutosaveStatus.Error,
    },
};
