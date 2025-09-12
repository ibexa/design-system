import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Icon, IconSize } from '../packages/components/src/components/Icon';
import iconsList from '../packages/assets/src/img/all-icons.json';

// TODO: remove temporary styles when scss is available

const IconsList = () => {
    const [searchValue, setSearchValue] = useState('');
    const iconsRows = iconsList
        .filter((iconName) => searchValue === '' || iconName.includes(searchValue))
        .map((iconName) => {
            return (
                <tr className="ids-table__row" key={iconName}>
                    <td className="ids-table__cell" style={{ padding: '10px' }}>
                        <Icon name={iconName} size={IconSize.Large} />
                    </td>
                    <td className="ids-table__cell" style={{ padding: '10px' }}>
                        {iconName}
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
                    placeholder="Search icons..."
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

const meta: Meta<typeof IconsList> = {
    component: IconsList,
    parameters: {
        layout: 'padded',
    },
    tags: [],
};

export default meta;

type Story = StoryObj<typeof IconsList>;

export const Default: Story = {
    name: 'Default',
};
