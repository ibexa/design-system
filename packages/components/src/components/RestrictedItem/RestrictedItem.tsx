import React from 'react';

import { createCssClassNames } from '@ids-core';

import { Icon, IconSize } from '@ids-components/Icon';

import { RestrictedItemProps } from './RestrictedItem.types';

const DEFAULT_MESSAGE = "Output hidden — you don't have permission to view this content item";

export const RestrictedItem = ({
    className = '',
    name,
    message = DEFAULT_MESSAGE,
}: RestrictedItemProps) => {
    const componentClassName = createCssClassNames({
        'ids-restricted-item': true,
        [className]: !!className,
    });

    return (
        <div className={componentClassName}>
            <div className="ids-restricted-item__header">
                <span className="ids-restricted-item__name">{name}</span>
                <span className="ids-restricted-item__badge">
                    <Icon name="database-settings" size={IconSize.Tiny} />
                    Restricted
                </span>
            </div>
            <div className="ids-restricted-item__footer">
                <Icon name="database-settings" size={IconSize.Tiny} />
                <span>{message}</span>
            </div>
        </div>
    );
};