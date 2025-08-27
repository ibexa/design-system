import React from 'react';

import BaseCheckbox from '@ids-internal/partials/BaseCheckbox';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { CheckboxProps } from './Checkbox.types';

const Checkbox = ({ className = '', ...restProps }: CheckboxProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox': true,
        [className]: true,
    });

    return <BaseCheckbox {...restProps} className={checkboxClassName} />;
};

export default Checkbox;

export const CheckboxStateful = withStateChecked(Checkbox);
