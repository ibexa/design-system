import { BaseDropdownEntry, BaseDropdownItem, BaseDropdownItemGroup } from '@ids-partials/BaseDropdown';
import { BaseComponentAttributes } from '@ids-types/general';

export type FilterDropdownItem = BaseDropdownItem;
export type FilterDropdownItemGroup = BaseDropdownItemGroup<FilterDropdownItem>;
export type FilterDropdownEntry = BaseDropdownEntry<FilterDropdownItem>;

export enum FilterDropdownType {
    Default = 'default',
    Dashboard = 'dashboard',
    MoreFilters = 'more-filters',
    MoreFiltersSmall = 'more-filters-small',
}

export enum FilterDropdownAction {
    Check = 'check',
    Uncheck = 'uncheck',
    Clear = 'clear',
}

export interface FilterDropdownProps extends BaseComponentAttributes {
    label: string;
    name: string;
    hasSearch?: boolean;
    items?: FilterDropdownEntry[];
    onChange?: (value: string[], itemId: string, action: FilterDropdownAction) => void;
    type?: FilterDropdownType;
    value?: string[];
}
