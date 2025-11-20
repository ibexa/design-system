import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { Expander, ExpanderType } from './';

const meta: Meta<typeof Expander> = {
    component: Expander,
    tags: ['autodocs', 'foundation'],
    args: {
        collapseLabel: 'Show less',
        expandLabel: 'Show more',
        type: ExpanderType.Caret,
        onClick: action('on-click'),
    },
    argTypes: {
        onClick: { control: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof Expander>;

export const Default: Story = {
    name: 'Default',
};

export const NoIcon: Story = {
    name: 'No Icon',
    args: {
        hasIcon: false,
    },
};

export const Chevron: Story = {
    name: 'Chevron',
    args: {
        type: ExpanderType.Chevron,
    },
};

export const NoLabel: Story = {
    name: 'No Label',
    args: {
        collapseLabel: undefined,
        expandLabel: undefined,
        hasIcon: true,
    },
};

export const isExpanded: Story = {
    name: 'Is Expanded',
    args: {
        isExpanded: true,
    },
};
