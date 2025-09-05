import React, { useCallback } from 'react';

import AltRadio from '../../inputs/AltRadio';
import BaseInputsList from '@ids-internal/partials/BaseInputsList';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { AltRadioItem, AltRadioListProps, DIRECTION } from './AltRadioList.types';

const AltRadioList = ({
    className = '',
    direction = DIRECTION.HORIZONTAL,
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
}: AltRadioListProps) => {
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
    const renderItem = useCallback(
        (item: AltRadioItem) => {
            return (
                <AltRadio
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

export default AltRadioList;

export const AltRadioListStateful = withStateValue<AltRadioListProps, string>(AltRadioList);
