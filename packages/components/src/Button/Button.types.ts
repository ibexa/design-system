import { ReactNode } from 'react';

interface ButtonSharedProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'primary' | 'secondary' | 'tertiary' | 'black-secondary' | 'black-tertiary';
    size?: 'large' | 'small' | 'extra-small';
    disabled?: boolean;
    extraClasses?: string;
    extraAria?: Record<`aria-${string}`, boolean | number | string>;
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
