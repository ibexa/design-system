import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

import { Search } from '../Search';
import { createCssClassNames } from '@ids-core';
import { useKeyDown } from '@ids-hooks/useKeyEvent';

import { ItemsContainerItemsStylesType, ItemsContainerProps } from './ItemsContainer.types';
import { BaseDropdownItem } from '../../BaseDropdown.types';

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
    const itemsRef = useRef<HTMLUListElement>(null);
    const originalItemsMaxHeightRef = useRef(0);
    const [isTopPlacementForced, setIsTopPlacementForced] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [itemsContainerWidth, setItemsContainerWidth] = useState(0);
    const [itemsMaxHeight, setItemsMaxHeight] = useState(0);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: isTopPlacementForced ? 'top-start' : 'bottom-start',
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
    const getItemsStyles = () => {
        const itemsStyles: ItemsContainerItemsStylesType = {
            '--max-visible-items': maxVisibleItems,
        };

        if (itemsMaxHeight) {
            itemsStyles.maxHeight = `${itemsMaxHeight}px`;
        }

        return itemsStyles;
    };
    const popperPlacement = attributes.popper?.['data-popper-placement'] === 'top-start' ? 'top' : 'bottom';
    const calculateMaxAvailableItemsHeight = useCallback(
        (availableHeight: number) => {
            if (!isOpen || !popperElement || !itemsRef.current) {
                return 0;
            }

            const { marginTop: itemsMarginTop, marginBottom: itemsMarginBottom } = window.getComputedStyle(popperElement);
            const { top: itemsContainerTop, bottom: itemsContainerBottom } = popperElement.getBoundingClientRect();
            const { top: itemsTop, bottom: itemsBottom } = itemsRef.current.getBoundingClientRect();
            const topHeight = parseInt(itemsMarginTop, 10) + (itemsTop - itemsContainerTop);
            const bottomHeight = parseInt(itemsMarginBottom, 10) + (itemsContainerBottom - itemsBottom);
            const calculatedAvailableHeight = availableHeight - topHeight - bottomHeight;

            return calculatedAvailableHeight;
        },
        [popperElement, isOpen],
    );

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

            originalItemsMaxHeightRef.current = itemsRef.current?.offsetHeight ?? 0;
        } else {
            setItemsMaxHeight(0);
        }
    }, [isOpen, referenceElement]);

    useLayoutEffect(() => {
        if (styles.popper.transform && referenceElement) {
            const getAvailableHeight = () => {
                if (popperPlacement === 'bottom') {
                    const { innerHeight: windowHeight } = window;
                    const { bottom: dropdownBottom } = referenceElement.getBoundingClientRect();

                    return windowHeight - dropdownBottom;
                }

                return referenceElement.getBoundingClientRect().top;
            };
            const availableHeight = getAvailableHeight();
            const availableItemsHeight = calculateMaxAvailableItemsHeight(availableHeight);
            const originalDropdownFitsInViewport = availableItemsHeight > originalItemsMaxHeightRef.current;

            if (originalDropdownFitsInViewport) {
                setItemsMaxHeight(0);
            } else {
                setItemsMaxHeight(availableItemsHeight);
            }
        }
    }, [styles.popper.transform, popperPlacement, referenceElement]);

    useLayoutEffect(() => {
        if (isOpen && referenceElement) {
            const { top: referenceTop, bottom: referenceBottom } = referenceElement.getBoundingClientRect();
            const { innerHeight: windowHeight } = window;

            if (referenceBottom < 0 || referenceTop > windowHeight) {
                closeDropdown();

                return;
            }

            const availableSpaceAbove = referenceTop;
            const availableSpaceBelow = windowHeight - referenceBottom;
            const originalDropdownFitsInViewport = availableSpaceBelow > originalItemsMaxHeightRef.current;
            const moreSpaceAbove = availableSpaceAbove > availableSpaceBelow;
            const showDropdownAbove = moreSpaceAbove && !originalDropdownFitsInViewport;

            setIsTopPlacementForced(showDropdownAbove);
        }
    }, [isOpen, referenceElement, styles.popper.transform]);

    useKeyDown(
        ['Enter', ' '],
        (event) => {
            const { activeElement } = window.document;

            if (isOpen && activeElement?.classList.contains('ids-dropdown__item') && activeElement instanceof HTMLElement) {
                event.preventDefault();
                activeElement.click();
            }
        },
        popperElement,
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
            <ul className="ids-dropdown__items" ref={itemsRef} style={getItemsStyles()}>
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
