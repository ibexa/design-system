import { useEffect } from 'react';

export const useKeyDown = (key: string[], callback: (event: KeyboardEvent) => void, node: HTMLElement | null) => {
    useEffect(() => {
        const listenerElement = node ?? window;

        const handleKeyDown = (event: Event) => {
            if (event instanceof KeyboardEvent && key.includes(event.key)) {
                callback(event);
            }
        };

        listenerElement.addEventListener('keydown', handleKeyDown);

        return () => {
            listenerElement.removeEventListener('keydown', handleKeyDown);
        };
    }, [key, callback]);
};
