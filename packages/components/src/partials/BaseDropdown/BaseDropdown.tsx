import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { Expander, ExpanderType } from '@ids-components/Expander';
import { InputTextInput, InputTextInputSize } from '@ids-components/InputText';
import { TranslatorContext } from '@ids-context/Translator';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import { useKeyDown } from '@ids-hooks/useKeyEvent';

import { BaseDropdownItem, BaseDropdownProps } from './BaseDropdown.types';

export const BASE_DROPDOWN_CLASS = {
    ITEM: 'ids-dropdown__item',
    PLACEHOLDER: 'ids-dropdown__placeholder',
    SELECTION_INFO_ITEMS: 'ids-dropdown__selection-info-items',
};
const MAX_VISIBLE_ITEMS = 10;

export const BaseDropdown = <T extends BaseDropdownItem>({
    children,
    isItemSelected = () => false,
    items,
    disabled = false,
    error = false,
    filterFunction = (item, searchTerm) => item.label.toLowerCase().includes(searchTerm.toLowerCase()),
    maxVisibleItems = MAX_VISIBLE_ITEMS,
    onDropdownItemClick = () => undefined,
    renderItem = (item) => item.label,
    renderSource = () => null,
    className = '',
}: BaseDropdownProps<T>) => {
    const Translator = useContext(TranslatorContext);
    const searchRef = useRef<HTMLInputElement>(null);
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [itemsContainerWidth, setItemsContainerWidth] = useState(0);
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
    const hasSearchInput = items.length > maxVisibleItems;
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
        if (!hasSearchInput) {
            return null;
        }

        const placeholderText = Translator.trans(/*@Desc("Search...")*/ 'ibexa.dropdown.search.placeholder');

        return (
            <div className="ids-dropdown__search">
                <InputTextInput
                    name="dropdown-search"
                    onChange={setSearchTerm}
                    placeholder={placeholderText}
                    ref={searchRef}
                    size={InputTextInputSize.Small}
                    value={searchTerm}
                />
            </div>
        );
    };
    const onItemClick = (item: T) => {
        onDropdownItemClick(item);
        setIsOpen(false);
    };
    const renderItemsContainer = () => {
        if (!isOpen) {
            return null;
        }

        const itemsContainerStyles = {
            ...styles.popper,
            width: itemsContainerWidth ? `${itemsContainerWidth}px` : 'auto',
        };

        return (
            <div className="ids-dropdown__items-container" ref={setPopperElement} style={itemsContainerStyles} {...attributes.popper}>
                {renderSearchInput()}
                <ul className="ids-dropdown__items" data-max-visible-items={maxVisibleItems}>
                    {filteredItems.map((item, index) => {
                        const dropdownItemClassName = createCssClassNames({
                            'ids-dropdown__item': true,
                            'ids-dropdown__item--selected': isItemSelected(item),
                        });

                        return (
                            <li
                                className={dropdownItemClassName}
                                key={item.id}
                                onClick={onItemClick.bind(null, item)}
                                ref={(node) => {
                                    if (index === 0 && !hasSearchInput && node) {
                                        node.focus();
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                            >
                                {renderItem(item)}
                            </li>
                        );
                    })}
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
            searchRef.current?.focus();

            window.document.body.addEventListener('click', clickOutsideHandler);

            return () => {
                window.document.body.removeEventListener('click', clickOutsideHandler);
            };
        }
    }, [isOpen, popperElement, referenceElement]);

    useLayoutEffect(() => {
        if (isOpen && referenceElement) {
            setItemsContainerWidth(referenceElement.offsetWidth);
        }
    }, [isOpen, referenceElement]);

    useKeyDown(['Enter', ' '], () => {
        const { activeElement } = window.document;

        if (activeElement === referenceElement) {
            toggleDropdown();
        }

        if (isOpen && activeElement?.classList.contains('ids-dropdown__item') && activeElement instanceof HTMLElement) {
            activeElement.click();
        }
    });

    useKeyDown(['Escape'], () => {
        if (isOpen) {
            setIsOpen(false);
            referenceElement?.focus();
        }
    });

    useKeyDown(['ArrowDown'], () => {
        if (isOpen) {
            const { activeElement } = window.document;

            if (activeElement?.classList.contains('ids-dropdown__item')) {
                const nextElement = activeElement.nextElementSibling;

                if (nextElement?.classList.contains('ids-dropdown__item') && nextElement instanceof HTMLElement) {
                    nextElement.focus();
                }
            }
        }
    });

    useKeyDown(['ArrowUp'], () => {
        if (isOpen) {
            const { activeElement } = window.document;

            if (activeElement?.classList.contains('ids-dropdown__item')) {
                const previousElement = activeElement.previousElementSibling;

                if (previousElement?.classList.contains('ids-dropdown__item') && previousElement instanceof HTMLElement) {
                    previousElement.focus();
                }
            }
        }
    });

    return (
        <div className={dropdownClassName}>
            <div className="ids-dropdown__source">{renderSource()}</div>
            <div className={dropdownWidgetClassName} onClick={toggleDropdown} ref={setReferenceElement} role="button" tabIndex={0}>
                <div className="ids-dropdown__selection-info">{children}</div>
                <div className="ids-dropdown__expander">
                    <Expander isExpanded={isOpen} isFocusable={false} onClick={toggleDropdown} type={ExpanderType.Chevron} />
                </div>
            </div>
            {renderItemsContainer()}
        </div>
    );
};
