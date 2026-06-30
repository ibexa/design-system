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

interface ButtonNameIconProps {
    icon: string;
    iconUrl?: never;
}

interface ButtonUrlIconProps {
    icon?: never;
    iconUrl: string;
}

interface ButtonNoTextNameIconProps extends ButtonSharedProps, ButtonNameIconProps {
    children?: never;
}

interface ButtonNoTextUrlIconProps extends ButtonSharedProps, ButtonUrlIconProps {
    children?: never;
}

interface ButtonTextNoIconProps extends ButtonSharedProps {
    icon?: never;
    iconUrl?: never;
    children: React.ReactNode;
}

interface ButtonTextNameIconProps extends ButtonSharedProps, ButtonNameIconProps {
    children: React.ReactNode;
}

interface ButtonTextUrlIconProps extends ButtonSharedProps, ButtonUrlIconProps {
    children: React.ReactNode;
}

export type ButtonProps =
    | ButtonNoTextNameIconProps
    | ButtonNoTextUrlIconProps
    | ButtonTextNoIconProps
    | ButtonTextNameIconProps
    | ButtonTextUrlIconProps;
