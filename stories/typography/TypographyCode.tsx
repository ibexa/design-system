import React from 'react';

import TypographyTable, { type TypographyRow } from './TypographyTable';

const CODE_FAMILY = 'JetBrains Mono';
const CODE_WEIGHT = 400;
const CODE_SIZES = [
    { lineHeight: 24, name: 'l', size: 16 },
    { lineHeight: 21, name: 'm', size: 14 },
    { lineHeight: 18, name: 's', size: 12 },
];

const TypographyCode = () => {
    const rows: TypographyRow[] = CODE_SIZES.map(({ lineHeight, name, size }) => ({
        className: `dev-code-${name}`,
        family: CODE_FAMILY,
        lineHeight,
        name: `code-${name}`,
        size,
        style: 'normal',
        weight: CODE_WEIGHT,
    }));

    return <TypographyTable caption="Code" rows={rows} />;
};

export default TypographyCode;
