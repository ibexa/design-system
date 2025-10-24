import { ItemsContainerMoveActiveFocusDirection } from '@ids-partials/BaseDropdown/components/ItemsContainer/ItemsContainer.types';

export interface ExtraParamsType {
    itemsList: HTMLUListElement;
    search: HTMLInputElement | null;
}

export const getNextFocusableItem = (
    getFocusableElements: (extraProps: ExtraParamsType) => HTMLElement[],
    element: HTMLElement,
    direction: ItemsContainerMoveActiveFocusDirection,
    extraParams: ExtraParamsType,
): HTMLElement | null => {
    const focusableElements = getFocusableElements(extraParams);

    const focusedItemIndex = focusableElements.findIndex((el) => el === element);

    if (direction === ItemsContainerMoveActiveFocusDirection.Down) {
        const nextElement = focusableElements[focusedItemIndex + 1]; // eslint-disable-line no-magic-numbers

        return nextElement instanceof HTMLElement ? nextElement : element;
    }

    const prevElement = focusableElements[focusedItemIndex - 1]; // eslint-disable-line no-magic-numbers

    return prevElement instanceof HTMLElement ? prevElement : element;
};
