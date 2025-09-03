import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import BaseChoiceInputField from './BaseChoiceInputField';
import { RadioButtonStateful } from '../../../inputs/RadioButton';

const meta: Meta<typeof BaseChoiceInputField> = {
    title: 'components/src/base/BaseChoiceInputField',
    component: BaseChoiceInputField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'base'],
    argTypes: {
        className: { control: 'text' },
        renderInput: { control: false },
    },
    args: {
        id: 'default-radio',
        renderInput: () => <RadioButtonStateful checked={false} id="default-radio" name="default-radio" value="default" />,
    },
    decorators: [
        (Story) => {
            return (
                <form name="default-form">
                    <Story />
                </form>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof BaseChoiceInputField>;

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
                <b>Lorem</b>&nbsp;<u>Ipsum</u>
            </>
        ),
    },
};
