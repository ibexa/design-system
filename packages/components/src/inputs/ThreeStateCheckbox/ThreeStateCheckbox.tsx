import React from 'react';

import BaseCheckbox from '@ids-internal/partials/BaseCheckbox';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { ThreeStateCheckboxProps } from './ThreeStateCheckbox.types';

const ThreeStateCheckbox = ({ className = '', indeterminate = false, ...restProps }: ThreeStateCheckboxProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-three-state-checkbox': true,
        [className]: true,
    });
    const inputClassName = createCssClassNames({
        'ids-input--indeterminate': indeterminate,
    });

    return (
        <BaseCheckbox
            className={checkboxClassName}
            inputClassName={inputClassName}
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

export const ThreeStateCheckboxStateful = withStateChecked(ThreeStateCheckbox);
