import { ComponentType, ReactNode } from 'react';

import { BaseComponentAttributes } from '@ids-types/general';

export enum OverflowListCalculateAction {
    None = 'none',
    CalculateItems = 'calculate-items',
    CalculateOverflow = 'calculate-overflow',
}

export interface OverflowListProps<ItemProps> extends BaseComponentAttributes {
    itemComponent?: ComponentType<ItemProps>;
    renderMore: ({ hiddenCount }: { hiddenCount: number }) => NonNullable<ReactNode>;
    items?: ItemProps[];
}
