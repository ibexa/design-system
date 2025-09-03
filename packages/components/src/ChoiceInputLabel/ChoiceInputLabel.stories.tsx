import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import ChoiceInputLabel from './ChoiceInputLabel';

const meta: Meta<typeof ChoiceInputLabel> = {
    component: ChoiceInputLabel,
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

type Story = StoryObj<typeof ChoiceInputLabel>;

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
