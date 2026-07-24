import React from 'react';

import { BaseChoiceInput } from '@ids-partials/BaseChoiceInput';
import { withStateChecked } from '@ids-hoc/withStateChecked';

import { RadioButtonInputProps } from './RadioButtonInput.types';

export const RadioButtonInput = ({ className = '', ...restProps }: RadioButtonInputProps) => {
    return <BaseChoiceInput {...restProps} className={className} type="radio" />;
};

export const RadioButtonInputStateful = withStateChecked<RadioButtonInputProps>(RadioButtonInput);
