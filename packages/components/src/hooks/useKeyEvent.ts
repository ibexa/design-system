import { useEffect } from 'react';

export const useKeyDown = (key: string[], callback: (event: KeyboardEvent) => void) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (key.includes(event.key)) {
                callback(event);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [key, callback]);
};
