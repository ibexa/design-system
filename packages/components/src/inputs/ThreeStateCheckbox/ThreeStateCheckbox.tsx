import React from 'react';

import BaseChoiceInput from '@ids-internal/partials/BaseChoiceInput';
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
        <BaseChoiceInput
            className={checkboxClassName}
            inputClassName={inputClassName}
            ref={(node) => {
                if (node) {
                    node.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
                }
            }}
            type="checkbox"
            {...restProps}
        />
    );
};

export default ThreeStateCheckbox;

export const ThreeStateCheckboxStateful = withStateChecked(ThreeStateCheckbox);
