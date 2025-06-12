import React, { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';

import type { Renderer, StoryContext, PartialStoryFn as StoryFunction } from 'storybook/internal/types';
import { useArgs, useGlobals } from 'storybook/internal/preview-api';

import { FRAMEWORK, ROUTES } from './constants';

type argsType = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
interface IframeResize {
    width: number;
    height: number;
    method?: never;
    args?: never;
}
interface IframeMethods {
    width?: never;
    height?: never;
    method: string;
    args: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}
type IframeMessageData = IframeResize | IframeMethods;

const camelCaseToSnakeCase = (str: string) => str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();
const getStoryId = (kind: string) => {
    const storyId = kind.replace('components/src/', '');

    return camelCaseToSnakeCase(storyId);
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

        const properyFinalName = camelCaseToSnakeCase(propertyName);
        let propertyFinalValue = propertyValue;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (React.isValidElement(propertyValue)) {
            propertyFinalValue = renderToString(propertyValue);
        }

        return { ...accumulator, [properyFinalName]: propertyFinalValue };
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */
    }, {});
    const storyPropertiesStringified = JSON.stringify(storyProperties);
    const previewUrl = new URL(`${ROUTES.PREVIEW}/${id}`, baseUrl);

    previewUrl.searchParams.set('properties', storyPropertiesStringified);

    return previewUrl.toString();
};

// eslint-disable-next-line ibexa/max-lines-per-function-jsx
const FrameworkSelectorDecorator = (
    StoryFn: StoryFunction<Renderer>,
    context: StoryContext<Renderer>,
): Renderer['storyResult'] | React.JSX.Element => {
    const [globals] = useGlobals();
    const [args] = useArgs();
    const iframeWrapperRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const { id, title }: { id: string; title: string } = context;
    const renderTwigSelector = () => {
        const storyId = getStoryId(title);
        const twigUrl = getIframeSrc(storyId, args);

        return (
            <div ref={iframeWrapperRef} style={{ overflow: 'hidden' }}>
                <iframe
                    className="twig-preview"
                    id={`twig-preview-${id}`}
                    key={twigUrl}
                    ref={iframeRef}
                    src={twigUrl}
                    style={{
                        border: 0,
                    }}
                    title={storyId}
                />
            </div>
        );
    };
    const handleIframeEvent = (event: MessageEvent<IframeMessageData>) => {
        const { data, source }: { data: IframeMessageData; source: MessageEventSource | null } = event;

        if (iframeWrapperRef.current === null || iframeRef.current === null || source !== iframeRef.current.contentWindow) {
            return;
        }

        if (data.width && data.height) {
            iframeRef.current.style.width = `${data.width.toString()}px`;
            iframeRef.current.style.height = `${data.height.toString()}px`;
            iframeWrapperRef.current.style.height = `${data.height.toString()}px`;
        }

        if (data.method) {
            const callback = args[data.method]; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

            if (callback) {
                callback(...data.args); // eslint-disable-line @typescript-eslint/no-unsafe-call
            }
        }
    };
    const isTwigFramework = globals.frameworkSelector === FRAMEWORK.TWIG;

    useEffect(() => {
        if (!isTwigFramework) {
            return;
        }

        window.addEventListener('message', handleIframeEvent, false);

        return () => {
            window.removeEventListener('message', handleIframeEvent, false);
        };
    }, [isTwigFramework]);

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
