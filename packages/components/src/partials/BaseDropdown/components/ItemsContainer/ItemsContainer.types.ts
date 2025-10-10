import { BaseDropdownItem, ExtraDropdownItemClickParamsType } from '../../BaseDropdown.types';

export { BaseDropdownItem };

export interface ItemsContainerProps<T extends BaseDropdownItem> {
    closeDropdown: () => void;
    filterFunction: (item: T, searchTerm: string) => boolean;
    getItemAttributes: (item: T) => React.HTMLAttributes<HTMLElement>;
    isItemSelected: (item: T) => boolean;
    isOpen: boolean;
    items: T[];
    maxVisibleItems: number;
    onDropdownItemClick: (item: T, extraParams: ExtraDropdownItemClickParamsType) => void;
    referenceElement: HTMLDivElement | null;
    renderItem: (item: T) => React.ReactNode;
}
