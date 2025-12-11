import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { HelperTextProps, HelperTextType } from './HelperText.types';

const ICONS_TYPE_MAP = {
    default: 'info-circle',
    error: 'alert-error',
} as const;

export const HelperText = ({ children, className = '', title = '', type = HelperTextType.Default }: HelperTextProps) => {
    if (!children) {
        return null;
    }

    const componentClassName = createCssClassNames({
        'ids-helper-text': true,
        [`ids-helper-text--${type}`]: !!type,
        [className]: !!className,
    });

    return (
        <div className={componentClassName} title={title}>
            <div className="ids-helper-text__icon-wrapper">
                <Icon className="ids-helper-text__icon" name={ICONS_TYPE_MAP[type]} size={IconSize.TinySmall} />
            </div>
            <div className="ids-helper-text__content-wrapper">{children}</div>
        </div>
    );
};
