import { type API_LeafEntry as LeafEntry } from 'storybook/internal/types';
import { useStorybookState } from 'storybook/internal/manager-api';

export const useIsTwigStoryAvailable = (): boolean => {
    const { index: allStories, storyId: currentStoryId } = useStorybookState();
    const getStoryId = () => {
        if (allStories === undefined) {
            return '';
        }

        const currentStory = allStories[currentStoryId];

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (currentStory?.type !== 'story' && currentStory?.type !== 'docs') {
            return '';
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        return (allStories[currentStoryId] as LeafEntry).title;
    };

    return getStoryId().startsWith('components/src/components/');
};
