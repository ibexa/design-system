import React from 'react';

import { BaseField } from '@ids-partials/BaseField';
import { HelperTextType } from '@ids-components/HelperText';
import { ToggleButtonInput } from '../ToggleButtonInput';
import withStateChecked from '@ids-hoc/withStateChecked';

import { ToggleButtonFieldProps } from './ToggleButtonField.types';

export const ToggleButtonField = ({
    checked = false,
    helperText,
    helperTextExtra = {},
    id,
    input = {},
    label,
    labelExtra = {},
    name,
    onChange = () => undefined,
    required = false,
}: ToggleButtonFieldProps) => {
    const helperTextProps = {
        children: helperText,
        type: HelperTextType.Default,
        ...helperTextExtra,
    };
    const labelProps = {
        children: label,
        required,
        ...labelExtra,
    };
    const inputProps = {
        ...input,
        checked,
        id,
        name,
        onChange,
    };

    return (
        <BaseField helperText={helperTextProps} label={labelProps} type="toggle">
            <ToggleButtonInput {...inputProps} />
        </BaseField>
    );
};

export const ToggleButtonFieldStateful = withStateChecked<ToggleButtonFieldProps>(ToggleButtonField);
