import React, { useCallback } from 'react';

import { AltRadioInput } from '../AltRadioInput';
import { BaseInputsList } from '@ids-partials/BaseInputsList';
import { HelperTextType } from '@ids-components/HelperText';
import withStateValue from '@ids-hoc/withStateValue';

import { AltRadiosListFieldDirection, AltRadiosListFieldItem, AltRadiosListFieldProps } from './AltRadiosListField.types';

export const AltRadiosListField = ({
    className = '',
    direction = AltRadiosListFieldDirection.Horizontal,
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
}: AltRadiosListFieldProps) => {
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
    const renderItem = useCallback(
        (item: AltRadiosListFieldItem) => {
            return (
                <AltRadioInput
                    {...item}
                    checked={item.value === value}
                    key={item.id}
                    name={name}
                    onChange={(...args) => {
                        onChange(item.value);
                        item.onChange?.(...args);
                    }}
                />
            );
        },
        [value, name, onChange],
    );

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

export const AltRadiosListFieldStateful = withStateValue<AltRadiosListFieldProps, string>(AltRadiosListField);
