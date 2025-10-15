import React, { useContext, useState } from 'react';

import { Expander, ExpanderType } from '@ids-components/Expander';
import { ItemsContainer } from './components/ItemsContainer';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';
import { useKeyDown } from '@ids-hooks/useKeyEvent';

import { BaseDropdownItem, BaseDropdownProps } from './BaseDropdown.types';

const MAX_VISIBLE_ITEMS = 10;

export const BaseDropdown = <T extends BaseDropdownItem>({
    children,
    isEmpty = true,
    isItemSelected = () => false,
    items,
    disabled = false,
    error = false,
    filterFunction = (item, searchTerm) => item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    getItemAttributes = () => ({}),
    maxVisibleItems = MAX_VISIBLE_ITEMS,
    onDropdownItemClick = () => undefined,
    renderEmptySelectionInfo,
    renderItem = (item) => item.label,
    renderSelectedItems = () => null,
    renderSource = () => null,
    className = '',
}: BaseDropdownProps<T>) => {
    const Translator = useContext(TranslatorContext);
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownClassName = createCssClassNames({
        'ids-dropdown': true,
        'ids-dropdown--disabled': disabled,
        'ids-dropdown--error': error,
        [className]: !!className,
    });
    const dropdownWidgetClassName = createCssClassNames({
        'ids-dropdown__widget ids-input': true,
        'ids-input--disabled': disabled,
        'ids-input--error': error,
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

            const placeholder = Translator.trans(/*@Desc("Select an item")*/ 'ids.dropdown.placeholder');

            return <div className="ids-dropdown__placeholder">{placeholder}</div>;
        }

        return <div className="ids-dropdown__selection-info-items">{renderSelectedItems()}</div>;
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
