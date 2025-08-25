import React from 'react';

import BaseSelectionInput from '@ids-internal/partials/BaseSelectionInput';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { CheckboxProps } from './Checkbox.types';

const Checkbox = ({ className = '', ...restProps }: CheckboxProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox': true,
        [className]: true,
    });

    return <BaseSelectionInput {...restProps} className={checkboxClassName} type="checkbox" />;
};

export default Checkbox;

export const CheckboxStateful = withStateChecked(Checkbox);
