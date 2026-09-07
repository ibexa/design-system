import { BaseDropdownEntry, BaseDropdownItem, BaseDropdownItemGroup } from '../BaseDropdown.types';

export const isDropdownItemGroup = <T extends BaseDropdownItem>(entry: BaseDropdownEntry<T>): entry is BaseDropdownItemGroup<T> =>
    'items' in entry && Array.isArray(entry.items);

export const flattenDropdownItems = <T extends BaseDropdownItem>(entries: BaseDropdownEntry<T>[]): T[] =>
    entries.flatMap((entry) => (isDropdownItemGroup(entry) ? entry.items : [entry]));

export const filterDropdownEntries = <T extends BaseDropdownItem>(
    entries: BaseDropdownEntry<T>[],
    searchTerm: string,
    filterFunction: (item: T, term: string) => boolean,
): BaseDropdownEntry<T>[] => {
    if (!searchTerm) {
        return entries;
    }

    return entries.reduce<BaseDropdownEntry<T>[]>((filteredEntries, entry) => {
        if (isDropdownItemGroup(entry)) {
            const matchingItems = entry.items.filter((item) => filterFunction(item, searchTerm));

            if (matchingItems.length > 0) {
                filteredEntries.push({ ...entry, items: matchingItems });
            }

            return filteredEntries;
        }

        if (filterFunction(entry, searchTerm)) {
            filteredEntries.push(entry);
        }

        return filteredEntries;
    }, []);
};
