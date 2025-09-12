import React from 'react';

import { BaseChoiceInput } from '@ids-partials/BaseChoiceInput';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-hoc/withStateChecked';

import { CheckboxInputProps } from './CheckboxInput.types';

export const CheckboxInput = ({ className = '', ...restProps }: CheckboxInputProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox': true,
        [className]: true,
    });

    return <BaseChoiceInput {...restProps} className={checkboxClassName} type="checkbox" />;
};

export const CheckboxInputStateful = withStateChecked<CheckboxInputProps>(CheckboxInput);
