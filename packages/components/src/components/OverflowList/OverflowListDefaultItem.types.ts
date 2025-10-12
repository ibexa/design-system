import { ReactNode } from 'react';

import { BaseComponentAttributes } from '@ids-types/general';

export interface OverflowListDefaultItemProps extends BaseComponentAttributes {
    content: ReactNode;
    id: string;
}
