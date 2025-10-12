import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { OverflowList } from './';

interface ItemType {
    id: string;
    content: string;
}

const generateItems = (length: number) =>
    Array.from({ length }, (value, index) => {
        const id = String(index + 1);

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
        renderMore: ({ hiddenCount }) => (
            <div className="ids-overflow-list__item ids-overflow-list__item--more">{hiddenCount > 0 && <div>+ {hiddenCount}</div>}</div>
        ),
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

export const FontLoading: Story = {
    name: 'Font Loading',
    parameters: {
        wrapperWidth: 250,
    },
};
