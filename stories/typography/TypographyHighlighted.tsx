import React from 'react';

import TypographyTable, { type TypographyRow } from './TypographyTable';

const HIGHLIGHTED_FAMILY = 'Manrope';
const HIGHLIGHTED_WEIGHT = 600;
const HIGHLIGHTED_SIZES = [
    { lineHeight: 72, name: '6xl', size: 48 },
    { lineHeight: 60, name: '5xl', size: 40 },
    { lineHeight: 48, name: '4xl', size: 32 },
    { lineHeight: 36, name: '3xl', size: 24 },
    { lineHeight: 27, name: '2xl', size: 18 },
    { lineHeight: 24, name: 'xl', size: 16 },
    { lineHeight: 22.5, name: 'l', size: 15 },
    { lineHeight: 21, name: 'm', size: 14 },
    { lineHeight: 18, name: 's', size: 12 },
];

const TypographyHighlighted = () => {
    const rows: TypographyRow[] = HIGHLIGHTED_SIZES.map(({ lineHeight, name, size }) => ({
        className: `dev-highlighted-${name}`,
        family: HIGHLIGHTED_FAMILY,
        lineHeight,
        name: `highlighted-${name}`,
        size,
        style: 'normal',
        weight: HIGHLIGHTED_WEIGHT,
    }));

    return <TypographyTable caption="Highlighted" rows={rows} />;
};

export default TypographyHighlighted;
