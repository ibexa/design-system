import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import Expander from './Expander';

const meta: Meta<typeof Expander> = {
    component: Expander,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'buttons'],
    argTypes: {
        hasIcon: {
            control: 'boolean',
        },
        isExpanded: {
            control: 'boolean',
        },
        type: {
            control: 'select',
            options: ['caret', 'chevron'],
        },
    },
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof Expander>;

export const Default: Story = {
    name: 'Default',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: 'caret',
    },
};

export const NoIcon: Story = {
    name: 'No Icon',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: 'caret',
        hasIcon: false,
    },
};

export const Chevron: Story = {
    name: 'Chevron',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: 'chevron',
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        hasIcon: true,
        type: 'caret',
    },
};

export const isExpanded: Story = {
    name: 'Is Expanded',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: 'caret',
        isExpanded: true,
    },
};
