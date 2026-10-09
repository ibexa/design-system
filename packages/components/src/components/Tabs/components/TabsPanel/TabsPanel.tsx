import React, { ReactNode } from 'react';

import { createCssClassNames } from '@ids-core';

interface TabsPanelProps {
    children: ReactNode;
    id: string;
    isSelected: boolean;
    tabId: string;
}

export const TabsPanel = ({ children, id, isSelected, tabId }: TabsPanelProps) => {
    const panelClassName = createCssClassNames({
        'ids-tabs__panel': true,
        'ids-tabs__panel--selected': isSelected,
    });

    return (
        <div aria-labelledby={tabId} className={panelClassName} hidden={!isSelected} id={id} role="tabpanel">
            {children}
        </div>
    );
};
