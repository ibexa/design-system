import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import TypographyBody from './TypographyBody';
import TypographyCode from './TypographyCode';
import TypographyHeaders from './TypographyHeaders';
import TypographyHighlighted from './TypographyHighlighted';

import './typography.styles.scss';

const Typography = () => {
    return (
        <div className="dev-typography-container">
            <TypographyHeaders />
            <TypographyHighlighted />
            <TypographyBody />
            <TypographyCode />
        </div>
    );
};

const meta: Meta<typeof Typography> = {
    component: Typography,
    parameters: {
        layout: 'padded',
    },
    tags: [],
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
    name: 'Default',
};
