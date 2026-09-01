import React from 'react';

const TypographyBase = () => {
    const sentence = 'The quick brown fox jumps over the lazy dog';
    const fontSizesBase = [
        { lineHeight: 30, name: '2xl', size: 20 },
        { lineHeight: 28, name: 'xl', size: 18 },
        { lineHeight: 24, name: 'l', size: 16 },
        { lineHeight: 21, name: 'm', size: 14 },
        { lineHeight: 18, name: 's', size: 12 },
        { lineHeight: 15, name: 'xs', size: 10 },
    ];
    const fontSizesHighlighted = [
        { lineHeight: 72, name: '6xl', size: 48 },
        { lineHeight: 60, name: '5xl', size: 40 },
        { lineHeight: 48, name: '4xl', size: 32 },
        { lineHeight: 36, name: '3xl', size: 24 },
        { lineHeight: 24, name: 'xl', size: 16 },
        { lineHeight: 22.5, name: 'l', size: 15 },
        { lineHeight: 21, name: 'm', size: 14 },
        { lineHeight: 18, name: 's', size: 12 },
    ];
    const fontWeights = [
        { name: 'normal', weight: '400' },
        { name: 'semi', weight: '600' },
    ];
    const fontStyles = [
        { name: 'normal', style: 'normal' },
        { name: 'italic', style: 'italic' },
    ];
    const renderRow = (className: string, name: string, style: string, weight: string, size: number, lineHeight: number) => {
        return (
            <tr className="ids-table__row" key={className}>
                <td className="ids-table__cell">
                    <span className={className}>{sentence}</span>
                </td>
                <td className="ids-table__cell">{name}</td>
                <td className="ids-table__cell">{style}</td>
                <td className="ids-table__cell">{weight}</td>
                <td className="ids-table__cell">{size}px</td>
                <td className="ids-table__cell">{lineHeight}px</td>
            </tr>
        );
    };

    return (
        <table className="ids-table">
            <caption className="ids-table__caption">Base font</caption>
            <thead className="ids-table__header">
                <tr className="ids-table__row">
                    <th className="ids-table__header-cell">Sentence</th>
                    <th className="ids-table__header-cell">Name</th>
                    <th className="ids-table__header-cell">Style</th>
                    <th className="ids-table__header-cell">Weight</th>
                    <th className="ids-table__header-cell">Size</th>
                    <th className="ids-table__header-cell">Line-height</th>
                </tr>
            </thead>
            <tbody className="ids-table__body">
                {fontWeights.map(({ name: weightName, weight }) => {
                    return fontStyles.map(({ name: styleName, style }) => {
                        return fontSizesBase.map(({ name: sizeName, size, lineHeight }) => {
                            return renderRow(`base-${sizeName}-${weightName}-${styleName}`, 'Mulish', style, weight, size, lineHeight);
                        });
                    });
                })}
                {fontSizesHighlighted.map(({ name: sizeName, size, lineHeight }) => {
                    return renderRow(`highlighted-${sizeName}`, 'Manrope', 'normal', '600', size, lineHeight);
                })}
            </tbody>
        </table>
    );
};

export default TypographyBase;
