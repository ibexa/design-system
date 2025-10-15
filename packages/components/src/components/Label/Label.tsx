import React from 'react';

import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { LabelProps } from './Label.types';

export const Label = ({ children, htmlFor, error = false, className = '', required = false, title = '' }: LabelProps) => {
    const componentClassName = createCssClassNames({
        'ids-label': true,
        'ids-label--error': error,
        'ids-label--required': required,
        [className]: !!className,
    });

    return (
        <label className={componentClassName} htmlFor={htmlFor} title={title}>
            {children}
        </label>
    );
};
