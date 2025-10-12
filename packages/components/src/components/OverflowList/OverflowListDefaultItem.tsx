import React from 'react';

import { createCssClassNames } from '@ibexa/ids-core/helpers/cssClassNames';

import { OverflowListDefaultItemProps } from './OverflowListDefaultItem.types';

export const OverflowListDefaultItem = ({ className = '', id, content }: OverflowListDefaultItemProps) => {
    const componentClassName = createCssClassNames({
        'ids-overflow-list__item': true,
        [className]: !!className,
    });

    return (
        <div className={componentClassName} key={id}>
            {content}
        </div>
    );
};
