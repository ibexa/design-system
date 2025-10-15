import React, { useCallback } from 'react';

import { BaseChoiceInputField } from '@ids-partials/BaseChoiceInputField';
import { CheckboxInput } from '../CheckboxInput';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';
import withStateChecked from '@ids-hoc/withStateChecked';

import { CheckboxFieldProps } from './CheckboxField.types';

export const CheckboxField = ({
    className = '',
    label,
    inputWrapperClassName = '',
    labelClassName = '',
    ...inputProps
}: CheckboxFieldProps) => {
    const fieldClassName = createCssClassNames({
        'ids-checkbox-field': true,
        [className]: !!className,
    });
    const renderInput = useCallback(() => {
        return <CheckboxInput {...inputProps} />;
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

export const CheckboxFieldStateful = withStateChecked<CheckboxFieldProps>(CheckboxField);
