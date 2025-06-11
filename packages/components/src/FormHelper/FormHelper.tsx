import React from 'react';

import Icon from '../Icon';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { FormHelperProps } from './FormHelper.types';

const ICONS_TYPE_MAP = {
    default: 'info-circle',
    error: 'alert-error',
    info: 'message-bubble-info',
    success: 'check-circle',
    warning: 'alert-warning',
} as const;
const ICONS_SIZE_MAP = {
    medium: 'small',
    small: 'tiny-small',
} as const;

const FormHelper = ({ children, extraClasses = '', size = 'medium', title = '', type = 'default' }: FormHelperProps) => {
    const classes = createCssClassNames({
        'ids-form-helper': true,
        [`ids-form-helper--${size}`]: !!size,
        [`ids-form-helper--${type}`]: !!type,
        [extraClasses]: true,
    });

    return (
        <div className={classes} title={title}>
            <div className="ids-form-helper__icon-wrapper">
                <Icon cssClass="ids-icon ids-form-helper__icon" name={ICONS_TYPE_MAP[type]} size={ICONS_SIZE_MAP[size]} />
            </div>
            <div className="ids-form-helper__content-wrapper">{children}</div>
        </div>
    );
};

export default FormHelper;
