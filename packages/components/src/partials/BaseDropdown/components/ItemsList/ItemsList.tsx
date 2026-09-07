import React from 'react';

import { createCssClassNames } from '@ids-core';
import { isDropdownItemGroup } from '../../utils/items';

import { BaseDropdownItem } from '../../BaseDropdown.types';
import { ItemsListProps } from './ItemsList.types';

export const ItemsList = <T extends BaseDropdownItem>({
    entries,
    firstFocusableItemId,
    getItemAttributes,
    groupIdPrefix,
    isItemSelected,
    onItemClick,
    renderItem,
}: ItemsListProps<T>) => {
    const renderDropdownItem = (item: T) => {
        const dropdownItemClassName = createCssClassNames({
            'ids-dropdown__item': true,
            'ids-dropdown__item--selected': isItemSelected(item),
        });

        return (
            <li
                className={dropdownItemClassName}
                key={item.id}
                onClick={() => {
                    onItemClick(item);
                }}
                ref={(node) => {
                    if (item.id === firstFocusableItemId && node) {
                        node.focus();
                    }
                }}
                role="button"
                tabIndex={0}
                {...getItemAttributes(item)}
            >
                {renderItem(item)}
            </li>
        );
    };

    return (
        <>
            {entries.map((entry, index) => {
                if (!isDropdownItemGroup(entry)) {
                    return renderDropdownItem(entry);
                }

                if (entry.items.length === 0) {
                    return null;
                }

                const groupId = entry.id ?? `${groupIdPrefix}-group-${index}`;

                return (
                    <li aria-labelledby={groupId} className="ids-dropdown__group" key={groupId} role="group">
                        <div className="ids-dropdown__group-label" id={groupId}>
                            {entry.label}
                        </div>
                        <ul className="ids-dropdown__group-items">{entry.items.map(renderDropdownItem)}</ul>
                    </li>
                );
            })}
        </>
    );
};
