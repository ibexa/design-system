import React from 'react';

import BaseChoiceInput from '@ids-internal/partials/BaseChoiceInput';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { CheckboxProps } from './Checkbox.types';

const Checkbox = ({ className = '', ...restProps }: CheckboxProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox': true,
        [className]: true,
    });

    return <BaseChoiceInput {...restProps} className={checkboxClassName} type="checkbox" />;
};

export default Checkbox;

export const CheckboxStateful = withStateChecked(Checkbox);
