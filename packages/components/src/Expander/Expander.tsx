import React from 'react';

import Button from '../Button';
import Icon from '../Icon';

import { createCssClassNames } from '../internal/shared/css.class.names';

import { ExpanderProps } from './Expander.types';

const ICONS_MAP = {
    caret: 'caret-down',
    triangle: 'arrow-down',
} as const;

const Expander = ({ onClick, collapseLabel = '', expandLabel = '', hasIcon = true, isExpanded = false, type = 'caret' }: ExpanderProps) => {
    const label = isExpanded ? collapseLabel : expandLabel;
    const extraClasses = createCssClassNames({
        'ibexa-expander': true,
        'ibexa-expander--has-icon': hasIcon,
        'ibexa-expander--has-label': label !== '',
        'ibexa-expander--is-expanded': isExpanded,
    });
    const renderExpanderIcon = () => {
        if (!hasIcon) {
            return null;
        }

        return <Icon cssClass="ibexa-icon" name={ICONS_MAP[type]} size="small" />;
    };

    return (
        <Button
            extraClasses={extraClasses}
            onClick={() => {
                onClick(!isExpanded);
            }}
            size="small"
            type="black-tertiary"
        >
            {label}
            {renderExpanderIcon()}
        </Button>
    );
};

export default Expander;
