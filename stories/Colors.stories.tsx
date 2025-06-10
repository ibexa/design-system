import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import colors from '!!raw-loader!../packages/assets/src/scss/variables/_colors.scss';

const colorsList = colors
    .split('\n')
    .map((line: string) => {
        const [name, hex] = line.split(/:\s*|\s+/).map((item) => item.trim());

        if (!name || !hex.startsWith('#')) {
            return undefined;
        }

        return {
            name: name.replace('$color-', ''),
            hex,
        };
    })
    .filter((item) => item !== undefined);

// TODO: remove temporary styles when scss is available

const ColorsList = () => {
    const [searchValue, setSearchValue] = useState('');
    const iconsRows = colorsList
        .filter(({ name }) => searchValue === '' || name.includes(searchValue))
        .map(({ name, hex }) => {
            return (
                <tr className="ids-table__row" key={name}>
                    <td className="ids-table__cell" style={{ padding: '10px' }}>
                        {name}
                    </td>
                    <td className="ids-table__cell" style={{ padding: '10px' }}>
                        {hex}
                    </td>
                    <td className="ids-table__cell" style={{ padding: 0 }}>
                        <div
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: hex,
                            }}
                        />
                    </td>
                </tr>
            );
        });

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <input
                    className="ids-input ids-input--text"
                    onChange={(event) => {
                        setSearchValue(event.target.value);
                    }}
                    placeholder="Search colors..."
                    style={{ marginBottom: '10px' }}
                    type="text"
                />
                <table border={1} className="ids-table">
                    <tbody className="ids-table__body">{iconsRows}</tbody>
                </table>
            </div>
        </div>
    );
};

const meta: Meta<typeof ColorsList> = {
    component: ColorsList,
    parameters: {
        layout: 'padded',
    },
    tags: [],
};

export default meta;

type Story = StoryObj<typeof ColorsList>;

export const Default: Story = {
    name: 'Default',
};
