import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { FormLabelProps } from './FormLabel.types';

const FormLabel = ({
    children,
    htmlFor,
    error = false,
    extraAria = {},
    extraClasses = '',
    required = false,
    title = '',
}: FormLabelProps) => {
    const classes = createCssClassNames({
        'ids-label': true,
        'ids-label--error': error,
        'ids-label--required': required,
        [extraClasses]: true,
    });

    return (
        <label className={classes} htmlFor={htmlFor} title={title} {...extraAria}>
            {children}
        </label>
    );
};

export default FormLabel;
