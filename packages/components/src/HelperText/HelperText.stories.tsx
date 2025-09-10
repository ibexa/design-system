import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import HelperText, { HelperTextType } from './';

const meta: Meta<typeof HelperText> = {
    component: HelperText,
    tags: ['autodocs', 'foundation'],
    args: {
        children: 'Lorem Ipsum',
    },
};

export default meta;

type Story = StoryObj<typeof HelperText>;

export const Default: Story = {
    name: 'Default',
};

export const withHTML: Story = {
    name: 'With HTML',
    args: {
        children: (
            <>
                <b>Lorem</b>
                <br />
                <u>Ipsum</u>
            </>
        ),
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        type: HelperTextType.Error,
    },
};
