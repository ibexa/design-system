import React from 'react';

import { BaseDropdown, ExtraDropdownItemClickParamsType } from '@ids-partials/BaseDropdown';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';
import withStateValue from '@ids-hoc/withStateValue';

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

    return (
        <BaseDropdown
            {...restProps}
            className={dropdownClassName}
            isEmpty={!selectedItem}
            isItemSelected={isItemSelected}
            items={items}
            onDropdownItemClick={clickDropdownItem}
            renderSelectedItems={() => selectedItem?.label ?? ''}
            renderSource={renderSource}
        />
    );
};

export const DropdownSingleInputStateful = withStateValue<DropdownSingleInputProps, string>(DropdownSingleInput);
