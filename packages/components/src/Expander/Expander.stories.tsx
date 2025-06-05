import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import Expander from './Expander';

const meta: Meta<typeof Expander> = {
    component: Expander,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        hasIcon: {
            control: 'boolean',
        },
        isExpanded: {
            control: 'boolean',
        },
        type: {
            control: 'select',
            options: ['caret', 'triangle'],
        },
    },
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof Expander>;

export const Default: Story = {
    name: 'Default',
    args: {
        collapseLabel: 'Show more',
        expandLabel: 'Show less',
    },
};

export const NoIcon: Story = {
    name: 'No Icon',
    args: {
        collapseLabel: 'Show more',
        expandLabel: 'Show less',
        hasIcon: false,
    },
};

export const Triangle: Story = {
    name: 'Triangle',
    args: {
        collapseLabel: 'Show more',
        expandLabel: 'Show less',
        type: 'triangle',
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        hasIcon: true,
    },
};

export const isExpanded: Story = {
    name: 'Is Expanded',
    args: {
        collapseLabel: 'Show more',
        expandLabel: 'Show less',
        isExpanded: true,
    },
};
