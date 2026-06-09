import { BaseComponentAriaAttributes } from '@ids-types/general';

export enum LinkSize {
    Medium = 'medium',
    Small = 'small',
}

export enum LinkType {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    SecondaryAlt = 'secondary-alt',
    TertiaryAlt = 'tertiary-alt',
}

export enum LinkVariant {
    Button = 'button',
    Text = 'text',
}

interface LinkBaseProps extends BaseComponentAriaAttributes {
    ariaLabel?: string;
    disabled?: boolean;
    href: string;
    target?: string;
    rel?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    variant?: LinkVariant;
}

interface LinkButtonSharedProps extends LinkBaseProps {
    variant?: LinkVariant.Button;
    size?: LinkSize;
    type?: LinkType;
}

interface LinkButtonNoTextProps extends LinkButtonSharedProps {
    icon: string;
    children?: never;
}

interface LinkButtonTextProps extends LinkButtonSharedProps {
    icon?: string;
    children: React.ReactNode;
}

type LinkButtonProps = LinkButtonNoTextProps | LinkButtonTextProps;

interface LinkTextProps extends LinkBaseProps {
    variant: LinkVariant.Text;
    children: React.ReactNode;
    size?: never;
    type?: never;
    icon?: never;
}

export type LinkProps = LinkButtonProps | LinkTextProps;
