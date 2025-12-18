import { fileURLToPath } from 'url';

export const previewAnnotations = (entry = []) => {
    return [...entry, fileURLToPath(import.meta.resolve('./preview.ts'))];
};

export const managerEntries = (entry = []) => {
    return [...entry, fileURLToPath(import.meta.resolve('./manager.tsx'))];
};
