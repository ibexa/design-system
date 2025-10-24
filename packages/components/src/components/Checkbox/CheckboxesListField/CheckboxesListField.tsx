import React, { useCallback } from 'react';

import { BaseInputsList } from '@ids-partials/BaseInputsList';
import { CheckboxField } from '../CheckboxField';
import { HelperTextType } from '@ids-components/HelperText';
import { createCssClassNames } from '@ids-core';
import { withStateValue } from '@ids-hoc/withStateValue';

import {
    CheckboxesListFieldAction,
    CheckboxesListFieldDirection,
    CheckboxesListFieldItem,
    CheckboxesListFieldProps,
} from './CheckboxesListField.types';

export const CheckboxesListField = ({
    className = '',
    direction = CheckboxesListFieldDirection.Vertical,
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
}: CheckboxesListFieldProps) => {
    const componentClassName = createCssClassNames({
        'ids-checkboxes-list-field': true,
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
        (item: CheckboxesListFieldItem) => {
            return (
                <CheckboxField
                    {...item}
                    checked={value.includes(item.value)}
                    key={item.id}
                    name={name}
                    onChange={(...args) => {
                        const [itemAdded] = args;
                        const nextValue = addOrRemoveItem(item.value, itemAdded);
                        const actionPerformed = itemAdded ? CheckboxesListFieldAction.Check : CheckboxesListFieldAction.Uncheck;

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
            className={componentClassName}
            direction={direction}
            helperTextProps={helperTextProps}
            items={items}
            labelProps={labelProps}
            renderItem={renderItem}
        />
    );
};

export const CheckboxesListFieldStateful = withStateValue<CheckboxesListFieldProps, string[]>(CheckboxesListField);
