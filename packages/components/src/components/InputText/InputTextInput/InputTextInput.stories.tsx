import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { InputTextInputSize, InputTextInputStateful } from '.';

const meta: Meta<typeof InputTextInputStateful> = {
    component: InputTextInputStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        name: 'default-input',
        onBlur: action('on-blur'),
        onChange: action('on-change'),
        onFocus: action('on-focus'),
        onInput: action('on-input'),
    },
    argTypes: {
        onBlur: { control: { disable: true } },
        onChange: { control: { disable: true } },
        onFocus: { control: { disable: true } },
        onInput: { control: { disable: true } },
        ref: { control: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof InputTextInputStateful>;

export const Empty: Story = {
    name: 'Empty',
};

export const EmptyPlaceholder: Story = {
    name: 'Empty (Placeholder)',
    args: {
        placeholder: 'Placeholder text',
    },
};

export const EmptyDisabled: Story = {
    name: 'Empty (Disabled)',
    args: {
        disabled: true,
    },
};

export const EmptyError: Story = {
    name: 'Empty (Error)',
    args: {
        error: true,
    },
};

export const Filled: Story = {
    name: 'Filled',
    args: {
        value: 'Lorem Ipsum',
    },
};

export const FilledDisabled: Story = {
    name: 'Filled (Disabled)',
    args: {
        value: 'Lorem Ipsum',
        disabled: true,
    },
};

export const FilledError: Story = {
    name: 'Filled (Error)',
    args: {
        value: 'Lorem Ipsum',
        error: true,
    },
};

export const FilledSmall: Story = {
    name: 'Filled (Small)',
    args: {
        value: 'Lorem Ipsum',
        size: InputTextInputSize.Small,
    },
};

export const FilledPassword: Story = {
    name: 'Filled (Password)',
    args: {
        value: 'qwerty123',
        type: 'password',
    },
};

export const FilledEmail: Story = {
    name: 'Filled (Email)',
    args: {
        value: 'test@test.com',
        type: 'email',
    },
};

export const FilledNumber: Story = {
    name: 'Filled (Number)',
    args: {
        value: 12345,
        type: 'number',
    },
};

export const FilledPhone: Story = {
    name: 'Filled (Phone)',
    args: {
        value: '1234567890',
        type: 'tel',
    },
};

export const FilledSearch: Story = {
    name: 'Filled (Search)',
    args: {
        value: 'Lorem Ipsum',
        type: 'search',
    },
};

export const FilledUrl: Story = {
    name: 'Filled (Url)',
    args: {
        value: 'www.ibexa.co',
        type: 'url',
    },
};

export const WithDefinedId: Story = {
    name: 'With defined ID',
    args: {
        id: 'defined-id',
    },
};
