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

export const generateNestedGroupedItemsArray = (groupsCount: number, subgroupsPerGroup: number, itemsPerGroup: number) =>
    Array.from({ length: groupsCount }, (value, groupIndex) => {
        const groupNumber = String(groupIndex + 1); // eslint-disable-line no-magic-numbers
        const generateGroupItems = (idPrefix: string, labelPrefix: string) =>
            generateItemsArray(itemsPerGroup).map((item) => ({
                id: `${idPrefix}-item-${item.id}`,
                label: `${labelPrefix} item ${item.id}`,
            }));
        const subgroups = Array.from({ length: subgroupsPerGroup }, (subgroupValue, subgroupIndex) => {
            const subgroupNumber = String(subgroupIndex + 1); // eslint-disable-line no-magic-numbers
            const subgroupId = `group-${groupNumber}-${subgroupNumber}`;
            const subgroupLabel = `Group ${groupNumber}.${subgroupNumber}`;

            return {
                id: subgroupId,
                items: generateGroupItems(subgroupId, subgroupLabel),
                label: subgroupLabel,
            };
        });

        return {
            id: `group-${groupNumber}`,
            items: [...generateGroupItems(`group-${groupNumber}`, `Group ${groupNumber}`), ...subgroups],
            label: `Group ${groupNumber}`,
        };
    });
