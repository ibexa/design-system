import React from 'react';

import TypographyTable, { type TypographyRow } from './TypographyTable';

const BODY_FAMILY = 'Mulish';
const BODY_SIZES = [
    { lineHeight: 27, name: 'xl', size: 18 },
    { lineHeight: 24, name: 'l', size: 16 },
    { lineHeight: 21, name: 'm', size: 14 },
    { lineHeight: 18, name: 's', size: 12 },
    { lineHeight: 15, name: 'xs', size: 10 },
];
const BODY_VARIANTS = [
    { caption: 'Body Regular', name: 'regular', style: 'normal', weight: 400 },
    { caption: 'Body Italic', name: 'italic', style: 'italic', weight: 400 },
    { caption: 'Body Semibold', name: 'semibold', style: 'normal', weight: 600 },
    { caption: 'Body Semibold Italic', name: 'semibold-italic', style: 'italic', weight: 600 },
];

const TypographyBody = () => {
    return (
        <>
            {BODY_VARIANTS.map(({ caption, name: variantName, style, weight }) => {
                const rows: TypographyRow[] = BODY_SIZES.map(({ lineHeight, name: sizeName, size }) => ({
                    className: `dev-body-${sizeName}-${variantName}`,
                    family: BODY_FAMILY,
                    lineHeight,
                    name: `body-${sizeName}`,
                    size,
                    style,
                    weight,
                }));

                return <TypographyTable caption={caption} key={variantName} rows={rows} />;
            })}
        </>
    );
};

export default TypographyBody;
