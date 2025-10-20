import React, { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';

import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from 'storybook/internal/types';
import { useArgs, useGlobals } from 'storybook/internal/preview-api';

import { FRAMEWORK, ROUTES } from './constants';

type argsType = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
interface IframeMethods {
    width?: never;
    height?: never;
    method: string;
    args: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}
type IframeMessageData = IframeMethods;

const getStoryId = (kind: string) => {
    const storyId = kind.replace('components/src/', '');

    return storyId;
};
const getIframeSrc = (id: string, args: argsType) => {
    const baseUrl = process.env.TWIG_COMPONENTS_BASE_URL;

    if (baseUrl === undefined || baseUrl === '') {
        throw new Error('TWIG_COMPONENTS_BASE_URL environment variable is not set.');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const storyProperties = Object.entries(args).reduce((accumulator: argsType, [propertyName, propertyValue]: [string, any]) => {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        if (typeof propertyValue === 'function') {
            return accumulator;
        }

        let propertyFinalValue = propertyValue;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (React.isValidElement(propertyValue)) {
            propertyFinalValue = renderToString(propertyValue);
        }

        return { ...accumulator, [propertyName]: propertyFinalValue };
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    }, {});
    const storyPropertiesStringified = JSON.stringify(storyProperties);
    const previewUrl = new URL(`${ROUTES.PREVIEW}/${id}`, baseUrl);

    previewUrl.searchParams.set('properties', storyPropertiesStringified);

    return previewUrl.toString();
};

// eslint-disable-next-line ibexa/max-lines-per-function-jsx
const FrameworkSelectorDecorator = (StoryFn: StoryFunction, context: StoryContext): Renderer['storyResult'] | React.JSX.Element => {
    const [globals] = useGlobals();
    const [args] = useArgs();
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { id, title, viewMode }: { id: string; title: string; viewMode: string } = context;
    const isInDocsMode = viewMode === 'docs';
    const renderTwigSelector = () => {
        const storyId = getStoryId(title);
        const twigUrl = getIframeSrc(storyId, args);
        const iframeStyles: React.CSSProperties = {
            border: 0,
        };

        if (isInDocsMode) {
            iframeStyles.opacity = 0;
        } else {
            iframeStyles.width = 'calc(100vw - 28px)';
        }

        return (
            <iframe
                allowFullScreen
                className="twig-preview"
                id={`twig-preview-${id}`}
                key={twigUrl}
                ref={iframeRef}
                src={twigUrl}
                style={iframeStyles}
                title={storyId}
            />
        );
    };
    const handleIframeEvent = (event: MessageEvent<IframeMessageData>) => {
        const { data }: { data: IframeMessageData } = event;

        if (data.method) {
            const callback = args[data.method]; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

            if (callback) {
                callback(...data.args); // eslint-disable-line @typescript-eslint/no-unsafe-call
            }
        }
    };
    const isTwigFramework = globals.frameworkSelector === FRAMEWORK.TWIG;

    useEffect(() => {
        if (!isTwigFramework || isInDocsMode) {
            return;
        }

        window.addEventListener('message', handleIframeEvent, false);

        return () => {
            window.removeEventListener('message', handleIframeEvent, false);
        };
    }, [isTwigFramework, isInDocsMode]);

    useEffect(() => {
        if (!isTwigFramework || !iframeRef.current || !isInDocsMode) {
            return;
        }

        const docStoryWrapper = iframeRef.current.closest('.docs-story')?.firstChild;

        if (!docStoryWrapper || !(docStoryWrapper instanceof HTMLElement)) {
            return;
        }

        const EXTRA_BORDER_SPACE = 16;
        const docStoryWrapperStyles = window.getComputedStyle(docStoryWrapper);

        iframeRef.current.style.width = `${parseInt(docStoryWrapperStyles.width, 10) - EXTRA_BORDER_SPACE}px`;
        iframeRef.current.style.opacity = '1';
    }, [isTwigFramework, isInDocsMode]);

    switch (globals.frameworkSelector) {
        case FRAMEWORK.REACT:
            return StoryFn();
        case FRAMEWORK.TWIG:
            return renderTwigSelector();
        default:
            return StoryFn();
    }
};

export default FrameworkSelectorDecorator;
