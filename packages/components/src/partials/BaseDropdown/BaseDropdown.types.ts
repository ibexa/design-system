import { BaseComponentAttributes } from '@ids-types/general';

export interface BaseDropdownItem {
    id: string | number;
    label: string;
}

export interface BaseDropdownProps<T extends BaseDropdownItem> extends BaseComponentAttributes {
    isItemSelected: (item: T) => boolean;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    filterFunction?: (item: T, searchTerm: string) => boolean;
    maxVisibleItems?: number;
    onDropdownItemClick: (item: T) => void;
    renderSource?: () => React.ReactNode;
}
