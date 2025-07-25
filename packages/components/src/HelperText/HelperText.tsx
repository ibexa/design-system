import React from 'react';

import Icon from '../Icon';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { HelperTextProps } from './HelperText.types';

const ICONS_TYPE_MAP = {
    default: 'info-circle',
    error: 'alert-error',
} as const;

const HelperText = ({ children, className = '', title = '', type = 'default' }: HelperTextProps) => {
    const componentClassName = createCssClassNames({
        'ids-helper-text': true,
        [`ids-helper-text--${type}`]: !!type,
        [className]: !!className,
    });

    return (
        <div className={componentClassName} title={title}>
            <div className="ids-helper-text__icon-wrapper">
                <Icon className="ids-helper-text__icon" name={ICONS_TYPE_MAP[type]} size="small" />
            </div>
            <div className="ids-helper-text__content-wrapper">{children}</div>
        </div>
    );
};

export default HelperText;
