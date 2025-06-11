import { ReactNode } from 'react';

import { BaseAttributes } from '@ids-types/general';

export const BUTTON_TYPE_VALUES = ['primary', 'secondary', 'tertiary', 'black-secondary', 'black-tertiary'] as const;
export const BUTTON_SIZE_VALUES = ['large', 'small', 'extra-small'] as const;

interface ButtonSharedProps extends BaseAttributes {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    size?: (typeof BUTTON_SIZE_VALUES)[number];
    type?: (typeof BUTTON_TYPE_VALUES)[number];
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
