import React, { useCallback } from 'react';

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
    ...inputProps
}: CheckboxFieldProps) => {
    const fieldClassName = createCssClassNames({
        'ids-checkbox-field': true,
        [className]: !!className,
    });
    const renderInput = useCallback(() => {
        return <Checkbox {...inputProps} />;
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

export default CheckboxField;

export const CheckboxFieldStateful = withStateChecked<CheckboxFieldProps>(CheckboxField);
