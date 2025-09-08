import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import BaseInputsList, { Direction } from './';

interface ItemType {
    id: string;
    label: string;
}

const meta: Meta<typeof BaseInputsList<ItemType>> = {
    title: 'components/src/base/BaseInputsList',
    component: BaseInputsList<ItemType>,
    tags: ['autodocs', 'foundation', 'base'],
    args: {
        labelProps: { children: 'Choice Inputs List Label' },
        helperTextProps: { children: 'This is a helper text' },
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
};

export const Horizontal: Story = {
    name: 'Horizontal',
    args: {
        direction: Direction.Horizontal,
    },
};

export const NoHelper: Story = {
    name: 'No Helper',
    args: {
        helperTextProps: undefined,
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        labelProps: undefined,
    },
};

export const OnlyItems: Story = {
    name: 'Only Items',
    args: {
        helperTextProps: undefined,
        labelProps: undefined,
    },
};
