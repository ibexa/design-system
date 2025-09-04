import React from 'react';

import BaseInputsList from '@ids-internal/partials/BaseInputsList';
import RadioButtonField from '../RadioButtonField';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { DIRECTION, RadioButtonItem, RadioButtonsListProps } from './RadioButtonsList.types';

const RadioButtonsList = ({
    className = '',
    direction = DIRECTION.VERTICAL,
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
}: RadioButtonsListProps) => {
    const helperTextProps = {
        children: helperText,
        type: 'default' as const,
        ...helperTextExtra,
    };
    const labelProps = {
        children: label,
        error: false,
        htmlFor: id,
        required,
        ...labelExtra,
    };
    const renderItem = (item: RadioButtonItem) => {
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
    }

    return (
        <BaseInputsList
            className={className}
            direction={direction}
            helperTextProps={helperTextProps}
            items={items}
            labelProps={labelProps}
            renderItem={renderItem}
        />
    );
};

export default RadioButtonsList;

export const RadioButtonsListStateful = withStateValue<RadioButtonsListProps, string>(RadioButtonsList);
