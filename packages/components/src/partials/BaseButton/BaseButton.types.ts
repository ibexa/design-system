import { BaseComponentAriaAttributes } from '@ids-types/general';

export enum BaseButtonSize {
    Medium = 'medium',
    Small = 'small',
}

export enum BaseButtonType {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    SecondaryAlt = 'secondary-alt',
    TertiaryAlt = 'tertiary-alt',
}

export interface BaseButtonProps extends BaseComponentAriaAttributes {
    ariaLabel: string;
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    size?: BaseButtonSize;
    type?: BaseButtonType;
}
