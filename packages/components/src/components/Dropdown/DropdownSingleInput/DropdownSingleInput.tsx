import React, { useContext } from 'react';

import { BASE_DROPDOWN_CLASS, BaseDropdown } from '@ids-partials/BaseDropdown';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
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
    const Translator = useContext(TranslatorContext);
    const dropdownClassName = createCssClassNames({
        'ids-dropdown--single': true,
        [className]: !!className,
    });
    const clickDropdownItem = ({ id }: DropdownSingleInputItem) => {
        onChange(id);
    };
    const isItemSelected = (item: DropdownSingleInputItem) => item.id === value;
    const renderItem = (item: DropdownSingleInputItem) => {
        return item.label;
    };
    const renderSelectedInfo = () => {
        const selectedItem = value ? items.find((item) => item.id === value) : null;

        if (!selectedItem) {
            const placeholder = Translator.trans(/*@Desc("Select an item")*/ 'ids.dropdown.placeholder');

            return <div className={BASE_DROPDOWN_CLASS.PLACEHOLDER}>{placeholder}</div>;
        }

        return <div className={BASE_DROPDOWN_CLASS.SELECTION_INFO_ITEMS}>{selectedItem.label}</div>;
    };
    const renderSource = () => {
        return (
            <select name={name} tabIndex={-1} value={value}>
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
            isItemSelected={isItemSelected}
            items={items}
            onDropdownItemClick={clickDropdownItem}
            renderItem={renderItem}
            renderSource={renderSource}
        >
            {renderSelectedInfo()}
        </BaseDropdown>
    );
};

export const DropdownSingleInputStateful = withStateValue<DropdownSingleInputProps, string | number>(DropdownSingleInput);
