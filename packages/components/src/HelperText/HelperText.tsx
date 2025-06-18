import React from 'react';

import Icon from '../Icon';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { HelperTextProps } from './HelperText.types';

const ICONS_TYPE_MAP = {
    default: 'info-circle',
    error: 'alert-error',
} as const;

const HelperText = ({ children, extraClasses = '', title = '', type = 'default' }: HelperTextProps) => {
    const classes = createCssClassNames({
        'ids-helper-text': true,
        [`ids-helper-text--${type}`]: !!type,
        [extraClasses]: true,
    });

    return (
        <div className={classes} title={title}>
            <div className="ids-helper-text__icon-wrapper">
                <Icon cssClass="ids-icon ids-helper-text__icon" name={ICONS_TYPE_MAP[type]} size="small" />
            </div>
            <div className="ids-helper-text__content-wrapper">{children}</div>
        </div>
    );
};

export default HelperText;
