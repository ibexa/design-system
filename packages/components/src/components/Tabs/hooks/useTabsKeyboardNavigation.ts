import React, { useRef } from 'react';

import { TabsChangeEvent, TabsItem } from '../Tabs.types';
import { checkIsNavigationKey, getNextSelectableId } from '../utils/navigation';

type SelectTabFn = (id: string, event: TabsChangeEvent) => void;

export const useTabsKeyboardNavigation = (items: TabsItem[], selectedId: string, selectTab: SelectTabFn) => {
    const tabsNodes = useRef(new Map<string, HTMLButtonElement>());
    const setTabNode = (id: string) => (node: HTMLButtonElement | null) => {
        if (node) {
            tabsNodes.current.set(id, node);
        } else {
            tabsNodes.current.delete(id);
        }
    };
    const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        if (!checkIsNavigationKey(event.key)) {
            return;
        }

        const nextId = getNextSelectableId(items, selectedId, event.key);

        if (nextId === null) {
            return;
        }

        event.preventDefault();
        tabsNodes.current.get(nextId)?.focus();
        selectTab(nextId, event);
    };

    return { handleKeyDown, setTabNode };
};
