import React from 'react';

import { BaseChoiceInput } from '@ids-partials/BaseChoiceInput';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-hoc/withStateChecked';

import { RadioButtonInputProps } from './RadioButtonInput.types';

export const RadioButtonInput = ({ className = '', ...restProps }: RadioButtonInputProps) => {
    const radioButtonClassName = createCssClassNames({
        'ids-radio-button': true,
        [className]: true,
    });

    return <BaseChoiceInput {...restProps} className={radioButtonClassName} type="radio" />;
};

export const RadioButtonInputStateful = withStateChecked<RadioButtonInputProps>(RadioButtonInput);
