import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { TabsItem, TabsStateful } from './';

const ITEMS: TabsItem[] = [
    { id: 'fields', label: 'Fields' },
    { id: 'sub-items', label: 'Sub-items' },
    { id: 'translations', isDisabled: true, label: 'Translations' },
    { id: 'versions', label: 'Versions' },
];

const meta: Meta<typeof TabsStateful> = {
    component: TabsStateful,
    tags: ['!dev'],
    args: {
        items: ITEMS,
        onChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof TabsStateful>;

const expectSelected = async (canvas: ReturnType<typeof within>, name: string) => {
    const tab = canvas.getByRole('tab', { name });

    await expect(tab).toHaveAttribute('aria-selected', 'true');
    await expect(tab).toHaveClass('ids-tabs__tab--selected');
    await expect(tab).toHaveAttribute('tabindex', '0');
};

export const SelectByClick: Story = {
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('First tab is selected initially', async () => {
            await expectSelected(canvas, 'Fields');
            await expect(canvas.getByRole('tab', { name: 'Sub-items' })).toHaveAttribute('tabindex', '-1');
        });

        await step('Click selects the tab and calls onChange once', async () => {
            await userEvent.click(canvas.getByRole('tab', { name: 'Sub-items' }));

            await expectSelected(canvas, 'Sub-items');
            await expect(args.onChange).toHaveBeenCalledOnce();
            await expect(args.onChange).toHaveBeenCalledWith('sub-items', expect.anything());
        });

        await step('Disabled tab cannot be selected', async () => {
            const disabledTab = canvas.getByRole('tab', { name: 'Translations' });

            await expect(disabledTab).toBeDisabled();
            await expect(disabledTab).toHaveClass('ids-tabs__tab--disabled');
        });
    },
};

export const KeyboardNavigation: Story = {
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        canvas.getByRole('tab', { name: 'Fields' }).focus();

        await step('ArrowRight selects the next tab and skips the disabled one', async () => {
            await userEvent.keyboard('{ArrowRight}');
            await expectSelected(canvas, 'Sub-items');

            await userEvent.keyboard('{ArrowRight}');
            await expectSelected(canvas, 'Versions');
            await expect(canvas.getByRole('tab', { name: 'Versions' })).toHaveFocus();
        });

        await step('ArrowRight wraps to the first tab', async () => {
            await userEvent.keyboard('{ArrowRight}');
            await expectSelected(canvas, 'Fields');
        });

        await step('ArrowLeft wraps to the last tab', async () => {
            await userEvent.keyboard('{ArrowLeft}');
            await expectSelected(canvas, 'Versions');
        });

        await step('Home and End jump to the edges', async () => {
            await userEvent.keyboard('{Home}');
            await expectSelected(canvas, 'Fields');

            await userEvent.keyboard('{End}');
            await expectSelected(canvas, 'Versions');
        });
    },
};

export const Panels: Story = {
    args: {
        items: ITEMS.map((item) => ({ ...item, content: `Panel ${item.id}` })),
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Only the selected panel is visible and linked to its tab', async () => {
            const tab = canvas.getByRole('tab', { name: 'Fields' });
            const panel = canvas.getByRole('tabpanel');

            await expect(panel).toHaveTextContent('Panel fields');
            await expect(panel).toHaveAttribute('aria-labelledby', tab.id);
            await expect(tab).toHaveAttribute('aria-controls', panel.id);
        });

        await step('Selecting another tab switches the panel', async () => {
            await userEvent.click(canvas.getByRole('tab', { name: 'Versions' }));

            await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Panel versions');
        });
    },
};
