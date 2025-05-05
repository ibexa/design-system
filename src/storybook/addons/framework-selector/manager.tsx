import React from 'react';

import { addons, types } from 'storybook/internal/manager-api';

import { ADDON_ID, TOOL_ID } from './constants';
import { Tool } from './components/Tool';

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use 'src/manager.tsx',
 */

// Register the addon
addons.register(ADDON_ID, () => {
    // Register a tool
    addons.add(TOOL_ID, {
        render: () => <Tool />,
        title: 'Framework selector',
        type: types.TOOL,
    });
});
