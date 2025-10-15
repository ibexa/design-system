import React from 'react';

import { BaseInputsList } from '@ids-partials/BaseInputsList';
import { HelperTextType } from '@ids-components/HelperText';
import { RadioButtonField } from '../RadioButtonField';
import { createCssClassNames } from '@ids-core/helpers/cssClassNames';
import withStateValue from '@ids-hoc/withStateValue';

import { RadioButtonsListFieldDirection, RadioButtonsListFieldItem, RadioButtonsListFieldProps } from './RadioButtonsListField.types';

export const RadioButtonsListField = ({
    className = '',
    direction = RadioButtonsListFieldDirection.Vertical,
    helperText,
    helperTextExtra = {},
    id,
    items,
    label,
    labelExtra = {},
    name,
    onChange = () => undefined,
    required = false,
    value = '',
}: RadioButtonsListFieldProps) => {
    const componentClassName = createCssClassNames({
        'ids-radio-buttons-list-field': true,
        [className]: !!className,
    });
    const helperTextProps = {
        children: helperText,
        type: HelperTextType.Default,
        ...helperTextExtra,
    };
    const labelProps = {
        children: label,
        error: false,
        htmlFor: id,
        required,
        ...labelExtra,
    };
    const renderItem = (item: RadioButtonsListFieldItem) => {
        return (
            <RadioButtonField
                {...item}
                checked={item.value === value}
                name={name}
                onChange={(...args) => {
                    onChange(item.value);
                    item.onChange?.(...args);
                }}
            />
        );
    };

    return (
        <BaseInputsList
            className={componentClassName}
            direction={direction}
            helperTextProps={helperTextProps}
            items={items}
            labelProps={labelProps}
            renderItem={renderItem}
        />
    );
};

export const RadioButtonsListFieldStateful = withStateValue<RadioButtonsListFieldProps, string>(RadioButtonsListField);
