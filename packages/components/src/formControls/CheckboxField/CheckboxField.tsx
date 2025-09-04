import React, { useCallback } from 'react';

import ThreeStateCheckbox, { ThreeStateCheckboxProps } from '../../inputs/ThreeStateCheckbox';
import BaseChoiceInputField from '@ids-internal/partials/BaseChoiceInputField';
import Checkbox from '../../inputs/Checkbox';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { CheckboxFieldProps } from './CheckboxField.types';

const CheckboxField = ({
    className = '',
    label,
    inputWrapperClassName = '',
    labelClassName = '',
    useIndeterminate = false,
    ...inputProps
}: CheckboxFieldProps) => {
    const fieldClassName = createCssClassNames({
        'ids-checkbox-field': true,
        'ids-checkbox-field--indeterminate': useIndeterminate,
        [className]: !!className,
    });
    const renderInput = useCallback(() => {
        if (useIndeterminate) {
            const threeStateProps = inputProps as ThreeStateCheckboxProps; // eslint-disable-line @typescript-eslint/no-unsafe-type-assertion

            return <ThreeStateCheckbox {...threeStateProps} />;
        }

        return <Checkbox {...inputProps} />;
    }, [inputProps, useIndeterminate]);

    return (
        <BaseChoiceInputField
            className={fieldClassName}
            id={inputProps.id}
            inputWrapperClassName={inputWrapperClassName}
            labelClassName={labelClassName}
            renderInput={renderInput}
        >
            {label}
        </BaseChoiceInputField>
    );
};

export default CheckboxField;

export const CheckboxFieldStateful = withStateChecked<CheckboxFieldProps>(CheckboxField);
