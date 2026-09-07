import { BaseComponentAttributes } from '@ids-types/general';
import { BaseDropdownItem } from '@ids-partials/BaseDropdown';

export type FilterDropdownItem = BaseDropdownItem;

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
    disabled?: boolean;
    hasSearch?: boolean;
    items?: FilterDropdownItem[];
    onChange?: (value: string[], itemId: string, action: FilterDropdownAction) => void;
    type?: FilterDropdownType;
    value?: string[];
}
