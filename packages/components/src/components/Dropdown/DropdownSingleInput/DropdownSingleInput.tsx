import React, { useRef } from 'react';

import { BASE_DROPDOWN_CLASS, BaseDropdown, BaseDropdownRef } from '@ids-partials/BaseDropdown';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateValue from '@ids-hoc/withStateValue';

import { DropdownSingleInputItem, DropdownSingleInputProps } from './DropdownSingleInput.types';

export const DropdownSingleInput = ({
    className = '',
    items = [],
    onChange = () => undefined,
    value = '',
    ...restProps
}: DropdownSingleInputProps) => {
    const baseDropdownRef = useRef<BaseDropdownRef>(null);
    const dropdownClassName = createCssClassNames({
        'ids-dropdown--single': true,
        [className]: true,
    });
    const clickDropdownItem = ({ id }: DropdownSingleInputItem) => {
        onChange(id);
        baseDropdownRef.current?.closeDropdown();
    };
    const renderItems = (itemsToRender: DropdownSingleInputItem[]) => (
        <>
            {itemsToRender.map((item, index) => {
                const dropdownItemClassName = createCssClassNames({
                    [BASE_DROPDOWN_CLASS.ITEM]: true,
                    [`${BASE_DROPDOWN_CLASS.ITEM}--selected`]: item.id === value,
                });

                return (
                    <li
                        className={dropdownItemClassName}
                        key={item.id}
                        onClick={clickDropdownItem.bind(null, item)}
                        ref={(node) => {
                            const hasSearchInput = baseDropdownRef.current?.hasSearchInput() ?? false;
                            if (index === 0 && !hasSearchInput && node) {
                                node.focus();
                            }
                        }}
                        role="button"
                        tabIndex={0}
                    >
                        {item.label}
                    </li>
                );
            })}
        </>
    );
    const renderSelectedInfo = () => {
        const selectedItem = value ? items.find((item) => item.id === value) : null;

        if (!selectedItem) {
            return <div className={BASE_DROPDOWN_CLASS.PLACEHOLDER}>Select an item</div>;
        }

        return <div>{selectedItem.label}</div>;
    };

    return (
        <BaseDropdown {...restProps} className={dropdownClassName} items={items} ref={baseDropdownRef} renderItems={renderItems}>
            {renderSelectedInfo()}
        </BaseDropdown>
    );
};

export const DropdownSingleInputStateful = withStateValue<DropdownSingleInputProps, string | number>(DropdownSingleInput);
