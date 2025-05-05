import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
    component: Accordion,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        initiallyExpanded: {
            control: 'boolean',
        },
    },
    args: { onHandleExpand: action('on-click') },
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
        <p>
            Vivamus blandit dignissim lectus, sit amet posuere ligula pulvinar eget. Suspendisse nec congue odio. Praesent facilisis, velit
            at consectetur scelerisque, lacus justo consectetur ligula, at ultricies sapien ipsum et turpis. Proin purus tellus, pulvinar
            sit amet cursus id, ultrices nec dolor. Sed tincidunt, sapien id ullamcorper mollis, dui odio accumsan purus, sagittis feugiat
            nisl felis id risus. Vivamus sagittis metus interdum, feugiat lacus quis, vestibulum sem. In sem arcu, viverra a nisl quis,
            tempus blandit risus. Nulla a massa lobortis, efficitur augue eu, rutrum urna. Nulla facilisi. Suspendisse ac dui vehicula,
            mollis orci vel, tincidunt urna. Nullam suscipit nibh dolor. Donec iaculis finibus tellus at pretium. In pretium nisi ac mattis
            semper. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
    </div>
);

export const Default: Story = {
    name: 'Default',
    args: {
        header: 'Lorem ipsum',
        children: defaultChildren,
    },
};

export const InitiallyExpanded: Story = {
    name: 'Initially Expanded',
    args: {
        header: 'Lorem ipsum',
        children: defaultChildren,
        initiallyExpanded: true,
    },
};
