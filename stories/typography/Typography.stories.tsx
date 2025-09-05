import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import TypographyBase from './TypographyBase';
import TypographyHeaders from './TypographyHeaders';
import TypographyLinks from './TypographyLinks';

import './typography.styles.scss';

const Typography = () => {
    return (
        <div className="dev-typography-container">
            <TypographyHeaders />
            <TypographyBase />
            <TypographyLinks />
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
