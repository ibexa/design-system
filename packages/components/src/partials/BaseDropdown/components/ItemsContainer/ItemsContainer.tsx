import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { Search } from '../Search';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import { useKeyDown } from '@ids-hooks/useKeyEvent';

import { BaseDropdownItem, ItemsContainerProps } from './ItemsContainer.types';

export const ItemsContainer = <T extends BaseDropdownItem>({
    closeDropdown,
    filterFunction,
    getItemAttributes,
    isItemSelected,
    isOpen,
    items,
    maxVisibleItems,
    onDropdownItemClick,
    referenceElement,
    renderItem,
}: ItemsContainerProps<T>) => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [itemsContainerWidth, setItemsContainerWidth] = useState(0);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
        strategy: 'fixed',
    });
    const hasSearchInput = items.length > maxVisibleItems;
    const filteredItems = useMemo(() => {
        if (!searchTerm) {
            return items;
        }

        return items.filter((item) => filterFunction(item, searchTerm));
    }, [items, searchTerm, filterFunction]);
    const onItemClick = (item: T) => {
        onDropdownItemClick(item, {
            closeDropdown,
        });
    };
    const itemsContainerStyles = {
        ...styles.popper,
        width: itemsContainerWidth ? `${itemsContainerWidth}px` : 'auto',
    };

    useEffect(() => {
        const clickOutsideHandler = (event: MouseEvent) => {
            if (event.target instanceof Node && !popperElement?.contains(event.target) && !referenceElement?.contains(event.target)) {
                closeDropdown();
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

    useKeyDown(
        ['Enter', ' '],
        (event) => {
            const { activeElement } = window.document;

            if (isOpen && activeElement?.classList.contains('ids-dropdown__item') && activeElement instanceof HTMLElement) {
                event.preventDefault();
                activeElement.click();
            }
        },
        referenceElement,
    );

    useKeyDown(
        ['Escape'],
        () => {
            if (isOpen) {
                closeDropdown();
                referenceElement?.focus();
            }
        },
        popperElement,
    );

    useKeyDown(
        ['ArrowDown'],
        () => {
            if (isOpen) {
                const { activeElement } = window.document;

                if (activeElement?.classList.contains('ids-dropdown__item')) {
                    const nextElement = activeElement.nextElementSibling;

                    if (nextElement?.classList.contains('ids-dropdown__item') && nextElement instanceof HTMLElement) {
                        nextElement.focus();
                    }
                }
            }
        },
        popperElement,
    );

    useKeyDown(
        ['ArrowUp'],
        () => {
            if (isOpen) {
                const { activeElement } = window.document;

                if (activeElement?.classList.contains('ids-dropdown__item')) {
                    const previousElement = activeElement.previousElementSibling;

                    if (previousElement?.classList.contains('ids-dropdown__item') && previousElement instanceof HTMLElement) {
                        previousElement.focus();
                    }
                }
            }
        },
        popperElement,
    );

    if (!isOpen) {
        return null;
    }

    return (
        <div className="ids-dropdown__items-container" ref={setPopperElement} style={itemsContainerStyles} {...attributes.popper}>
            <Search isVisible={hasSearchInput} searchRef={searchRef} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
                            onClick={() => {
                                onItemClick(item);
                            }}
                            ref={(node) => {
                                if (index === 0 && !hasSearchInput && node) {
                                    node.focus();
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            {...getItemAttributes(item)}
                        >
                            {renderItem(item)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
