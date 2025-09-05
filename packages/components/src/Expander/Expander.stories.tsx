import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import Expander, { ExpanderType } from './';

const meta: Meta<typeof Expander> = {
    component: Expander,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs', 'foundation'],
    args: { onClick: action('on-click') },
};

export default meta;

type Story = StoryObj<typeof Expander>;

export const Default: Story = {
    name: 'Default',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: ExpanderType.caret,
    },
};

export const NoIcon: Story = {
    name: 'No Icon',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: ExpanderType.caret,
        hasIcon: false,
    },
};

export const Chevron: Story = {
    name: 'Chevron',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: ExpanderType.chevron,
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        hasIcon: true,
        type: ExpanderType.caret,
    },
};

export const isExpanded: Story = {
    name: 'Is Expanded',
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: ExpanderType.caret,
        isExpanded: true,
    },
};
