import React from 'react';

import BaseSelectionInput from '@ids-internal/partials/BaseSelectionInput';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { RadioButtonProps } from './RadioButton.types';

const RadioButton = ({ className = '', ...restProps }: RadioButtonProps) => {
    const radioButtonClassName = createCssClassNames({
        'ids-radio-button': true,
        [className]: true,
    });

    return <BaseSelectionInput {...restProps} className={radioButtonClassName} type="radio" />;
};

export default RadioButton;

export const RadioButtonStateful = withStateChecked(RadioButton);
