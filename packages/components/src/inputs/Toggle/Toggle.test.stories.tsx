import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ToggleStateful } from './';

const meta: Meta<typeof ToggleStateful> = {
    component: ToggleStateful,
    tags: ['!dev'],
    args: {
        enabledLabel: 'Enabled',
        disabledLabel: 'Disabled',
        name: 'default-input',
        onBlur: fn(),
        onChange: fn(),
        onFocus: fn(),
        onInput: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof ToggleStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const toggler = canvas.getByRole('button');
        const checkStepState = async (numberOfClicks: number, currValue: boolean) => {
            await expect(args.onFocus).toHaveBeenCalledTimes(numberOfClicks);
            await expect(args.onChange).toHaveBeenNthCalledWith(numberOfClicks, currValue);
            await expect(args.onInput).toHaveBeenNthCalledWith(numberOfClicks, currValue);

            if (currValue) {
                await expect(toggler.parentNode).toHaveClass('ids-toggle--checked');
            } else {
                await expect(toggler.parentNode).not.toHaveClass('ids-toggle--checked');
            }
        };

        await step('Click toggle to check it', async () => {
            await userEvent.click(toggler);

            await checkStepState(1, true); // eslint-disable-line no-magic-numbers
        });

        await step('Click toggle to uncheck it', async () => {
            await userEvent.click(toggler);

            await checkStepState(2, false); // eslint-disable-line no-magic-numbers
        });

        await step('Click outside of toggle widget', async () => {
            await userEvent.click(canvasElement);

            await expect(args.onBlur).toHaveBeenCalledTimes(2); // eslint-disable-line no-magic-numbers
        });

        await step('Click toggle label to check it', async () => {
            const togglerLabel = canvas.getByText('Disabled');
            await userEvent.click(togglerLabel);

            await checkStepState(3, true); // eslint-disable-line no-magic-numbers
        });

        await step('Click toggle label to uncheck it', async () => {
            const togglerLabel = canvas.getByText('Enabled');
            await userEvent.click(togglerLabel);

            await checkStepState(4, false); // eslint-disable-line no-magic-numbers
        });
    },
};
