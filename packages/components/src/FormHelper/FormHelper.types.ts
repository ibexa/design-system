import { ReactNode } from 'react';

import { BaseComponentAttributes } from '@ids-types/general';

export const FORM_HELPER_SIZE_VALUES = ['small', 'medium'] as const;
export const FORM_HELPER_TYPE_VALUES = ['default', 'warning', 'error', 'info', 'success'] as const;

export type FormHelperSizeType = (typeof FORM_HELPER_SIZE_VALUES)[number];
export type FormHelperTypesType = (typeof FORM_HELPER_TYPE_VALUES)[number];

export interface FormHelperProps extends BaseComponentAttributes {
    children: ReactNode;
    size?: FormHelperSizeType;
    type?: FormHelperTypesType;
}
