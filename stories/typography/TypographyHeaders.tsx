import React from 'react';

const TypographyHeaders = () => {
    const sentence = 'The quick brown fox jumps over the lazy dog';
    const headers = [
        { content: <h1>{sentence}</h1>, lineHeight: 36, name: 'h1', size: 24 },
        { content: <h2>{sentence}</h2>, lineHeight: 30, name: 'h2', size: 20 },
        { content: <h3>{sentence}</h3>, lineHeight: 28, name: 'h3', size: 18 },
        { content: <h4>{sentence}</h4>, lineHeight: 24, name: 'h4', size: 16 },
        { content: <h5>{sentence}</h5>, lineHeight: 21, name: 'h5', size: 14 },
        { content: <h6>{sentence}</h6>, lineHeight: 18, name: 'h6', size: 12 },
    ];

    return (
        <table className="ids-table">
            <caption className="ids-table__caption">Header</caption>
            <thead className="ids-table__header">
                <tr className="ids-table__row">
                    <th className="ids-table__header-cell">Sentence</th>
                    <th className="ids-table__header-cell">Tag</th>
                    <th className="ids-table__header-cell">Name</th>
                    <th className="ids-table__header-cell">Style</th>
                    <th className="ids-table__header-cell">Weight</th>
                    <th className="ids-table__header-cell">Size</th>
                    <th className="ids-table__header-cell">Line-height</th>
                </tr>
            </thead>
            <tbody className="ids-table__body">
                {headers.map(({ name, content, size, lineHeight }) => {
                    return (
                        <tr className="ids-table__row" key={name}>
                            <td className="ids-table__cell">{content}</td>
                            <td className="ids-table__cell">{name}</td>
                            <td className="ids-table__cell">Work sans</td>
                            <td className="ids-table__cell">normal</td>
                            <td className="ids-table__cell">semi-bold</td>
                            <td className="ids-table__cell">{size}px</td>
                            <td className="ids-table__cell">{lineHeight}px</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TypographyHeaders;
