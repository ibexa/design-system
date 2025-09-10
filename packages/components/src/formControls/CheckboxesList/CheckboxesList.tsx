import React, { useCallback } from 'react';

import BaseInputsList from '@ids-internal/partials/BaseInputsList';
import CheckboxField from '../CheckboxField';
import { HelperTextType } from '../../HelperText';
import withStateValue from '@ids-internal/hoc/withStateValue';

import { CheckboxItem, CheckboxesListAction, CheckboxesListProps, Direction } from './CheckboxesList.types';

const CheckboxesList = ({
    className = '',
    direction = Direction.Vertical,
    helperText,
    helperTextExtra = {},
    id,
    items,
    label,
    labelExtra = {},
    name,
    onChange = () => undefined,
    required = false,
    value = [],
}: CheckboxesListProps) => {
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
    const addOrRemoveItem = useCallback(
        (itemValue: string, itemAdded: boolean) => {
            if (itemAdded) {
                return [...value, itemValue];
            }

            return value.filter((checkedValue) => checkedValue !== itemValue);
        },
        [value],
    );
    const renderItem = useCallback(
        (item: CheckboxItem) => {
            return (
                <CheckboxField
                    {...item}
                    checked={value.includes(item.value)}
                    key={item.id}
                    name={name}
                    onChange={(...args) => {
                        const [itemAdded] = args;
                        const nextValue = addOrRemoveItem(item.value, itemAdded);
                        const actionPerformed = itemAdded ? CheckboxesListAction.Check : CheckboxesListAction.Uncheck;

                        onChange(nextValue, item.value, actionPerformed);
                        item.onChange?.(...args);
                    }}
                />
            );
        },
        [addOrRemoveItem, name, onChange, value],
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

export default CheckboxesList;

export const CheckboxesListStateful = withStateValue<CheckboxesListProps, string[]>(CheckboxesList);
