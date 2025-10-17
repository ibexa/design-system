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
    const recalculateVisibleItems = (withOverflow = false) => {
        if (!listRef.current) {
            return;
        }

        const itemsNodes = Array.from(listRef.current.children);
        const { right: listRightPosition } = listRef.current.getBoundingClientRect();
        let calculatedLastItemRightPosition = listRightPosition;

        if (withOverflow) {
            const { width: overflowWidth } = itemsNodes.at(-1)?.getBoundingClientRect() ?? { width: 0 };

            calculatedLastItemRightPosition -= overflowWidth;
        }

        let newNumberOfVisibleItems = itemsNodes.findIndex((itemNode) => {
            const { right: itemRightPosition } = itemNode.getBoundingClientRect();

            return itemRightPosition > calculatedLastItemRightPosition;
        });

        if (newNumberOfVisibleItems === -1) {
            newNumberOfVisibleItems = numberOfVisibleItems;
        }

        const stopRecalculating = newNumberOfVisibleItems === numberOfVisibleItems;

        setNumberOfVisibleItems(newNumberOfVisibleItems);

        return stopRecalculating;
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
        if (currentAction !== Actions.CalculateItems && hiddenCount > 0) {
            return renderMore({ hiddenCount });
        }
    };

    useLayoutEffect(() => {
        if (currentAction === Actions.CalculateItems) {
            recalculateVisibleItems();
            setCurrentAction(Actions.CalculateOverflow);
        } else if (currentAction === Actions.CalculateOverflow) {
            const stopRecalculating = recalculateVisibleItems(true);

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

    return (
        <div
            className={componentClassName}
            ref={(node) => {
                if (node) {
                    listResizeObserver.observe(node);
                    listRef.current = node;

                    return () => {
                        listResizeObserver.unobserve(node);
                    };
                }
            }}
        >
            {renderItems()}
            {renderOverflow()}
        </div>
    );
};
