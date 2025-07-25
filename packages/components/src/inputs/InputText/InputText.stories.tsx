import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { INPUT_SIZE_VALUES, INPUT_TYPE_VALUES } from './InputText.types';
import InputText from './InputText';

const meta: Meta<typeof InputText> = {
    component: InputText,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'inputs'],
    argTypes: {
        size: {
            control: 'select',
            options: Object.values(INPUT_SIZE_VALUES),
        },
        type: {
            control: 'select',
            options: Object.values(INPUT_TYPE_VALUES),
        },
        className: {
            control: 'text',
        },
        title: {
            control: 'text',
        },
        value: {
            control: 'text',
        },
    },
    args: {
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
    decorators: [
        (Story, { args }) => {
            const [value, setValue] = useState(args.value ?? '');
            const onChange = (changedValue: string, event?: React.ChangeEvent<HTMLInputElement>) => {
                setValue(changedValue);

                if (args.onChange) {
                    args.onChange(changedValue, event);
                }
            };

            return (
                <Story
                    args={{
                        ...args,
                        onChange,
                        value,
                    }}
                />
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Empty: Story = {
    name: 'Empty',
    args: {
        name: 'default-input',
    },
};

export const EmptyPlaceholder: Story = {
    name: 'Empty (Placeholder)',
    args: {
        name: 'default-input',
        placeholder: 'Placeholder text',
    },
};

export const EmptyDisabled: Story = {
    name: 'Empty (Disabled)',
    args: {
        name: 'default-input',
        disabled: true,
    },
};

export const EmptyError: Story = {
    name: 'Empty (Error)',
    args: {
        name: 'default-input',
        error: true,
    },
};

export const Filled: Story = {
    name: 'Filled',
    args: {
        name: 'default-input',
        value: 'Lorem Ipsum',
    },
};

export const FilledDisabled: Story = {
    name: 'Filled (Disabled)',
    args: {
        name: 'default-input',
        value: 'Lorem Ipsum',
        disabled: true,
    },
};

export const FilledError: Story = {
    name: 'Filled (Error)',
    args: {
        name: 'default-input',
        value: 'Lorem Ipsum',
        error: true,
    },
};

export const FilledSmall: Story = {
    name: 'Filled (Small)',
    args: {
        name: 'default-input',
        value: 'Lorem Ipsum',
        size: 'small',
    },
};

export const FilledPassword: Story = {
    name: 'Filled (Password)',
    args: {
        name: 'default-input',
        value: 'qwerty123',
        type: 'password',
    },
};

export const FilledEmail: Story = {
    name: 'Filled (Email)',
    args: {
        name: 'default-input',
        value: 'test@test.com',
        type: 'email',
    },
};

export const FilledNumber: Story = {
    name: 'Filled (Number)',
    args: {
        name: 'default-input',
        value: 12345,
        type: 'number',
    },
};

export const FilledPhone: Story = {
    name: 'Filled (Phone)',
    args: {
        name: 'default-input',
        value: '1234567890',
        type: 'tel',
    },
};

export const FilledSearch: Story = {
    name: 'Filled (Search)',
    args: {
        name: 'default-input',
        value: 'Lorem Ipsum',
        type: 'search',
    },
};

export const FilledUrl: Story = {
    name: 'Filled (Url)',
    args: {
        name: 'default-input',
        value: 'www.ibexa.co',
        type: 'url',
    },
};

export const WithDefinedId: Story = {
    name: 'With defined ID',
    args: {
        name: 'default-input',
        id: 'defined-id',
    },
};
