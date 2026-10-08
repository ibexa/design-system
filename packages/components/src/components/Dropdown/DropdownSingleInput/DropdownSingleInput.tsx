import React from 'react';

import {
    BaseDropdown,
    BaseDropdownItemGroup,
    ExtraDropdownItemClickParamsType,
    flattenDropdownItems,
    isDropdownItemGroup,
} from '@ids-partials/BaseDropdown';
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
    const flatItems = flattenDropdownItems(items);
    const selectedItem = flatItems.find((item) => item.id === value) ?? null;
    const isItemSelected = (item: DropdownSingleInputItem) => item.id === value;
    const renderItem = (item: DropdownSingleInputItem) => {
        return (
            <>
                <span className="ids-dropdown__item-label">{item.label}</span>
                {isItemSelected(item) && <Icon name="check-circle" size={IconSize.TinySmall} />}
            </>
        );
    };
    const renderOption = (item: DropdownSingleInputItem) => (
        <option key={item.id} value={item.id}>
            {item.label}
        </option>
    );
    const renderOptionGroup = (group: BaseDropdownItemGroup<DropdownSingleInputItem>, index: number) => (
        <optgroup key={`group-${group.id ?? index.toString()}`} label={group.label}>
            {flattenDropdownItems(group.items).map(renderOption)}
        </optgroup>
    );
    const renderSource = () => {
        return (
            <select defaultValue={value} name={name} tabIndex={-1}>
                {items.map((entry, index) => (isDropdownItemGroup(entry) ? renderOptionGroup(entry, index) : renderOption(entry)))}
            </select>
        );
    };
    const getFocusableElements = ({ itemsList, search }: ExtraParamsType): HTMLElement[] => {
        const focusableElements = [
            ...(search ? [search] : []),
            ...Array.from(itemsList.querySelectorAll('.ids-dropdown__item')).filter(
                (child) => !child.classList.contains('ids-dropdown__item--selected'),
            ),
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
