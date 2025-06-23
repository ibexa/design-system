import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { LabelProps } from './Label.types';

const Label = ({ children, htmlFor, error = false, extraClasses = '', required = false, title = '' }: LabelProps) => {
    const classes = createCssClassNames({
        'ids-label': true,
        'ids-label--error': error,
        'ids-label--required': required,
        [extraClasses]: !!extraClasses,
    });

    return (
        <label className={classes} htmlFor={htmlFor} title={title}>
            {children}
        </label>
    );
};

export default Label;
