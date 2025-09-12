import React from 'react';

import { BaseChoiceInput } from '@ids-partials/BaseChoiceInput';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-hoc/withStateChecked';

import { ThreeStateCheckboxInputProps } from './ThreeStateCheckboxInput.types';

export const ThreeStateCheckboxInput = ({ className = '', indeterminate = false, ...restProps }: ThreeStateCheckboxInputProps) => {
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

export const ThreeStateCheckboxInputStateful = withStateChecked<ThreeStateCheckboxInputProps>(ThreeStateCheckboxInput);
