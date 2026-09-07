import React, { useContext, useId, useState } from 'react';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { ExtraParamsType, getNextFocusableItem } from '../Dropdown/utils/focus';
import { Icon, IconSize } from '@ids-components/Icon';
import { CheckboxInput } from '@ids-components/Checkbox';
import { ItemsContainer } from '@ids-partials/BaseDropdown/components/ItemsContainer';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ids-core';
import { withStateValue } from '@ids-hoc/withStateValue';

import { FilterDropdownAction, FilterDropdownItem, FilterDropdownProps, FilterDropdownType } from './FilterDropdown.types';

const MAX_VISIBLE_ITEMS = 10;
const PANEL_MIN_WIDTH = 200;
const SINGLE_SELECTION_COUNT = 1;

export const FilterDropdown = ({
    label,
    name,
    className = '',
    disabled = false,
    hasSearch = true,
    items = [],
    onChange = () => undefined,
    type = FilterDropdownType.Default,
    value = [],
    ...restProps
}: FilterDropdownProps) => {
    const Translator = useContext(TranslatorContext);
    const panelId = useId();
    const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const selectedItems = items.filter((item) => value.includes(item.id));
    const hasSelection = selectedItems.length > 0;
    const isIconOnly = type === FilterDropdownType.MoreFiltersSmall;
    const hasTriggerIcon = type === FilterDropdownType.MoreFilters || isIconOnly;
    const hasChevron = type === FilterDropdownType.Default || type === FilterDropdownType.Dashboard;
    const showsValue = type === FilterDropdownType.Dashboard && selectedItems.length === SINGLE_SELECTION_COUNT;
    const rootClassName = createCssClassNames({
        'ids-dropdown': true,
        'ids-dropdown--disabled': disabled,
        'ids-dropdown--filter': true,
        [`ids-dropdown--filter-${type}`]: true,
        'ids-dropdown--open': isOpen,
        'ids-dropdown--selected': hasSelection,
        [className]: !!className,
    });
    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };
    const changeValue = (id: string) => {
        const isSelected = value.includes(id);
        const newValue = isSelected ? value.filter((selectedValue) => selectedValue !== id) : [...value, id];

        onChange(newValue, id, isSelected ? FilterDropdownAction.Uncheck : FilterDropdownAction.Check);
    };
    const clearValue = () => {
        onChange([], '', FilterDropdownAction.Clear);
    };
    const isItemSelected = (item: FilterDropdownItem) => value.includes(item.id);
    const getItemAttributes = () => ({
        role: undefined,
        tabIndex: undefined,
    });
    const renderItem = (item: FilterDropdownItem) => (
        <>
            <CheckboxInput checked={isItemSelected(item)} name={`${name}-checkbox`} value={item.id} />
            <span className="ids-dropdown__item-label">{item.label}</span>
        </>
    );
    const renderFooter = () => (
        <div className="ids-dropdown__footer">
            <hr className="ids-dropdown__divider" />
            <Button disabled={!hasSelection} icon="discard" onClick={clearValue} size={ButtonSize.Small} type={ButtonType.TertiaryAlt}>
                {Translator.trans(/*@Desc("Clear")*/ 'ids.filter_dropdown.clear.label')}
            </Button>
        </div>
    );
    const getFocusableElements = ({ itemsList, search }: ExtraParamsType): HTMLElement[] => {
        const checkboxes = Array.from(itemsList.querySelectorAll<HTMLElement>('.ids-dropdown__item .ids-input--checkbox'));
        const clearBtn = itemsList.parentElement?.querySelector<HTMLElement>('.ids-dropdown__footer .ids-btn');

        return [...(search instanceof HTMLElement ? [search] : []), ...checkboxes, ...(clearBtn ? [clearBtn] : [])];
    };

    return (
        <div className={rootClassName} {...restProps}>
            <div className="ids-dropdown__source">
                <select defaultValue={value} multiple name={name} tabIndex={-1}>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>
            <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label={isIconOnly ? label : undefined}
                className="ids-dropdown__trigger"
                disabled={disabled}
                onClick={toggleDropdown}
                ref={setReferenceElement}
                type="button"
            >
                {hasTriggerIcon && (
                    <span aria-hidden="true" className="ids-dropdown__trigger-icon">
                        <Icon name="filters" size={IconSize.Small} />
                    </span>
                )}
                {!isIconOnly && <span className="ids-dropdown__trigger-label">{showsValue ? `${label}:` : label}</span>}
                {showsValue && <span className="ids-dropdown__value">{selectedItems[0].label}</span>}
                {hasSelection && !showsValue && <span className="ids-dropdown__counter">{selectedItems.length}</span>}
                {hasChevron && (
                    <span aria-hidden="true" className="ids-dropdown__chevron">
                        <Icon name="arrow-chevron-down" size={IconSize.TinySmall} />
                    </span>
                )}
            </button>
            <ItemsContainer
                closeDropdown={() => {
                    setIsOpen(false);
                }}
                containerAttributes={{ 'aria-label': label, id: panelId, role: 'group' }}
                filterFunction={(item, searchTerm) => item.label.toLowerCase().includes(searchTerm.toLowerCase())}
                getItemAttributes={getItemAttributes}
                getNextFocusableItem={getNextFocusableItem.bind(null, getFocusableElements)}
                hasSearch={hasSearch}
                isItemSelected={isItemSelected}
                isOpen={isOpen}
                items={items}
                maxVisibleItems={MAX_VISIBLE_ITEMS}
                minWidth={PANEL_MIN_WIDTH}
                onDropdownItemClick={(item) => {
                    changeValue(item.id);
                }}
                referenceElement={referenceElement}
                renderFooter={renderFooter}
                renderItem={renderItem}
            />
        </div>
    );
};

export const FilterDropdownStateful = withStateValue<FilterDropdownProps, string[]>(FilterDropdown);
