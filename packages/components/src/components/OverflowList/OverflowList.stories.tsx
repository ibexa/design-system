import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OverflowList } from './';

interface ItemType {
    id: string;
    content: string;
}

const generateItems = (length: number) =>
    Array.from({ length }, (value, index) => {
        const id = String(index + 1); // eslint-disable-line no-magic-numbers

        return {
            id,
            content: `Item ${id}`,
        };
    });

const meta: Meta<typeof OverflowList<ItemType>> = {
    component: OverflowList,
    tags: ['autodocs', 'foundation'],
    parameters: {
        wrapperWidth: 210,
    },
    args: {
        items: generateItems(7), // eslint-disable-line no-magic-numbers
        renderItem: (item) => (
            <div className="ids-overflow-list__item" key={item.id}>
                {item.content}
            </div>
        ),
        renderMore: ({ hiddenCount }) => <div className="ids-overflow-list__item ids-overflow-list__item--more">+ {hiddenCount}</div>,
    },
    decorators: [
        (Story, { parameters }) => {
            return (
                <>
                    <style>
                        {`
                            .wrapper {
                                width: ${parameters.wrapperWidth}px;
                                border: 1px solid #000;
                            }
                            .ids-overflow-list__item {
                                border: 1px solid #000;
                                padding: 4px 8px;
                                margin: 2px;
                            }
                        `}
                    </style>
                    <div className="wrapper">
                        <Story />
                    </div>
                </>
            );
        },
    ],
};

export default meta;

type Story = StoryObj<typeof OverflowList>;

export const OverflowListDefault: Story = {
    name: 'Overflow List',
};

export const SpaceLeft: Story = {
    name: 'Space left',
    parameters: {
        wrapperWidth: 600,
    },
};

export const SpaceLeftOnOverflowItem: Story = {
    name: 'Space ends on overflow item',
    parameters: {
        wrapperWidth: 460,
    },
};

export const SpaceLeftOnLastItem: Story = {
    name: 'Space ends on last item',
    parameters: {
        wrapperWidth: 400,
    },
};

export const FontLoading: Story = {
    name: 'Font Loading',
    parameters: {
        wrapperWidth: 250,
    },
};
