import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { OverflowListCalculateAction as Actions, OverflowListProps } from './OverflowList.types';

export const OverflowList = <ItemProps extends { id: string }>({
    className = '',
    items = [],
    renderItem,
    renderMore,
}: OverflowListProps<ItemProps>) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [currentAction, setCurrentAction] = useState(Actions.None);
    const [numberOfVisibleItems, setNumberOfVisibleItems] = useState(items.length);
    const componentClassName = createCssClassNames({
        'ids-overflow-list': true,
        [className]: !!className,
    });
    const recalculateVisibleItems = () => {
        if (!listRef.current) {
            return;
        }

        const itemsNodes = Array.from(listRef.current.children);
        const { right: listRightPosition } = listRef.current.getBoundingClientRect();
        const newNumberOfVisibleItems = itemsNodes.findIndex((itemNode) => {
            const { right: itemRightPosition } = itemNode.getBoundingClientRect();

            return itemRightPosition > listRightPosition;
        });

        if (newNumberOfVisibleItems === -1 || newNumberOfVisibleItems === items.length) {
            return true;
        }

        setNumberOfVisibleItems(newNumberOfVisibleItems - 1); // eslint-disable-line no-magic-numbers

        return true;
    };
    const listResizeObserver = useMemo(
        () =>
            new ResizeObserver(() => {
                setNumberOfVisibleItems(items.length);
                setCurrentAction(Actions.CalculateItems);
            }),
        [items.length],
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
            {renderItems()}
            {renderOverflow()}
        </div>
    );
};
