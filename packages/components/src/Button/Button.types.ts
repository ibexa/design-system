import { ReactNode } from 'react';

import { BaseComponentAriaAttributes } from '@ids-types/general';

export const BUTTON_SIZE_VALUES = ['medium', 'small', 'extra-small'] as const;
export const BUTTON_TYPE_VALUES = ['primary', 'secondary', 'tertiary', 'secondary-alt', 'tertiary-alt'] as const;

export type ButtonSizeType = (typeof BUTTON_SIZE_VALUES)[number];
export type ButtonTypesType = (typeof BUTTON_TYPE_VALUES)[number];
interface ButtonSharedProps extends BaseComponentAriaAttributes {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    iconOnly?: boolean;
    size?: ButtonSizeType;
    type?: ButtonTypesType;
}

interface ButtonHTMLProps extends ButtonSharedProps {
    children: ReactNode;
    ariaLabel: string;
}
interface ButtonStringProps extends ButtonSharedProps {
    children: string;
    ariaLabel?: string;
}

export type ButtonProps = ButtonHTMLProps | ButtonStringProps;
