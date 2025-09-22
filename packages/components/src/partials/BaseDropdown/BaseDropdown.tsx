import React, { useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { usePopper } from 'react-popper';

import { Expander, ExpanderType } from '@ids-components/Expander';
import { InputTextInput, InputTextInputSize } from '@ids-components/InputText';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { BaseDropdownItem, BaseDropdownProps } from './BaseDropdown.types';

export const BASE_DROPDOWN_CLASS = {
    ITEM: 'ids-dropdown__item',
    PLACEHOLDER: 'ids-dropdown__placeholder',
};
const MAX_VISIBLE_ITEMS = 10;

export const BaseDropdown = <T extends BaseDropdownItem>({
    children,
    items,
    disabled = false,
    error = false,
    filterFunction = (item, searchTerm) => item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    maxVisibleItems = MAX_VISIBLE_ITEMS,
    ref,
    renderItems,
    renderSource = () => null,
    className = '',
}: BaseDropdownProps<T>) => {
    const Translator = useContext(TranslatorContext);
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
        strategy: 'fixed',
    });
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
    const filteredItems = useMemo(() => {
        if (!searchTerm) {
            return items;
        }

        return items.filter((item) => filterFunction(item, searchTerm));
    }, [items, searchTerm, filterFunction]);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const renderSearchInput = () => {
        if (items.length <= maxVisibleItems) {
            return null;
        }

        const placeholderText = Translator.trans(/*@Desc("Search...")*/ 'ibexa.dropdown.search.placeholder');

        return (
            <div className="ids-dropdown__search">
                <InputTextInput
                    name="dropdown-search"
                    onChange={setSearchTerm}
                    placeholder={placeholderText}
                    size={InputTextInputSize.Small}
                    value={searchTerm}
                />
            </div>
        );
    };
    const renderItemsContainer = () => {
        if (!isOpen) {
            return null;
        }

        return (
            <div className="ids-dropdown__items-container" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                {renderSearchInput()}
                <ul className="ids-dropdown__items" data-max-visible-items={maxVisibleItems}>
                    {renderItems(filteredItems)}
                </ul>
            </div>
        );
    };

    useEffect(() => {
        const clickOutsideHandler = (event: MouseEvent) => {
            if (event.target instanceof Node && !popperElement?.contains(event.target) && !referenceElement?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            setSearchTerm('');

            window.document.body.addEventListener('click', clickOutsideHandler);

            return () => {
                window.document.body.removeEventListener('click', clickOutsideHandler);
            };
        }
    }, [isOpen, popperElement, referenceElement]);

    useImperativeHandle(ref, () => {
        return {
            closeDropdown: () => {
                setIsOpen(false);
            },
            openDropdown: () => {
                setIsOpen(true);
            },
        };
    }, []);

    return (
        <div className={dropdownClassName}>
            <div className="ids-dropdown__source">{renderSource()}</div>
            <div className={dropdownWidgetClassName} onClick={toggleDropdown} ref={setReferenceElement} role="button" tabIndex={0}>
                <div className="ids-dropdown__selection-info">{children}</div>
                <div className="ids-dropdown__expander">
                    <Expander isExpanded={isOpen} onClick={toggleDropdown} type={ExpanderType.Chevron} />
                </div>
            </div>
            {renderItemsContainer()}
        </div>
    );
};
