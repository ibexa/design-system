import React from 'react';

import { BaseDropdown, ExtraDropdownItemClickParamsType } from '@ids-partials/BaseDropdown';
import { ExtraParamsType, getNextFocusableItem } from '../utils/focus';
import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';
import { withStateValue } from '@ids-hoc/withStateValue';

import { DropdownSingleInputItem, DropdownSingleInputProps } from './DropdownSingleInput.types';

export const DropdownSingleInput = ({
    name,
    className = '',
    items = [],
    onChange = () => undefined,
    value = '',
    ...restProps
}: DropdownSingleInputProps) => {
    const dropdownClassName = createCssClassNames({
        'ids-dropdown--single': true,
        [className]: !!className,
    });
    const clickDropdownItem = ({ id }: DropdownSingleInputItem, { closeDropdown }: ExtraDropdownItemClickParamsType) => {
        onChange(id);
        closeDropdown();
    };
    const selectedItem = value ? items.find((item) => item.id === value) : null;
    const isItemSelected = (item: DropdownSingleInputItem) => item.id === value;
    const renderItem = (item: DropdownSingleInputItem) => {
        return (
            <>
                {item.label}
                {isItemSelected(item) && <Icon name="check-circle" size={IconSize.TinySmall} />}
            </>
        );
    };
    const renderSource = () => {
        return (
            <select defaultValue={value} name={name} tabIndex={-1}>
                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.label}
                    </option>
                ))}
            </select>
        );
    };
    const getFocusableElements = ({ itemsList, search }: ExtraParamsType): HTMLElement[] => {
        const focusableElements = [
            ...(search ? [search] : []),
            ...Array.from(itemsList.children).filter((child) => !child.classList.contains('ids-dropdown__item--selected')),
        ];

        return focusableElements.filter((element): element is HTMLElement => element instanceof HTMLElement);
    };

    return (
        <BaseDropdown
            {...restProps}
            className={dropdownClassName}
            getNextFocusableItem={getNextFocusableItem.bind(null, getFocusableElements)}
            isEmpty={!selectedItem}
            isItemSelected={isItemSelected}
            items={items}
            onDropdownItemClick={clickDropdownItem}
            renderItem={renderItem}
            renderSelectedItems={() => selectedItem?.label ?? ''}
            renderSource={renderSource}
        />
    );
};

export const DropdownSingleInputStateful = withStateValue<DropdownSingleInputProps, string>(DropdownSingleInput);
