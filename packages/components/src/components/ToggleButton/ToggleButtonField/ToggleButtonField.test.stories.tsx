import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ToggleButtonFieldStateful } from '.';

const meta: Meta<typeof ToggleButtonFieldStateful> = {
    component: ToggleButtonFieldStateful,
    tags: ['!dev'],
    args: {
        id: 'default-input',
        label: 'Checkbox Label',
        name: 'default-input',
        onChange: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof ToggleButtonFieldStateful>;

export const Default: Story = {
    name: 'Default',
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);
        const toggler = canvas.getByRole('button');
        const checkStepState = async (numberOfClicks: number, currValue: boolean, expectAdditionalParam = false) => {
            if (expectAdditionalParam) {
                await expect(args.onChange).toHaveBeenNthCalledWith(numberOfClicks, currValue, expect.anything());
            } else {
                await expect(args.onChange).toHaveBeenNthCalledWith(numberOfClicks, currValue);
            }

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

        await step('Click toggle label to check it', async () => {
            const togglerLabel = canvas.getByText('Off');

            await userEvent.click(togglerLabel);

            await checkStepState(3, true, true); // eslint-disable-line no-magic-numbers
        });

        await step('Click toggle label to uncheck it', async () => {
            const togglerLabel = canvas.getByText('On');

            await userEvent.click(togglerLabel);

            await checkStepState(4, false, true); // eslint-disable-line no-magic-numbers
        });
    },
};
