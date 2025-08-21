import React from 'react';

import Checkbox from '../Checkbox';
import { createCssClassNames } from '@ids-internal/shared/css.class.names';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { ThreeStateCheckboxProps } from './ThreeStateCheckbox.types';

const ThreeStateCheckbox = ({ className = '', indeterminate = false, ...restProps }: ThreeStateCheckboxProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox--three-state': true,
        [className]: true,
    });

    return (
        <Checkbox
            className={checkboxClassName}
            ref={(node) => {
                if (node) {
                    node.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
                }
            }}
            {...restProps}
        />
    );
};

export default ThreeStateCheckbox;

export const ThreeStateCheckboxStateful = withStateValue<boolean>(ThreeStateCheckbox);
