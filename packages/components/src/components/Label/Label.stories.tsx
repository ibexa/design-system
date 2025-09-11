import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './';

const meta: Meta<typeof Label> = {
    component: Label,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: 'Lorem Ipsum',
        htmlFor: 'default-input',
    },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
    name: 'Default',
};

export const withHTML: Story = {
    name: 'With HTML',
    args: {
        children: (
            <>
                <b>Lorem</b>&nbsp;<u>Ipsum</u>
            </>
        ),
    },
};

export const Required: Story = {
    name: 'Required',
    args: {
        required: true,
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        error: true,
        required: true,
    },
};
