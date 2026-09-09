import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { createCssClassNames } from '@ids-core/helpers/cssClassNames';
import { useDebounce } from '@ids-hooks/useDebounce';

import { OverflowListCalculateAction as Actions, OverflowListProps } from './OverflowList.types';

const RESIZE_TIMEOUT = 200;
const MIN_VISIBLE_ITEMS = 1;

export const OverflowList = <ItemProps extends { id: string }>({
    className = '',
    items = [],
    renderItem,
    renderMore,
}: OverflowListProps<ItemProps>) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement | null>(null);
    const [itemsWidth, setItemsWidth] = useState(0);
    const [currentAction, setCurrentAction] = useState(Actions.None);
    const [numberOfVisibleItems, setNumberOfVisibleItems] = useState(items.length);
    const [shouldShrinkFirstItem, setShouldShrinkFirstItem] = useState(false);
    const debounce = useDebounce(RESIZE_TIMEOUT);
    const componentClassName = createCssClassNames({
        'ids-overflow-list': true,
        [className]: !!className,
    });
    const itemsClassName = createCssClassNames({
        'ids-overflow-list__items': true,
        'ids-overflow-list__items--shrink-first': shouldShrinkFirstItem,
    });
    const recalculateVisibleItems = () => {
        if (!itemsRef.current) {
            return;
        }

        const itemsNodes = Array.from(itemsRef.current.children);
        const { right: listRightPosition } = itemsRef.current.getBoundingClientRect();
        const firstOverflowingItemIndex = itemsNodes.findIndex((itemNode) => {
            const { right: itemRightPosition } = itemNode.getBoundingClientRect();

            return itemRightPosition > listRightPosition;
        });

        if (firstOverflowingItemIndex === -1 || firstOverflowingItemIndex === items.length) {
            setShouldShrinkFirstItem(false);

            return true;
        }

        const newNumberOfVisibleItems =
            firstOverflowingItemIndex === numberOfVisibleItems ? firstOverflowingItemIndex - MIN_VISIBLE_ITEMS : firstOverflowingItemIndex;

        setNumberOfVisibleItems(Math.max(newNumberOfVisibleItems, MIN_VISIBLE_ITEMS));
        setShouldShrinkFirstItem(newNumberOfVisibleItems < MIN_VISIBLE_ITEMS);

        return newNumberOfVisibleItems <= MIN_VISIBLE_ITEMS;
    };
    const listResizeObserver = useMemo(
        () =>
            new ResizeObserver(() => {
                debounce(() => {
                    setItemsWidth(listRef.current?.offsetWidth ?? 0);
                    setNumberOfVisibleItems(items.length);
                    setShouldShrinkFirstItem(false);
                    setCurrentAction(Actions.CalculateItems);
                });
            }),
        [items.length, debounce],
    );
    const renderItems = () => {
        return items.slice(0, numberOfVisibleItems).map((item) => renderItem(item));
    };
    const renderOverflow = () => {
        const hiddenCount = items.length - numberOfVisibleItems;

        if (hiddenCount > 0) {
            return renderMore({ hiddenCount });
        }
    };

    useLayoutEffect(() => {
        if (currentAction === Actions.CalculateItems) {
            const stopRecalculating = recalculateVisibleItems();

            if (stopRecalculating) {
                setCurrentAction(Actions.None);
            }
        }
    }, [currentAction, numberOfVisibleItems]);

    useLayoutEffect(() => {
        if (listRef.current) {
            setItemsWidth(listRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        if (currentAction === Actions.None) {
            setNumberOfVisibleItems(items.length);
            setCurrentAction(Actions.CalculateItems);
        }
    }, [items]);

    useEffect(() => {
        if (listRef.current) {
            listResizeObserver.observe(listRef.current);
        }

        return () => {
            listResizeObserver.disconnect();
        };
    }, []);

    return (
        <div className={componentClassName} ref={listRef}>
            <div className={itemsClassName} ref={itemsRef} style={{ width: `${itemsWidth}px` }}>
                {renderItems()}
                {renderOverflow()}
            </div>
        </div>
    );
};
