import React from 'react';

import { BaseChoiceInput } from '@ids-partials/BaseChoiceInput';
import { createCssClassNames } from '@ids-core';
import { withStateChecked } from '@ids-hoc/withStateChecked';

import { CheckboxInputProps } from './CheckboxInput.types';

export const CheckboxInput = ({ className = '', indeterminate = false, ...restProps }: CheckboxInputProps) => {
    const checkboxClassName = createCssClassNames({
        [className]: !!className,
        'ids-input--indeterminate': indeterminate,
    });

    return (
        <BaseChoiceInput
            className={checkboxClassName}
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
