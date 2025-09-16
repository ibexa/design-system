import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { AltRadiosListFieldDirection, AltRadiosListFieldStateful } from '.';

const meta: Meta<typeof AltRadiosListFieldStateful> = {
    component: AltRadiosListFieldStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        label: 'Choice Inputs List Label',
        helperText: 'This is a helper text',
        onChange: action('on-change'),
        value: 'item1',
        items: [
            { id: 'item1', label: 'Item 1', value: 'item1' },
            { id: 'item2', label: 'Item 2', value: 'item2' },
            { id: 'item3', label: 'Item 3', value: 'item3' },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof AltRadiosListFieldStateful>;

export const Default: Story = {
    name: 'Default',
};

export const Horizontal: Story = {
    name: 'Horizontal',
    args: {
        direction: AltRadiosListFieldDirection.Horizontal,
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
        label: undefined,
        helperText: undefined,
    },
};
