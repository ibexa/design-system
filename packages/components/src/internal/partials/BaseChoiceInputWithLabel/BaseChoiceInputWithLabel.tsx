import React from 'react';

import ChoiceInputLabel from '../../../ChoiceInputLabel';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { BaseChoiceInputWithLabelProps } from './BaseChoiceInputWithLabel.types';

const BaseChoiceInputWithLabel = ({
    children,
    className = '',
    id,
    inputWrapperClassName = '',
    labelClassName = '',
    renderInput,
}: BaseChoiceInputWithLabelProps) => {
    const componentClassName = createCssClassNames({
        'ids-choice-input-with-label': true,
        [className]: true,
    });
    const componentInputWrapperClassName = createCssClassNames({
        'ids-choice-input-with-label__input-wrapper': true,
        [inputWrapperClassName]: true,
    });
    const componentLabelClassName = createCssClassNames({
        'ids-choice-input-with-label__label': true,
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

export default BaseChoiceInputWithLabel;
