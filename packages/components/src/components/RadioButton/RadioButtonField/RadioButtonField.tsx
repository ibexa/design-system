import React, { useCallback } from 'react';

import { BaseChoiceInputField } from '@ids-partials/BaseChoiceInputField';
import { RadioButtonInput } from '../RadioButtonInput';
import { createCssClassNames } from '@ids-core';
import { withStateChecked } from '@ids-hoc/withStateChecked';

import { RadioButtonFieldProps } from './RadioButtonField.types';

export const RadioButtonField = ({
    className = '',
    label,
    inputWrapperClassName = '',
    labelClassName = '',
    ...inputProps
}: RadioButtonFieldProps) => {
    const fieldClassName = createCssClassNames({
        'ids-radio-button-field': true,
        [className]: !!className,
    });
    const renderInput = useCallback(() => {
        return <RadioButtonInput {...inputProps} />;
    }, [inputProps]);

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

export const RadioButtonFieldStateful = withStateChecked<RadioButtonFieldProps>(RadioButtonField);
