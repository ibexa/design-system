import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { AltRadioProps } from './AltRadio.types';
import { WrappedComponentProps } from '@ids-internal/hoc/withStateChecked';

import { AltRadioStateful } from './AltRadio';

type StoryProps = WrappedComponentProps<AltRadioProps> & {
    'inputProps.checked'?: boolean;
    'inputProps.disabled'?: boolean;
    'inputProps.error'?: boolean;
    'inputProps.name'?: string;
};

const meta: Meta<StoryProps> = {
    component: AltRadioStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'inputs'],
    argTypes: {
        className: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
        inputProps: {
            control: false,
        },
        'inputProps.checked': {
            control: 'boolean',
        },
        'inputProps.disabled': {
            control: 'boolean',
        },
        'inputProps.error': {
            control: 'boolean',
        },
        'inputProps.name': {
            control: 'text',
        },
    },
    args: {
        label: '1:1',
        inputProps: {
            name: 'default-input',
            onBlur: action('on-blur'),
            onChange: action('on-change'),
            onFocus: action('on-focus'),
            onInput: action('on-input'),
        },
    },
    decorators: [
        (Story, { args }) => {
            const inputProps = { ...args.inputProps };

            inputProps.checked = args['inputProps.checked'] ?? false;
            inputProps.disabled = args['inputProps.disabled'] ?? false;
            inputProps.error = args['inputProps.error'] ?? false;
            inputProps.name = args['inputProps.name'] ?? '';

            return (
                <form name="default-form">
                    <Story args={{ ...args, inputProps }} />
                </form>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Empty: Story = {
    name: 'Empty',
};

export const EmptyDisabled: Story = {
    name: 'Empty (Disabled)',
    args: {
        'inputProps.disabled': true,
    },
};

export const EmptyError: Story = {
    name: 'Empty (Error)',
    args: {
        'inputProps.error': true,
    },
};

export const Checked: Story = {
    name: 'Checked',
    args: {
        'inputProps.checked': true,
    },
};

export const CheckedDisabled: Story = {
    name: 'Checked (Disabled)',
    args: {
        'inputProps.disabled': true,
        'inputProps.checked': true,
    },
};

export const CheckedError: Story = {
    name: 'Checked (Error)',
    args: {
        'inputProps.error': true,
        'inputProps.checked': true,
    },
};
