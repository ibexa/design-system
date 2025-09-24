import { BaseComponentAttributes } from '@ids-types/general';

export interface BaseDropdownItem {
    id: string | number;
    label: string;
}

export interface BaseDropdownRef {
    openDropdown: () => void;
    hasSearchInput: () => boolean;
    closeDropdown: () => void;
}

export interface BaseDropdownProps<T extends BaseDropdownItem> extends BaseComponentAttributes {
    items: T[];
    renderItems: (items: T[]) => React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    filterFunction?: (item: T, searchTerm: string) => boolean;
    maxVisibleItems?: number;
    ref: React.Ref<BaseDropdownRef>;
    renderSource?: () => React.ReactNode;
}
