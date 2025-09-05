import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { AltRadioListStateful } from './AltRadioList';
import { DIRECTION } from './AltRadioList.types';

const meta: Meta<typeof AltRadioListStateful> = {
    component: AltRadioListStateful,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation', 'base'],
    argTypes: {
        className: { control: 'text' },
        direction: {
            control: 'select',
            options: Object.values(DIRECTION),
        },
        items: { control: false },
    },
    args: {
        onChange: action('on-change'),
        value: 'item1',
        items: [
            { id: 'item1', label: '1:1', value: 'item1' },
            { id: 'item2', label: '2:1', value: 'item2' },
            { id: 'item3', label: '3:1', value: 'item3' },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof AltRadioListStateful>;

export const Default: Story = {
    name: 'Default',
    args: {
        label: 'Choice Inputs List Label',
        helperText: 'This is a helper text',
    },
};

export const Horizontal: Story = {
    name: 'Horizontal',
    args: {
        label: 'Choice Inputs List Label',
        helperText: 'This is a helper text',
        direction: DIRECTION.HORIZONTAL,
    },
};

export const NoHelper: Story = {
    name: 'No Helper',
    args: {
        label: 'Choice Inputs List Label',
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        helperText: 'This is a helper text',
    },
};

export const OnlyItems: Story = {
    name: 'Only Items',
    args: {},
};
