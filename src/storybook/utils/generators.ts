export const generateItemsArray = (length: number, { label }: { label?: string } = {}): { id: string; label: string }[] =>
    Array.from({ length }, (value, index) => {
        const id = String(index + 1); // eslint-disable-line no-magic-numbers

        // TODO: Replace with a more complex item structure if needed in the future
        return {
            id,
            label: label ?? `Item ${id}`,
        };
    });
