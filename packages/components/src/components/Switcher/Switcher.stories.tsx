import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Switcher, SwitcherProps, SwitcherSize, SwitcherType } from '.';

const defaultItems = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'tree', label: 'Tree' },
];

const StatefulSwitcher = ({ selectedValue, onChange, ...props }: SwitcherProps) => {
    const [value, setValue] = useState(selectedValue);

    return (
        <Switcher
            {...props}
            onChange={(nextValue) => {
                setValue(nextValue);
                onChange?.(nextValue);
            }}
            selectedValue={value}
        />
    );
};

const meta: Meta<typeof Switcher> = {
    component: Switcher,
    tags: ['autodocs', 'foundation'],
    args: {
        items: defaultItems,
        selectedValue: 'list',
        size: SwitcherSize.Large,
        type: SwitcherType.Backoffice,
    },
    argTypes: {
        size: { control: 'inline-radio', options: Object.values(SwitcherSize) },
        type: { control: 'inline-radio', options: Object.values(SwitcherType) },
        onChange: { control: { disable: true } },
    },
    render: (args) => <StatefulSwitcher {...args} />,
};

export default meta;

type Story = StoryObj<typeof Switcher>;

export const Large: Story = {
    name: 'Large',
};

export const Small: Story = {
    name: 'Small',
    args: {
        size: SwitcherSize.Small,
    },
};

export const Builders: Story = {
    name: 'Builders',
    args: {
        type: SwitcherType.Builders,
    },
};

export const WithDisabledItem: Story = {
    name: 'With disabled item',
    args: {
        items: [
            { value: 'list', label: 'List' },
            { value: 'grid', label: 'Grid', disabled: true },
            { value: 'tree', label: 'Tree' },
        ],
    },
};

export const WithErrorItem: Story = {
    name: 'With error item',
    args: {
        items: [
            { value: 'list', label: 'List' },
            { value: 'grid', label: 'Grid', error: true },
            { value: 'tree', label: 'Tree' },
        ],
    },
};

export const Overflow: Story = {
    name: 'Overflow',
    args: {
        overflow: true,
        items: Array.from({ length: 8 }, (value, index) => ({
            value: `item-${index + 1}`, // eslint-disable-line no-magic-numbers
            label: `Very long label ${index + 1}`, // eslint-disable-line no-magic-numbers
        })),
        selectedValue: 'item-1',
    },
    decorators: [
        (StoryComponent) => (
            <div style={{ width: 480 }}>
                <StoryComponent />
            </div>
        ),
    ],
};
