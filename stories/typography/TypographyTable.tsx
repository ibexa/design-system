import React from 'react';

export interface TypographyRow {
    className: string;
    family: string;
    lineHeight: number;
    name: string;
    size: number;
    style: string;
    weight: number;
}

interface TypographyTableProps {
    caption: string;
    rows: TypographyRow[];
}

const SENTENCE = 'The quick brown fox jumps over the lazy dog';

const TypographyTable = ({ caption, rows }: TypographyTableProps) => {
    return (
        <table className="ids-table">
            <caption className="ids-table__caption">{caption}</caption>
            <thead className="ids-table__header">
                <tr className="ids-table__row">
                    <th className="ids-table__header-cell">Sentence</th>
                    <th className="ids-table__header-cell">Name</th>
                    <th className="ids-table__header-cell">Family</th>
                    <th className="ids-table__header-cell">Style</th>
                    <th className="ids-table__header-cell">Weight</th>
                    <th className="ids-table__header-cell">Size</th>
                    <th className="ids-table__header-cell">Line-height</th>
                </tr>
            </thead>
            <tbody className="ids-table__body">
                {rows.map(({ className, family, lineHeight, name, size, style, weight }) => {
                    return (
                        <tr className="ids-table__row" key={className}>
                            <td className="ids-table__cell">
                                <span className={className}>{SENTENCE}</span>
                            </td>
                            <td className="ids-table__cell">{name}</td>
                            <td className="ids-table__cell">{family}</td>
                            <td className="ids-table__cell">{style}</td>
                            <td className="ids-table__cell">{weight}</td>
                            <td className="ids-table__cell">{size}px</td>
                            <td className="ids-table__cell">{lineHeight}px</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TypographyTable;
