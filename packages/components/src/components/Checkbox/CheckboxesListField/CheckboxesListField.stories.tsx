import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { CheckboxesListFieldDirection, CheckboxesListFieldStateful } from '.';

const meta: Meta<typeof CheckboxesListFieldStateful> = {
    component: CheckboxesListFieldStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        label: 'Choice Inputs List Label',
        helperText: 'This is a helper text',
        name: 'checkboxes-list-field',
        onChange: action('on-change'),
        value: ['item1'],
        items: [
            { id: 'item1', label: 'Item 1', value: 'item1' },
            { id: 'item2', label: 'Item 2', value: 'item2' },
            { id: 'item3', label: 'Item 3', value: 'item3' },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof CheckboxesListFieldStateful>;

export const Default: Story = {
    name: 'Default',
};

export const NoneChecked: Story = {
    name: 'None Checked',
    args: {
        value: [],
    },
};

export const AllChecked: Story = {
    name: 'All Checked',
    args: {
        value: ['item1', 'item2', 'item3'],
    },
};

export const Horizontal: Story = {
    name: 'Horizontal',
    args: {
        direction: CheckboxesListFieldDirection.Horizontal,
    },
};

export const NoHelper: Story = {
    name: 'No Helper',
    args: {
        helperText: undefined,
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        label: undefined,
    },
};

export const OnlyItems: Story = {
    name: 'Only Items',
    args: {
        helperText: undefined,
        label: undefined,
    },
};
