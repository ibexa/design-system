export const generateItemsArray = (length: number, { label }: { label?: string } = {}): { id: string; label: string }[] =>
    Array.from({ length }, (value, index) => {
        const id = String(index + 1); // eslint-disable-line no-magic-numbers

        // TODO: Replace with a more complex item structure if needed in the future
        return {
            id,
            label: label ?? `Item ${id}`,
        };
    });

export const generateGroupedItemsArray = (groupsCount: number, itemsPerGroup: number, ungroupedCount = 0) => {
    const ungroupedItems = generateItemsArray(ungroupedCount).map((item) => ({
        id: `ungrouped-${item.id}`,
        label: `Ungrouped ${item.id}`,
    }));
    const groups = Array.from({ length: groupsCount }, (value, groupIndex) => {
        const groupNumber = String(groupIndex + 1); // eslint-disable-line no-magic-numbers

        return {
            id: `group-${groupNumber}`,
            items: generateItemsArray(itemsPerGroup).map((item) => ({
                id: `group-${groupNumber}-item-${item.id}`,
                label: `Group ${groupNumber} item ${item.id}`,
            })),
            label: `Group ${groupNumber}`,
        };
    });

    return [...ungroupedItems, ...groups];
};
