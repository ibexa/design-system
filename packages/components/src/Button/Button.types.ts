import { ReactNode } from 'react';

import { ExtraAriaType } from '../../../../types/general';

export const BUTTON_TYPE_VALUES = ['primary', 'secondary', 'tertiary', 'black-secondary', 'black-tertiary'] as const;
export const BUTTON_SIZE_VALUES = ['large', 'small', 'extra-small'] as const;

interface ButtonSharedProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    type?: (typeof BUTTON_TYPE_VALUES)[number];
    size?: (typeof BUTTON_SIZE_VALUES)[number];
    disabled?: boolean;
    extraClasses?: string;
    extraAria?: ExtraAriaType;
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
