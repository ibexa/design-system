import React, { memo, useCallback, useEffect, useState } from 'react';

import { useGlobals, useStorybookState } from 'storybook/internal/manager-api';
import { IconButton } from 'storybook/internal/components';
import { type API_LeafEntry as LeafEntry } from 'storybook/internal/types';

import { FRAMEWORK, KEY, ROUTES } from '../constants';

export const Tool = memo(() => {
    const { index: allStories, storyId: currentStoryId } = useStorybookState();
    const [globals, updateGlobals, storyGlobals] = useGlobals();
    const [twigEnabled, setTwigEnabled] = useState(false);
    const isLocked = KEY in storyGlobals;
    const isTwigActive = globals[KEY] === FRAMEWORK.TWIG;
    const toggle = useCallback((frameworkId: string) => {
        updateGlobals({
            [KEY]: frameworkId,
        });
    }, []);
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
    const isTwigStoryAvailable = () => {
        return getStoryId().startsWith('components/src/components/');
    };
    const openTwigPreview = useCallback(() => {
        const storybookIframe = window.document.querySelector<HTMLIFrameElement>('#storybook-preview-iframe');

        if (!storybookIframe?.contentWindow?.document) {
            return;
        }

        const twigIframe = storybookIframe.contentWindow.document.querySelector<HTMLIFrameElement>('.twig-preview');

        if (!twigIframe) {
            return;
        }

        window.open(twigIframe.src, '_blank');
    }, []);
    const renderTwigLink = useCallback(() => {
        if (!isTwigActive) {
            return null;
        }

        return (
            <IconButton
                disabled={isLocked}
                key="twig-link"
                onClick={() => {
                    openTwigPreview();
                }}
                title="Open Twig preview"
            >
                Open Twig preview
            </IconButton>
        );
    }, [isTwigActive, isLocked]);
    const showFrameworkSelectorTools = twigEnabled && isTwigStoryAvailable();

    useEffect(() => {
        const baseUrl = process.env.TWIG_COMPONENTS_BASE_URL;

        if (baseUrl === undefined || baseUrl === '') {
            return;
        }

        const statusUrl = new URL(ROUTES.STATUS, baseUrl);

        fetch(statusUrl)
            .then(() => {
                setTwigEnabled(true);
            })
            .catch(() => {
                setTwigEnabled(false);
            });
    }, []);

    if (!showFrameworkSelectorTools) {
        return null;
    }

    return (
        <>
            <IconButton
                active={globals[KEY] === FRAMEWORK.REACT}
                disabled={isLocked}
                key={FRAMEWORK.REACT}
                onClick={() => {
                    toggle(FRAMEWORK.REACT);
                }}
                title="React"
            >
                React
            </IconButton>
            <IconButton
                active={isTwigActive}
                disabled={isLocked}
                key={FRAMEWORK.TWIG}
                onClick={() => {
                    toggle(FRAMEWORK.TWIG);
                }}
                title="Twig"
            >
                Twig
            </IconButton>
            {renderTwigLink()}
        </>
    );
});

Tool.displayName = 'Tool';
