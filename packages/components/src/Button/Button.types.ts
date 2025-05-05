import { ReactNode } from 'react';

export interface ButtonProps {
    children: ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    type?: 'primary' | 'secondary' | 'tertiary' | 'black-secondary' | 'black-tertiary';
    size?: 'large' | 'small' | 'extra-small';
    disabled?: boolean;
    extraClasses?: string;
}
