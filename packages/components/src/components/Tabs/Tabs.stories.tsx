import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { TabsStateful } from './';

const MANY_TABS_COUNT = 12;
const ITEMS = [
    { id: 'fields', label: 'Fields' },
    { id: 'sub-items', label: 'Sub-items' },
    { id: 'translations', label: 'Translations' },
    { id: 'versions', label: 'Versions' },
];

const meta: Meta<typeof TabsStateful> = {
    component: TabsStateful,
    tags: ['autodocs', 'foundation'],
    args: {
        items: ITEMS,
        onChange: action('on-change'),
    },
    argTypes: {
        onChange: { control: { disable: true } },
    },
};

export default meta;

type Story = StoryObj<typeof TabsStateful>;

export const Default: Story = {
    name: 'Default',
};

export const WithError: Story = {
    name: 'With error',
    args: {
        items: ITEMS.map((item) => (item.id === 'translations' ? { ...item, hasError: true } : item)),
    },
};

export const WithDisabled: Story = {
    name: 'With disabled',
    args: {
        items: ITEMS.map((item) => (item.id === 'versions' ? { ...item, isDisabled: true } : item)),
    },
};

export const WithPanels: Story = {
    name: 'With panels',
    args: {
        items: ITEMS.map((item) => ({ ...item, content: `Content of the ${item.label} tab` })),
    },
};

export const ManyTabs: Story = {
    name: 'Many tabs',
    args: {
        items: Array.from({ length: MANY_TABS_COUNT }, (item, index) => ({ id: `tab-${index}`, label: `Tab ${index}` })),
    },
};
