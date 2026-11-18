import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';
import { action } from 'storybook/actions';

import { ChipDropdownSize, ChipDropdownStateful } from '.';

const LANGUAGE_ITEMS = [
    { id: 'eng-GB', label: 'English (United Kingdom)' },
    { id: 'ger-DE', label: 'German' },
    { id: 'pol-PL', label: 'Polish' },
];

const meta: Meta<typeof ChipDropdownStateful> = {
    component: ChipDropdownStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        icon: 'translation-language',
        items: LANGUAGE_ITEMS,
        label: 'Language:',
        name: 'language',
        onChange: action('on-change'),
        value: 'eng-GB',
    },
    argTypes: {
        onChange: { control: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof ChipDropdownStateful>;

export const Default: Story = {
    name: 'Default',
};

export const OpenedMenu: Story = {
    name: 'Default (Opened Menu)',
    tags: ['!dev'],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdownWidget = canvas.getByText('English (United Kingdom)', { selector: '.ids-dropdown__selection-info-items' });

        await userEvent.click(dropdownWidget);
    },
};

export const Disabled: Story = {
    name: 'Disabled',
    args: {
        disabled: true,
    },
};

export const WithoutLabel: Story = {
    name: 'Without label',
    args: {
        label: '',
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        label: '',
        size: ChipDropdownSize.Small,
    },
};

export const SmallDisabled: Story = {
    name: 'Small (Disabled)',
    args: {
        ...Small.args,
        disabled: true,
    },
};
