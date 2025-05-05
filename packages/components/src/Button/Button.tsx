import React from 'react';

import { createCssClassNames } from '../internal/shared/css.class.names';

import { ButtonProps } from './Button.types';

const Button = ({ type = 'primary', size = 'large', children, disabled = false, extraClasses = '', onClick }: ButtonProps) => {
    const classes = createCssClassNames({
        'ibexa-btn': true,
        [`ibexa-btn--${type}`]: !!type,
        [`ibexa-btn--${size}`]: !!size,
        disabled,
        [extraClasses]: true,
    });

    return (
        <button className={classes} onClick={onClick} type="button">
            {children}
        </button>
    );
};

export default Button;
