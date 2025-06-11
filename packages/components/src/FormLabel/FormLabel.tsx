import React from 'react';

import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { FormLabelProps } from './FormLabel.types';

const FormLabel = ({ children, htmlFor, error = false, extraClasses = '', required = false, title = '' }: FormLabelProps) => {
    const classes = createCssClassNames({
        'ids-form-label': true,
        'ids-form-label--error': error,
        'ids-form-label--required': required,
        [extraClasses]: true,
    });

    return (
        <label className={classes} htmlFor={htmlFor} title={title}>
            {children}
        </label>
    );
};

export default FormLabel;
