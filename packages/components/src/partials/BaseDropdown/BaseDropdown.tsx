import React, { useContext, useState } from 'react';

import { Expander, ExpanderType } from '@ids-components/Expander';
import { Icon, IconSize } from '@ids-components/Icon';
import { ItemsContainer } from './components/ItemsContainer';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ids-core';
import { useKeyDown } from '@ids-hooks/useKeyEvent';

import { BaseDropdownItem, BaseDropdownProps, DropdownSize, DropdownType } from './BaseDropdown.types';

const MAX_VISIBLE_ITEMS = 10;
const CHIP_ICON_SIZE_MAPPING = {
    [DropdownSize.Medium]: IconSize.TinySmall,
    [DropdownSize.Small]: IconSize.Tiny,
};

export const BaseDropdown = <T extends BaseDropdownItem>({
    children,
    isEmpty = true,
    isItemSelected,
    items,
    disabled = false,
    error = false,
    icon = '',
    label = '',
    size = DropdownSize.Medium,
    type = DropdownType.Input,
    filterFunction = (item, searchTerm) => item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    getItemAttributes = () => ({}),
    getNextFocusableItem = () => null,
    maxVisibleItems = MAX_VISIBLE_ITEMS,
    onDropdownItemClick,
    placeholder,
    renderEmptySelectionInfo,
    renderItem = (item) => item.label,
    renderSelectedItems = () => null,
    renderSource = () => null,
    className = '',
}: BaseDropdownProps<T>) => {
    const Translator = useContext(TranslatorContext);
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const isChip = type === DropdownType.Chip;
    const dropdownClassName = createCssClassNames({
        'ids-dropdown': true,
        'ids-dropdown--chip': isChip,
        [`ids-dropdown--${size}`]: isChip,
        'ids-dropdown--disabled': disabled,
        'ids-dropdown--error': error,
        [className]: !!className,
    });
    const dropdownWidgetClassName = createCssClassNames({
        'ids-dropdown__widget': true,
        'ids-input': !isChip,
        'ids-input--disabled': !isChip && disabled,
        'ids-input--error': !isChip && error,
    });
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const renderSelectionInfo = () => {
        if (children) {
            return children;
        }

        if (isEmpty) {
            if (renderEmptySelectionInfo) {
                return renderEmptySelectionInfo();
            }

            const placeholderText =
                placeholder === undefined
                    ? Translator.trans(/*@Desc("Select an item")*/ 'ids.dropdown.placeholder')
                    : placeholder.trim() || Translator.trans(/*@Desc("All")*/ 'ids.dropdown.placeholder.all');

            return <div className="ids-dropdown__placeholder">{placeholderText}</div>;
        }

        return <div className="ids-dropdown__selection-info-items">{renderSelectedItems()}</div>;
    };
    const renderChipIcon = () => {
        if (!isChip || !icon) {
            return null;
        }

        return (
            <span aria-hidden="true" className="ids-dropdown__icon">
                <Icon name={icon} size={CHIP_ICON_SIZE_MAPPING[size]} />
            </span>
        );
    };
    const renderChipLabel = () => {
        if (!isChip || !label) {
            return null;
        }

        return <div className="ids-dropdown__label">{label}</div>;
    };

    useKeyDown(
        ['Enter', ' '],
        (event) => {
            const { activeElement } = window.document;

            if (activeElement === referenceElement) {
                event.preventDefault();
                toggleDropdown();
            }
        },
        referenceElement,
    );

    return (
        <div className={dropdownClassName}>
            <div className="ids-dropdown__source">{renderSource()}</div>
            <div className={dropdownWidgetClassName} onClick={toggleDropdown} ref={setReferenceElement} role="button" tabIndex={0}>
                {renderChipIcon()}
                {renderChipLabel()}
                <div className="ids-dropdown__selection-info">{renderSelectionInfo()}</div>
                <div className="ids-dropdown__expander">
                    <Expander isExpanded={isOpen} isFocusable={false} onClick={toggleDropdown} type={ExpanderType.Chevron} />
                </div>
            </div>
            <ItemsContainer
                closeDropdown={() => {
                    setIsOpen(false);
                }}
                filterFunction={filterFunction}
                getItemAttributes={getItemAttributes}
                getNextFocusableItem={getNextFocusableItem}
                isItemSelected={isItemSelected}
                isOpen={isOpen}
                items={items}
                maxVisibleItems={maxVisibleItems}
                onDropdownItemClick={onDropdownItemClick}
                referenceElement={referenceElement}
                renderItem={renderItem}
            />
        </div>
    );
};
