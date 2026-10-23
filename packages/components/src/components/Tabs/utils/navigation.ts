import { TabsItem } from '../Tabs.types';

const INDEX_STEP = 1;
const NAVIGATION_KEYS = ['ArrowLeft', 'ArrowRight', 'End', 'Home'];

export const checkIsNavigationKey = (key: string): boolean => NAVIGATION_KEYS.includes(key);

export const getNextSelectableId = (items: TabsItem[], selectedId: string, key: string): string | null => {
    const enabledItems = items.filter((item) => !item.isDisabled);

    if (enabledItems.length === 0) {
        return null;
    }

    const lastIndex = enabledItems.length - INDEX_STEP;
    const currentIndex = enabledItems.findIndex((item) => item.id === selectedId);
    const nextIndexByKey: Partial<Record<string, number>> = {
        ArrowLeft: currentIndex <= 0 ? lastIndex : currentIndex - INDEX_STEP,
        ArrowRight: currentIndex >= lastIndex ? 0 : currentIndex + INDEX_STEP,
        End: lastIndex,
        Home: 0,
    };
    const nextIndex = nextIndexByKey[key];

    if (nextIndex === undefined) {
        return null;
    }

    return enabledItems[nextIndex].id;
};
