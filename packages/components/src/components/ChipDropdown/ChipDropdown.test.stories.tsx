import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ChipDropdownSize, ChipDropdownStateful } from '.';
import { generateItemsArray } from '@ids-sb-utils/generators';

const ITEMS_COUNT = 12;
const SELECTED_ITEMS_COUNT = 1;

const meta: Meta<typeof ChipDropdownStateful> = {
    component: ChipDropdownStateful,
    tags: ['!dev'],
    args: {
        icon: 'translation-language',
        items: generateItemsArray(ITEMS_COUNT),
        label: 'Language:',
        name: 'language',
        onChange: fn(),
        value: '1',
    },
};

export default meta;

type Story = StoryObj<typeof ChipDropdownStateful>;

export const Small: Story = {
    name: 'Small',
    args: {
        size: ChipDropdownSize.Small,
    },
    play: async ({ args, canvasElement, step }) => {
        const canvas = within(canvasElement);
        const dropdown = canvasElement.querySelector('.ids-dropdown');
        const widget = canvasElement.querySelector('.ids-dropdown__widget');

        await step('Chip renders its modifiers, icon and label without the input chrome', async () => {
            await expect(dropdown).toHaveClass('ids-dropdown--chip');
            await expect(dropdown).toHaveClass('ids-dropdown--chip-small');
            await expect(widget).not.toHaveClass('ids-input');
            await expect(widget).toHaveAttribute('aria-expanded', 'false');
            await expect(canvasElement.querySelector('.ids-dropdown__icon')).toHaveAttribute('aria-hidden', 'true');
            await expect(canvasElement.querySelector('.ids-dropdown__icon .ids-icon')).toHaveClass('ids-icon--tiny');
            await expect(canvas.getByText('Language:')).toHaveClass('ids-dropdown__label');
        });

        await step('Chip list has no search and marks the selected item with a check icon', async () => {
            await userEvent.click(canvas.getByText('Item 1', { selector: '.ids-dropdown__selection-info-items' }));

            await expect(widget).toHaveAttribute('aria-expanded', 'true');
            await expect(canvasElement.querySelector('.ids-dropdown__search')).toBeNull();
            await expect(canvasElement.querySelectorAll('.ids-dropdown__item-check')).toHaveLength(SELECTED_ITEMS_COUNT);
            await expect(canvasElement.querySelector('.ids-dropdown__item--selected .ids-dropdown__item-check')).toHaveAttribute(
                'aria-hidden',
                'true',
            );
            await expect(canvasElement.querySelector('.ids-dropdown__item--selected .ids-dropdown__item-check use')).toHaveAttribute(
                'xlink:href',
                expect.stringContaining('#form-check'),
            );
        });

        await step('Chip selects an item and reports it', async () => {
            await userEvent.click(canvas.getByText('Item 2', { selector: '.ids-dropdown__item-label' }));

            await expect(canvas.getByText('Item 2', { selector: '.ids-dropdown__selection-info-items' })).toBeVisible();
            await expect(args.onChange).toHaveBeenCalledWith('2');
        });
    },
};

export const Disabled: Story = {
    name: 'Disabled',
    args: {
        disabled: true,
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const dropdown = canvasElement.querySelector('.ids-dropdown');

        await expect(dropdown).toHaveClass('ids-dropdown--disabled');
        await expect(canvasElement.querySelector('.ids-dropdown__widget')).toHaveAttribute('tabindex', '-1');

        await userEvent.click(canvas.getByText('Item 1', { selector: '.ids-dropdown__selection-info-items' }), { pointerEventsCheck: 0 });

        await expect(canvasElement.querySelector('.ids-dropdown__items-container')).not.toBeInTheDocument();
    },
};
