import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { sleep } from '../../../../src/utils/test';

import Accordion from './Accordion';

const ANIMATION_TIMEOUT = 2000;

const meta: Meta<typeof Accordion> = {
    component: Accordion,
    parameters: {
        layout: 'padded',
    },
    tags: ['!dev'],
    argTypes: {
        initiallyExpanded: {
            control: 'boolean',
        },
    },
    args: { onHandleExpand: fn() },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const defaultChildren = (
    <div>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor sagittis pulvinar. Morbi nec lectus odio. Curabitur
            venenatis nibh mollis, iaculis leo quis, cursus ipsum. Phasellus a pulvinar mi, in viverra lectus. Quisque sollicitudin nunc at
            placerat mattis. Etiam quis metus at purus vulputate tincidunt. Nam sodales nisi at pulvinar efficitur. Aliquam eu ultrices
            arcu.
        </p>
    </div>
);

export const TestExpandShow: Story = {
    name: 'Test: Show',
    args: {
        header: 'Lorem ipsum',
        children: defaultChildren,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Content is initially hidden', async () => {
            const content = canvas.queryByText('Lorem ipsum dolor sit amet', { exact: false });

            await expect(content).toBeNull();
        });

        await step('Show content', async () => {
            await userEvent.click(canvas.getByText('Show'));

            const content = canvas.queryByText('Lorem ipsum dolor sit amet', { exact: false });

            await expect(content).toBeVisible();
            await expect(args.onHandleExpand).toHaveBeenLastCalledWith(true);
        });
    },
};

export const TestExpandHide: Story = {
    name: 'Test: Hide',
    args: {
        header: 'Lorem ipsum',
        children: defaultChildren,
        initiallyExpanded: true,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Content is initially visible', async () => {
            const content = canvas.queryByText('Lorem ipsum dolor sit amet', { exact: false });

            await expect(content).toBeVisible();
        });

        await step('Hide content', async () => {
            await userEvent.click(canvas.getByText('Hide'));

            await sleep(ANIMATION_TIMEOUT);

            const content = canvas.queryByText('Lorem ipsum dolor sit amet', { exact: false });

            await expect(content).toBeNull();
            await expect(args.onHandleExpand).toHaveBeenLastCalledWith(false);
        });
    },
};
