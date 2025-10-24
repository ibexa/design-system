import React from 'react';

import { ExtraParamsType, getNextFocusableItem } from '../utils/focus';
import { BaseDropdown } from '@ids-partials/BaseDropdown';
import { CheckboxInput } from '@ids-components/Checkbox';
import { createCssClassNames } from '@ids-core';
import { withStateValue } from '@ids-hoc/withStateValue';

import { DropdownMultiInputAction, DropdownMultiInputItem, DropdownMultiInputProps } from './DropdownMultiInput.types';

export const DropdownMultiInput = ({
    name,
    className = '',
    items = [],
    onChange = () => undefined,
    value = [],
    ...restProps
}: DropdownMultiInputProps) => {
    const dropdownClassName = createCssClassNames({
        'ids-dropdown--multi': true,
        [className]: !!className,
    });
    const changeValue = (id: string) => {
        const oldValueLength = value.length;
        const newValue = value.includes(id) ? value.filter((val) => val !== id) : [...value, id];
        const actionPerformed = newValue.length > oldValueLength ? DropdownMultiInputAction.Check : DropdownMultiInputAction.Uncheck;

        onChange(newValue, id, actionPerformed);
    };
    const clickDropdownItem = ({ id }: DropdownMultiInputItem) => {
        changeValue(id);
    };
    const getItemAttributes = () => {
        return {
            role: undefined,
            tabIndex: undefined,
        };
    };
    const isItemSelected = (item: DropdownMultiInputItem) => value.includes(item.id);
    const renderItem = (item: DropdownMultiInputItem) => {
        return (
            <>
                <CheckboxInput checked={isItemSelected(item)} name={`${name}-checkbox`} value={item.id} />
                {item.label}
            </>
        );
    };
    const selectedItems = value.length ? items.filter((item) => value.includes(item.id)) : [];
    const renderSelectedItems = () => (
        <>{selectedItems.map((item) => item.label).join(', ')}</>
        // TODO: replace with chips when done
    );
    const renderSource = () => {
        return (
            <select defaultValue={value} multiple name={name} tabIndex={-1}>
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
            ...(search instanceof HTMLElement ? [search] : []),
            ...Array.from(itemsList.children).reduce((acc: HTMLElement[], child) => {
                if (child instanceof HTMLElement) {
                    const checkbox = child.querySelector('.ids-input--checkbox');

                    if (checkbox instanceof HTMLElement && !checkbox.classList.contains('ids-input--disabled')) {
                        acc.push(checkbox);
                    }
                }

                return acc;
            }, []),
        ];

        return focusableElements;
    };

    return (
        <BaseDropdown
            {...restProps}
            className={dropdownClassName}
            getItemAttributes={getItemAttributes}
            getNextFocusableItem={getNextFocusableItem.bind(null, getFocusableElements)}
            isEmpty={selectedItems.length === 0}
            isItemSelected={isItemSelected}
            items={items}
            onDropdownItemClick={clickDropdownItem}
            renderItem={renderItem}
            renderSelectedItems={renderSelectedItems}
            renderSource={renderSource}
        />
    );
};

export const DropdownMultiInputStateful = withStateValue<DropdownMultiInputProps, string[]>(DropdownMultiInput);
