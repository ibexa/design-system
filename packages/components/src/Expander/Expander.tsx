import React from 'react';

import Button, { ButtonSize, ButtonType } from '../Button';
import Icon, { IconSize } from '../Icon';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { ExpanderProps, ExpanderType } from './Expander.types';

const ICONS_MAP = {
    [ExpanderType.caret]: 'arrow-caret-down',
    [ExpanderType.chevron]: 'arrow-chevron-down',
} as const;

const Expander = ({ onClick, type, collapseLabel = '', expandLabel = '', hasIcon = true, isExpanded = false }: ExpanderProps) => {
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

export default Expander;
