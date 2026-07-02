import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import type { MouseEvent } from 'react';

import { Link, LinkType, LinkVariant } from './';

const onClick = fn((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
});

const meta: Meta<typeof Link> = {
    component: Link,
    tags: ['!dev'],
    args: {
        href: 'https://example.com',
        children: 'Link label',
        onClick,
    },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const TestButtonVariant: Story = {
    name: 'Button variant clickable',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.Primary,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Link has correct button classes and is clickable', async () => {
            const link = canvas.getByRole('link');

            await expect(link).toHaveAttribute('href', 'https://example.com');
            await expect(link).toHaveClass('ids-btn');
            await expect(link).toHaveClass('ids-btn--primary');

            await userEvent.click(link);

            if (args.onClick) {
                await expect(args.onClick).toHaveBeenCalledOnce();
            }
        });
    },
};

export const TestTextVariant: Story = {
    name: 'Text variant clickable',
    args: {
        variant: LinkVariant.Text,
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Link has correct text link class and is clickable', async () => {
            const link = canvas.getByRole('link');

            await expect(link).toHaveAttribute('href', 'https://example.com');
            await expect(link).toHaveClass('ids-link');
            await expect(link).not.toHaveClass('ids-btn');

            await userEvent.click(link);

            if (args.onClick) {
                await expect(args.onClick).toHaveBeenCalledOnce();
            }
        });
    },
};

export const TestExternalLinkSecurity: Story = {
    name: 'External link security',
    args: {
        variant: LinkVariant.Text,
        target: '_blank',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Link with target="_blank" has rel="noopener noreferrer"', async () => {
            const link = canvas.getByRole('link');

            await expect(link).toHaveAttribute('target', '_blank');
            await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    },
};

export const TestExternalLinkWithExplicitRel: Story = {
    name: 'External link with explicit rel',
    args: {
        variant: LinkVariant.Text,
        target: '_blank',
        rel: 'external',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Link with explicit rel preserves it', async () => {
            const link = canvas.getByRole('link');

            await expect(link).toHaveAttribute('target', '_blank');
            await expect(link).toHaveAttribute('rel', 'external');
        });
    },
};

export const TestButtonVariantIconUrl: Story = {
    name: 'Button variant icon URL',
    args: {
        variant: LinkVariant.Button,
        type: LinkType.TertiaryAlt,
        iconUrl: '/assets/icons.svg#calendar-schedule',
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Link button renders icon URL in icon slot', async () => {
            const link = canvas.getByRole('link');
            const iconUse = link.querySelector('.ids-btn__icon use');

            await expect(iconUse).not.toBeNull();
            await expect(iconUse).toHaveAttribute('xlink:href', '/assets/icons.svg#calendar-schedule');
        });
    },
};
