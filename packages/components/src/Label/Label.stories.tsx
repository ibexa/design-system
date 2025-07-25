import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Label from './Label';

const meta: Meta<typeof Label> = {
    component: Label,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
    name: 'Default',
    args: {
        children: 'Lorem Ipsum',
        htmlFor: 'default-input',
    },
};

export const withHTML: Story = {
    name: 'With HTML',
    args: {
        children: (
            <>
                <b>Lorem</b>&nbsp;<u>Ipsum</u>
            </>
        ),
        htmlFor: 'default-input',
    },
};

export const Required: Story = {
    name: 'Required',
    args: {
        children: 'Lorem Ipsum',
        htmlFor: 'default-input',
        required: true,
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        children: 'Lorem Ipsum',
        htmlFor: 'default-input',
        error: true,
        required: true,
    },
};
