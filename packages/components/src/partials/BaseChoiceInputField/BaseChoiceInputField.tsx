import React from 'react';

import { ChoiceInputLabel } from '@ids-components/ChoiceInputLabel';
import { createCssClassNames } from '@ids-core';

import { BaseChoiceInputFieldProps } from './BaseChoiceInputField.types';

export const BaseChoiceInputField = ({
    children,
    className = '',
    id,
    inputWrapperClassName = '',
    labelClassName = '',
    renderInput,
}: BaseChoiceInputFieldProps) => {
    const componentClassName = createCssClassNames({
        'ids-choice-input-field': true,
        [className]: true,
    });
    const componentInputWrapperClassName = createCssClassNames({
        'ids-choice-input-field__input-wrapper': true,
        [inputWrapperClassName]: true,
    });
    const componentLabelClassName = createCssClassNames({
        'ids-choice-input-field__label': true,
        [labelClassName]: true,
    });

    return (
        <div className={componentClassName}>
            <div className={componentInputWrapperClassName}>{renderInput()}</div>
            <ChoiceInputLabel className={componentLabelClassName} htmlFor={id}>
                {children}
            </ChoiceInputLabel>
        </div>
    );
};
