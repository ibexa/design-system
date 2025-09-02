import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import BaseInputsList from './BaseInputsList';
import { DIRECTION } from './BaseInputsList.types';

interface ItemType {
    id: string;
    label: string;
}

const meta: Meta<typeof BaseInputsList<ItemType>> = {
    title: 'components/src/base/BaseInputsList',
    component: BaseInputsList<ItemType>,
    parameters: {
        layout: 'centered',
        docs: {
            controls: { exclude: ['items', 'renderItem', 'labelProps', 'helperTextProps'] },
        },
    },
    tags: ['autodocs', 'foundation', 'base'],
    argTypes: {
        className: { control: 'text' },
        direction: {
            control: 'select',
            options: Object.values(DIRECTION),
        },
    },
    args: {
        items: [
            { id: '1', label: 'Item 1' },
            { id: '2', label: 'Item 2' },
            { id: '3', label: 'Item 3' },
        ],
        renderItem: (item: ItemType) => (
            <div key={item.id}>
                {item.id}: {item.label}
            </div>
        ),
    },
};

export default meta;

type Story = StoryObj<typeof BaseInputsList<ItemType>>;

export const Default: Story = {
    name: 'Default',
    args: {
        labelProps: { children: 'Choice Inputs List Label' },
        helperTextProps: { children: 'This is a helper text' },
    },
};

export const Horizontal: Story = {
    name: 'Horizontal',
    args: {
        labelProps: { children: 'Choice Inputs List Label' },
        helperTextProps: { children: 'This is a helper text' },
        direction: DIRECTION.HORIZONTAL,
    },
};

export const NoHelper: Story = {
    name: 'No Helper',
    args: {
        labelProps: { children: 'Choice Inputs List Label' },
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        helperTextProps: { children: 'This is a helper text' },
    },
};

export const OnlyItems: Story = {
    name: 'Only Items',
    args: {},
};
