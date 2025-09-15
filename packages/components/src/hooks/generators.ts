import { useId } from 'react';

export const useGetOrCreateId = (id?: string): string => {
    const generatedId = useId();

    return id ?? generatedId;
};
