import React from 'react';

import BaseFormControl from '@ids-internal/partials/BaseFormControl';
import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { BaseInputsListProps, DIRECTION } from './BaseInputsList.types';

const BaseInputsList = <T,>({
    items,
    renderItem,
    className = '',
    direction = DIRECTION.VERTICAL,
    helperTextProps,
    labelProps,
}: BaseInputsListProps<T>) => {
    const listClassName = createCssClassNames({
        'ids-choice-inputs-list': true,
        [`ids-choice-inputs-list--${direction}`]: true,
        [className]: true,
    });
    return (
        <BaseFormControl className={listClassName} helperText={helperTextProps} label={labelProps} type="list">
            <div className="ids-choice-inputs-list__items">{items.map((item) => renderItem(item))}</div>
        </BaseFormControl>
    );
};

export default BaseInputsList;
