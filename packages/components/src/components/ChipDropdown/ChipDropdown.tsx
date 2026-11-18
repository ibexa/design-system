import React, { useId, useState } from 'react';

import { Expander, ExpanderType } from '@ids-components/Expander';
import { ExtraParamsType, getNextFocusableItem } from '../Dropdown/utils/focus';
import { Icon, IconSize } from '@ids-components/Icon';
import { flattenDropdownItems, isDropdownItemGroup } from '@ids-partials/BaseDropdown';
import { ItemsContainer } from '@ids-partials/BaseDropdown/components/ItemsContainer';
import { createCssClassNames } from '@ids-core';
import { useKeyDown } from '@ids-hooks/useKeyEvent';
import { withStateValue } from '@ids-hoc/withStateValue';

import { ChipDropdownItem, ChipDropdownItemGroup, ChipDropdownProps, ChipDropdownSize } from './ChipDropdown.types';

const MAX_VISIBLE_ITEMS = 10;
const ICON_SIZE_MAPPING = {
    [ChipDropdownSize.Medium]: IconSize.TinySmall,
    [ChipDropdownSize.Small]: IconSize.Tiny,
};

export const ChipDropdown = ({
    name,
    className = '',
    disabled = false,
    icon = '',
    items = [],
    label = '',
    onChange = () => undefined,
    size = ChipDropdownSize.Medium,
    value = '',
    ...restProps
}: ChipDropdownProps) => {
    const panelId = useId();
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectedItem = flattenDropdownItems(items).find((item) => item.id === value) ?? null;
    const rootClassName = createCssClassNames({
        'ids-dropdown': true,
        'ids-dropdown--chip': true,
        [`ids-dropdown--chip-${size}`]: true,
        'ids-dropdown--disabled': disabled,
        [className]: !!className,
    });
    const toggleDropdown = () => {
        if (disabled) {
            return;
        }

        setIsOpen(!isOpen);
    };
    const isItemSelected = (item: ChipDropdownItem) => item.id === value;
    const renderItem = (item: ChipDropdownItem) => (
        <>
            <span className="ids-dropdown__item-label">{item.label}</span>
            {isItemSelected(item) && (
                <span aria-hidden="true" className="ids-dropdown__item-check">
                    <Icon name="form-check" size={IconSize.TinySmall} />
                </span>
            )}
        </>
    );
    const renderOption = (item: ChipDropdownItem) => (
        <option key={item.id} value={item.id}>
            {item.label}
        </option>
    );
    const renderOptionGroup = (group: ChipDropdownItemGroup, index: number) => (
        <optgroup key={`group-${group.id ?? index.toString()}`} label={group.label}>
            {flattenDropdownItems(group.items).map(renderOption)}
        </optgroup>
    );
    const getFocusableElements = ({ itemsList }: ExtraParamsType): HTMLElement[] =>
        Array.from(itemsList.querySelectorAll<HTMLElement>('.ids-dropdown__item:not(.ids-dropdown__item--selected)'));

    useKeyDown(
        ['Enter', ' '],
        (event) => {
            if (window.document.activeElement === referenceElement) {
                event.preventDefault();
                toggleDropdown();
            }
        },
        referenceElement,
    );

    return (
        <div className={rootClassName} {...restProps}>
            <div className="ids-dropdown__source">
                <select defaultValue={value} disabled={disabled} name={name} tabIndex={-1}>
                    {items.map((entry, index) => (isDropdownItemGroup(entry) ? renderOptionGroup(entry, index) : renderOption(entry)))}
                </select>
            </div>
            <div
                aria-controls={panelId}
                aria-disabled={disabled || undefined}
                aria-expanded={isOpen}
                className="ids-dropdown__widget"
                onClick={toggleDropdown}
                ref={setReferenceElement}
                role="button"
                tabIndex={disabled ? -1 : 0}
            >
                {icon && (
                    <span aria-hidden="true" className="ids-dropdown__icon">
                        <Icon name={icon} size={ICON_SIZE_MAPPING[size]} />
                    </span>
                )}
                {label && <div className="ids-dropdown__label">{label}</div>}
                <div className="ids-dropdown__selection-info">
                    <div className="ids-dropdown__selection-info-items">{selectedItem?.label ?? ''}</div>
                </div>
                <div className="ids-dropdown__expander">
                    <Expander isExpanded={isOpen} isFocusable={false} onClick={toggleDropdown} type={ExpanderType.Chevron} />
                </div>
            </div>
            <ItemsContainer
                closeDropdown={() => {
                    setIsOpen(false);
                }}
                containerAttributes={{ id: panelId }}
                filterFunction={(item, searchTerm) => item.label.toLowerCase().includes(searchTerm.toLowerCase())}
                getItemAttributes={() => ({})}
                getNextFocusableItem={getNextFocusableItem.bind(null, getFocusableElements)}
                hasSearch={false}
                isItemSelected={isItemSelected}
                isOpen={isOpen}
                items={items}
                maxVisibleItems={MAX_VISIBLE_ITEMS}
                onDropdownItemClick={(item, { closeDropdown }) => {
                    onChange(item.id);
                    closeDropdown();
                }}
                referenceElement={referenceElement}
                renderItem={renderItem}
            />
        </div>
    );
};

export const ChipDropdownStateful = withStateValue<ChipDropdownProps, string>(ChipDropdown);
