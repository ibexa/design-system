import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = (delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    });

    return useCallback(
        (callback: () => void) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                callback();
            }, delay);
        },
        [delay],
    );
};
