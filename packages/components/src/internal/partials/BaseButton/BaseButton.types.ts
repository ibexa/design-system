import { ReactNode } from 'react';

import { BaseComponentAriaAttributes } from '@ids-types/general';

export const BASE_BUTTON_SIZE_VALUES = ['medium', 'small'] as const;
export const BASE_BUTTON_TYPE_VALUES = ['primary', 'secondary', 'tertiary', 'secondary-alt', 'tertiary-alt'] as const;

export type BaseButtonSizeType = (typeof BASE_BUTTON_SIZE_VALUES)[number];
export type BaseButtonTypesType = (typeof BASE_BUTTON_TYPE_VALUES)[number];

export interface BaseButtonProps extends BaseComponentAriaAttributes {
    ariaLabel: string;
    children: ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    size?: BaseButtonSizeType;
    type?: BaseButtonTypesType;
}
