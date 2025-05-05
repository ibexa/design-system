export const previewAnnotations = (entry = []) => {
    return [...entry, require.resolve('./preview.ts')];
};

export const managerEntries = (entry = []) => {
    return [...entry, require.resolve('./manager.tsx')];
};
