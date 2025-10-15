import React from 'react';

import { BaseChoiceInput } from '@ids-partials/BaseChoiceInput';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-hoc/withStateChecked';

import { CheckboxInputProps } from './CheckboxInput.types';

export const CheckboxInput = ({ className = '', indeterminate = false, ...restProps }: CheckboxInputProps) => {
    const checkboxClassName = createCssClassNames({
        'ids-checkbox': true,
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

export const CheckboxInputStateful = withStateChecked<CheckboxInputProps>(CheckboxInput);
