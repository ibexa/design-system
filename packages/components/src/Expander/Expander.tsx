import React from 'react';

import Button from '../Button';
import Icon from '../Icon';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { ExpanderProps } from './Expander.types';

const ICONS_MAP = {
    caret: 'arrow-caret-down',
    chevron: 'arrow-chevron-down',
} as const;

const Expander = ({ onClick, type, collapseLabel = '', expandLabel = '', hasIcon = true, isExpanded = false }: ExpanderProps) => {
    const label = isExpanded ? collapseLabel : expandLabel;
    const extraClasses = createCssClassNames({
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

        return <Icon cssClass="ids-icon" name={ICONS_MAP[type]} size="small" />;
    };

    return (
        <Button
            ariaLabel={label}
            extraAria={extraAria}
            extraClasses={extraClasses}
            onClick={() => {
                onClick(!isExpanded);
            }}
            size="small"
            type="tertiary-alt"
        >
            {label}
            {renderExpanderIcon()}
        </Button>
    );
};

export default Expander;
