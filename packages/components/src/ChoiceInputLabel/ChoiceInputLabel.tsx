import React from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { ChoiceInputLabelProps } from './ChoiceInputLabel.types';

const ChoiceInputLabel = ({ children, htmlFor, className = '', title = '' }: ChoiceInputLabelProps) => {
    const labelClassName = createCssClassNames({
        'ids-choice-input-label': true,
        [className]: !!className,
    });

    return (
        <label className={labelClassName} htmlFor={htmlFor} title={title}>
            {children}
        </label>
    );
};

export default ChoiceInputLabel;
