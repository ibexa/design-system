import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { HELPER_TEXT_TYPE_VALUES } from './HelperText.types';
import HelperText from './HelperText';

const meta: Meta<typeof HelperText> = {
    component: HelperText,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: Object.values(HELPER_TEXT_TYPE_VALUES),
        },
        className: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<typeof HelperText>;

export const Default: Story = {
    name: 'Default',
    args: {
        children: 'Lorem Ipsum',
    },
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
        children: 'Lorem Ipsum',
        type: 'error',
    },
};
