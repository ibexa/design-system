import React from 'react';

import { BaseField } from '@ids-partials/BaseField';
import { createCssClassNames } from '@ids-core';

import { BaseInputsListProps, Direction } from './BaseInputsList.types';

export const BaseInputsList = <T,>({
    items,
    renderItem,
    className = '',
    direction = Direction.Vertical,
    helperTextProps,
    labelProps,
}: BaseInputsListProps<T>) => {
    const listClassName = createCssClassNames({
        'ids-choice-inputs-list': true,
        [`ids-choice-inputs-list--${direction}`]: true,
        [className]: true,
    });
    return (
        <BaseField className={listClassName} helperText={helperTextProps} label={labelProps} type="list">
            <div className="ids-choice-inputs-list__items">{items.map((item) => renderItem(item))}</div>
        </BaseField>
    );
};
