import React from 'react';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { ExpanderProps, ExpanderType } from './Expander.types';

const ICONS_MAP = {
    [ExpanderType.Caret]: 'arrow-caret-down',
    [ExpanderType.Chevron]: 'arrow-chevron-down',
} as const;

export const Expander = ({
    onClick = () => undefined,
    type,
    collapseLabel = '',
    expandLabel = '',
    hasIcon = true,
    isExpanded = false,
    isFocusable = true,
}: ExpanderProps) => {
    const label = isExpanded ? collapseLabel : expandLabel;
    const componentClassName = createCssClassNames({
        'ids-expander': true,
        'ids-expander--has-icon': hasIcon,
        'ids-expander--has-label': label !== '',
        'ids-expander--is-expanded': isExpanded,
    });
    const extraAria = {
        'aria-expanded': isExpanded,
    };
    const renderExpanderIcon = () => {
        if (!hasIcon) {
            return null;
        }

        return <Icon name={ICONS_MAP[type]} size={IconSize.Small} />;
    };

    return (
        <Button
            ariaLabel={label}
            className={componentClassName}
            extraAria={extraAria}
            isFocusable={isFocusable}
            onClick={() => {
                onClick(!isExpanded);
            }}
            size={ButtonSize.Small}
            type={ButtonType.TertiaryAlt}
        >
            {label}
            {renderExpanderIcon()}
        </Button>
    );
};
