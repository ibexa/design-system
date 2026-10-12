import React, { useId, useState } from 'react';

import { createCssClassNames } from '@ids-core';

import { TabsChangeEvent, TabsProps, TabsStatefulProps } from './Tabs.types';
import { TabsPanel } from './components/TabsPanel';
import { TabsTab } from './components/TabsTab';
import { useTabsKeyboardNavigation } from './hooks/useTabsKeyboardNavigation';

export const Tabs = ({ className = '', extraAria = {}, idPrefix, items, onChange, selectedId }: TabsProps) => {
    const generatedIdPrefix = useId();
    const prefix = idPrefix ?? generatedIdPrefix;
    const hasPanels = items.some((item) => item.content !== undefined);
    const componentClassName = createCssClassNames({
        'ids-tabs': true,
        [className]: !!className,
    });
    const getTabId = (id: string) => `${prefix}-tab-${id}`;
    const getPanelId = (id: string) => (hasPanels ? `${prefix}-panel-${id}` : undefined);
    const selectTab = (id: string, event: TabsChangeEvent) => {
        if (id !== selectedId) {
            onChange?.(id, event);
        }
    };
    const { handleKeyDown, setTabNode } = useTabsKeyboardNavigation(items, selectedId, selectTab);

    return (
        <div className={componentClassName}>
            <ul className="ids-tabs__list" onKeyDown={handleKeyDown} role="tablist" {...extraAria}>
                {items.map((item) => (
                    <TabsTab
                        id={getTabId(item.id)}
                        isSelected={item.id === selectedId}
                        item={item}
                        key={item.id}
                        onSelect={selectTab}
                        panelId={getPanelId(item.id)}
                        setRef={setTabNode(item.id)}
                    />
                ))}
            </ul>
            {hasPanels && (
                <div className="ids-tabs__panels">
                    {items.map((item) => (
                        <TabsPanel
                            id={getPanelId(item.id) ?? ''}
                            isSelected={item.id === selectedId}
                            key={item.id}
                            tabId={getTabId(item.id)}
                        >
                            {item.content}
                        </TabsPanel>
                    ))}
                </div>
            )}
        </div>
    );
};

export const TabsStateful = ({ initialSelectedId, items, onChange, ...restProps }: TabsStatefulProps) => {
    const [selectedId, setSelectedId] = useState(initialSelectedId ?? items.at(0)?.id ?? '');
    const handleChange = (id: string, event: TabsChangeEvent) => {
        setSelectedId(id);
        onChange?.(id, event);
    };

    return <Tabs {...restProps} items={items} onChange={handleChange} selectedId={selectedId} />;
};
