import React, { useCallback } from 'react';

import BaseChoiceInputField from '@ids-internal/partials/BaseChoiceInputField';
import RadioButton from '../../inputs/RadioButton';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-internal/hoc/withStateChecked';

import { RadioButtonFieldProps } from './RadioButtonField.types';

const RadioButtonField = ({
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
        return <RadioButton {...inputProps} />;
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

export default RadioButtonField;

export const RadioButtonFieldStateful = withStateChecked<RadioButtonFieldProps>(RadioButtonField);
