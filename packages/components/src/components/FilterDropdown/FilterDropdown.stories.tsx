import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from 'storybook/test';
import { action } from 'storybook/actions';

import { FilterDropdownStateful, FilterDropdownType } from '.';
import { DropdownDecorator } from '@ids-sb-decorators/DropdownDecorator';
import { generateItemsArray } from '@ids-sb-utils/generators';

const DEFAULT_ITEMS_LENGTH = 6;
const WRAPPER_HEIGHT = 420;
const openPanel = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { expanded: false }));
};

const meta: Meta<typeof FilterDropdownStateful> = {
    component: FilterDropdownStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        items: generateItemsArray(DEFAULT_ITEMS_LENGTH),
        label: 'Filter',
        name: 'filter',
        onChange: action('on-change'),
    },
    argTypes: {
        onChange: { control: { disable: true } },
    },
    decorators: [DropdownDecorator],
    parameters: {
        wrapperHeight: WRAPPER_HEIGHT,
    },
};

export default meta;

type Story = StoryObj<typeof FilterDropdownStateful>;

export const Default: Story = {
    name: 'Default',
};

export const DefaultOpenedMenu: Story = {
    name: 'Default (Opened Menu)',
    tags: ['!dev'],
    play: openPanel,
};

export const DefaultSelected: Story = {
    name: 'Default (Selected)',
    args: {
        value: ['2'],
    },
};

export const Dashboard: Story = {
    name: 'Dashboard',
    args: {
        type: FilterDropdownType.Dashboard,
    },
};

export const DashboardOpenedMenu: Story = {
    name: 'Dashboard (Opened Menu)',
    tags: ['!dev'],
    args: {
        type: FilterDropdownType.Dashboard,
    },
    play: openPanel,
};

export const DashboardSelected: Story = {
    name: 'Dashboard (Selected)',
    args: {
        type: FilterDropdownType.Dashboard,
        value: ['2'],
    },
};

export const MoreFilters: Story = {
    name: 'More Filters',
    args: {
        label: 'More filters',
        type: FilterDropdownType.MoreFilters,
    },
};

export const MoreFiltersOpenedMenu: Story = {
    name: 'More Filters (Opened Menu)',
    tags: ['!dev'],
    args: {
        label: 'More filters',
        type: FilterDropdownType.MoreFilters,
    },
    play: openPanel,
};

export const MoreFiltersSmall: Story = {
    name: 'More Filters Small',
    args: {
        label: 'More filters',
        type: FilterDropdownType.MoreFiltersSmall,
    },
};

export const Disabled: Story = {
    name: 'Disabled',
    args: {
        disabled: true,
    },
};

export const WithoutSearch: Story = {
    name: 'Without Search (Opened Menu)',
    tags: ['!dev'],
    args: {
        hasSearch: false,
    },
    play: openPanel,
};

export const EmptySearch: Story = {
    name: 'Empty Search (Opened Menu)',
    tags: ['!dev'],
    play: async ({ canvasElement }) => {
        await openPanel({ canvasElement });

        await userEvent.type(within(canvasElement).getByRole('textbox'), 'zzz');
    },
};
