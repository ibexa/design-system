import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../packages/components/src/Icon';
import iconsList from '../packages/assets/src/img/all-icons.json';

const IconsList = () => {
    const [searchValue, setSearchValue] = useState('');
    const iconsRows = iconsList
        .filter((iconName) => searchValue === '' || iconName.includes(searchValue))
        .map((iconName) => {
            return (
                <tr key={iconName} className="ids-table__row">
                    <td className="ids-table__cell">
                        <Icon name={iconName} size="large" />
                    </td>
                    <td className="ids-table__cell">
                        {iconName}
                    </td>
                </tr>
            )
        });

    return (
        <div>
            <input 
                type="text" 
                className="ids-input ids-input--text"
                placeholder="Search icons..." 
                onChange={(e) => setSearchValue(e.target.value)} 
            />
            <table className="ids-table">
                <tbody className="ids-table__body">
                    {iconsRows}
                </tbody>
            </table>
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