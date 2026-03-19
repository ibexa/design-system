import { BaseComponentAriaAttributes } from '@ids-types/general';

export enum ButtonSize {
    Medium = 'medium',
    Small = 'small',
}

export enum ButtonType {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    SecondaryAlt = 'secondary-alt',
    TertiaryAlt = 'tertiary-alt',
}

export enum IconPosition {
    Start = 'start',
    End = 'end',
}

interface ButtonSharedProps extends BaseComponentAriaAttributes {
    ariaLabel?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    isFocusable?: boolean;
    size?: ButtonSize;
    type?: ButtonType;
    iconPosition?: IconPosition;
}

interface ButtonNoTextProps extends ButtonSharedProps {
    icon: string;
    children?: never;
}
interface ButtonTextProps extends ButtonSharedProps {
    icon?: string;
    children: React.ReactNode;
}

export type ButtonProps = ButtonNoTextProps | ButtonTextProps;
