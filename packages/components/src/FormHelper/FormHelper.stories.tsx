import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { FORM_HELPER_SIZE_VALUES, FORM_HELPER_TYPE_VALUES } from './FormHelper.types';
import FormHelper from './FormHelper';

const meta: Meta<typeof FormHelper> = {
    component: FormHelper,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(FORM_HELPER_SIZE_VALUES),
        },
        type: {
            control: 'select',
            options: Object.values(FORM_HELPER_TYPE_VALUES),
        },
        extraClasses: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
    },
};

export default meta;

type Story = StoryObj<typeof FormHelper>;

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

export const Small: Story = {
    name: 'Small',
    args: {
        children: 'Lorem Ipsum',
        type: 'default',
        size: 'small',
    },
};

export const Warning: Story = {
    name: 'Warning',
    args: {
        children: 'Lorem Ipsum',
        type: 'warning',
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        children: 'Lorem Ipsum',
        type: 'error',
    },
};

export const Info: Story = {
    name: 'Info',
    args: {
        children: 'Lorem Ipsum',
        type: 'info',
    },
};

export const Success: Story = {
    name: 'Success',
    args: {
        children: 'Lorem Ipsum',
        type: 'success',
    },
};
