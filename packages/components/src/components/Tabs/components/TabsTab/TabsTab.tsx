import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { TabsChangeEvent, TabsItem } from '../../Tabs.types';

const ERROR_ICON_NAME = 'alert-error';

interface TabsTabProps {
    id: string;
    isSelected: boolean;
    item: TabsItem;
    onSelect: (id: string, event: TabsChangeEvent) => void;
    panelId?: string;
    setRef: (node: HTMLButtonElement | null) => void;
}

export const TabsTab = ({ id, isSelected, item, onSelect, panelId, setRef }: TabsTabProps) => {
    const { hasError = false, isDisabled = false, label } = item;
    const tabClassName = createCssClassNames({
        'ids-tabs__tab': true,
        'ids-tabs__tab--disabled': isDisabled,
        'ids-tabs__tab--error': hasError,
        'ids-tabs__tab--selected': isSelected,
    });
    const reservedLabel = typeof label === 'string' ? label : undefined;
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onSelect(item.id, event);
    };

    return (
        <li className="ids-tabs__item" role="presentation">
            <button
                aria-controls={panelId}
                aria-selected={isSelected}
                className={tabClassName}
                disabled={isDisabled}
                id={id}
                onClick={handleClick}
                ref={setRef}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
            >
                <span className="ids-tabs__tab-label" data-label={reservedLabel}>
                    {label}
                </span>
                {hasError && <Icon className="ids-tabs__tab-error-icon" name={ERROR_ICON_NAME} size={IconSize.TinySmall} />}
            </button>
        </li>
    );
};
