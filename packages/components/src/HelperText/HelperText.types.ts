import { ReactNode } from 'react';

import { BaseComponentAttributes } from '@ids-types/general';

export const HELPER_TEXT_TYPE_VALUES = ['default', 'error'] as const;

export type HelperTextTypesType = (typeof HELPER_TEXT_TYPE_VALUES)[number];

export interface HelperTextProps extends BaseComponentAttributes {
    children: ReactNode;
    type?: HelperTextTypesType;
}
