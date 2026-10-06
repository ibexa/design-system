import React from 'react';

import { flattenDropdownItems, isDropdownItemGroup } from '../../utils/items';
import { createCssClassNames } from '@ids-core';

import { BaseDropdownEntry, BaseDropdownItem } from '../../BaseDropdown.types';
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

    const renderEntries = (entriesToRender: BaseDropdownEntry<T>[], idPrefix: string): React.ReactNode[] =>
        entriesToRender.map((entry, index) => {
            if (!isDropdownItemGroup(entry)) {
                return renderDropdownItem(entry);
            }

            if (flattenDropdownItems(entry.items).length === 0) {
                return null;
            }

            const groupId = entry.id ?? `${idPrefix}-group-${index}`;

            return (
                <li aria-labelledby={groupId} className="ids-dropdown__group" key={groupId} role="group">
                    <div className="ids-dropdown__group-label" id={groupId}>
                        {entry.label}
                    </div>
                    <ul className="ids-dropdown__group-items">{renderEntries(entry.items, groupId)}</ul>
                </li>
            );
        });

    return <>{renderEntries(entries, groupIdPrefix)}</>;
};
