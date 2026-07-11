import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Switcher, SwitcherProps } from '.';

const ITEM_COUNT = 8;
const OVERFLOW_WIDTH = 360;

const defaultItems = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'tree', label: 'Tree' },
];
const itemsWithDisabled = [
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid', disabled: true },
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
    tags: ['!dev'],
    args: {
        items: defaultItems,
        selectedValue: 'list',
        onChange: fn(),
    },
    render: (args) => <StatefulSwitcher {...args} />,
};

export default meta;

type Story = StoryObj<typeof Switcher>;

export const TestSelect: Story = {
    name: 'Test: Select on click',
    play: async ({ canvasElement, args, step }) => {
        const canvas = within(canvasElement);

        await step('List is checked initially', async () => {
            await expect(canvas.getByRole('radio', { name: 'List' })).toHaveAttribute('aria-checked', 'true');
        });

        await step('Clicking Grid selects it and fires onChange', async () => {
            await userEvent.click(canvas.getByRole('radio', { name: 'Grid' }));

            await expect(args.onChange).toHaveBeenLastCalledWith('grid');
            await expect(canvas.getByRole('radio', { name: 'Grid' })).toHaveAttribute('aria-checked', 'true');
            await expect(canvas.getByRole('radio', { name: 'List' })).toHaveAttribute('aria-checked', 'false');
        });
    },
};

export const TestDisabled: Story = {
    name: 'Test: Disabled item is not selectable',
    args: {
        items: itemsWithDisabled,
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const disabledItem = canvas.getByRole('radio', { name: 'Grid' });

        await expect(disabledItem).toBeDisabled();

        await userEvent.click(disabledItem);

        await expect(args.onChange).not.toHaveBeenCalled();
    },
};

export const TestKeyboard: Story = {
    name: 'Test: Arrow keys skip disabled items',
    args: {
        items: itemsWithDisabled,
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);

        canvas.getByRole('radio', { name: 'List' }).focus();
        await userEvent.keyboard('{ArrowRight}');

        await expect(args.onChange).toHaveBeenLastCalledWith('tree');
        await expect(canvas.getByRole('radio', { name: 'Tree' })).toHaveAttribute('aria-checked', 'true');
    },
};

export const TestOverflow: Story = {
    name: 'Test: Overflow reveals hidden items',
    args: {
        overflow: true,
        selectedValue: 'item-1',
        items: Array.from({ length: ITEM_COUNT }, (value, index) => ({
            value: `item-${index + 1}`, // eslint-disable-line no-magic-numbers
            label: `Very long label ${index + 1}`, // eslint-disable-line no-magic-numbers
        })),
    },
    decorators: [
        (StoryComponent) => (
            <div style={{ width: OVERFLOW_WIDTH }}>
                <StoryComponent />
            </div>
        ),
    ],
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const moreButton = await canvas.findByRole('button', { name: /More/ });

        await userEvent.click(moreButton);

        await expect(canvas.getByRole('menu')).toBeVisible();
    },
};
