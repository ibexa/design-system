import React, { memo, useCallback, useEffect, useState } from 'react';

import { IconButton } from 'storybook/internal/components';
import { useGlobals } from 'storybook/internal/manager-api';

import { FRAMEWORK, KEY, ROUTES } from '../constants';

export const Tool = memo(() => {
    const [globals, updateGlobals, storyGlobals] = useGlobals();
    const [twigEnabled, setTwigEnabled] = useState(false);
    const isLocked = KEY in storyGlobals;
    const isTwigActive = globals[KEY] === FRAMEWORK.TWIG;
    const toggle = useCallback((frameworkId: string) => {
        updateGlobals({
            [KEY]: frameworkId,
        });
    }, []);
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
    }, [isTwigActive]);

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
            {twigEnabled && (
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
            )}
            {renderTwigLink()}
        </>
    );
});

Tool.displayName = 'Tool';
