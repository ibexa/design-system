import React from 'react';

import BaseChoiceInput from '@ids-internal/partials/BaseChoiceInput';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { RadioButtonProps } from './RadioButton.types';

const RadioButton = ({ className = '', ...restProps }: RadioButtonProps) => {
    const radioButtonClassName = createCssClassNames({
        'ids-radio-button': true,
        [className]: true,
    });

    return <BaseChoiceInput {...restProps} className={radioButtonClassName} type="radio" />;
};

export default RadioButton;

export const RadioButtonStateful = withStateChecked<RadioButtonProps>(RadioButton);
