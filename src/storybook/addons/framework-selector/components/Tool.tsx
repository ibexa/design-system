import React, { memo, useCallback } from 'react';

import { IconButton } from 'storybook/internal/components';
import { useGlobals } from 'storybook/internal/manager-api';

import { FRAMEWORK, KEY } from '../constants';

export const Tool = memo(() => {
    const [globals, updateGlobals, storyGlobals] = useGlobals();
    const isLocked = KEY in storyGlobals;
    const toggle = useCallback((frameworkId: string) => {
        updateGlobals({
            [KEY]: frameworkId,
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
            <IconButton
                active={globals[KEY] === FRAMEWORK.TWIG}
                disabled={isLocked}
                key={FRAMEWORK.TWIG}
                onClick={() => {
                    toggle(FRAMEWORK.TWIG);
                }}
                title="Twig"
            >
                Twig
            </IconButton>
        </>
    );
});
