import React from 'react';

import Checkbox from '../Checkbox';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';

import { ThreeStateCheckboxProps } from './ThreeStateCheckbox.types';

const ThreeStateCheckbox = ({ checked = false, className = '', indeterminate = false, ...restProps }: ThreeStateCheckboxProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox--three-state': true,
        [className]: true,
    });

    return (
        <Checkbox
            checked={checked}
            className={checkboxClassName}
            ref={(node) => {
                if (node) {
                    node.indeterminate = indeterminate && checked; // eslint-disable-line no-param-reassign
                }
            }}
            {...restProps}
        />
    );
};

export default ThreeStateCheckbox;
