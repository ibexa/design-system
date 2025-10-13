import { BaseComponentAttributes } from '@ids-types/general';

export enum TagSize {
    Medium = 'medium',
    Small = 'small',
}
export enum TagType {
    Primary = 'primary',
    PrimaryAlt = 'primary-alt',
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
    Neutral = 'neutral',
    IconTag = 'icon-tag',
    SuccessGhost = 'success-ghost',
    ErrorGhost = 'error-ghost',
    NeutralGhost = 'neutral-ghost',
}

export interface TagProps extends BaseComponentAttributes {
    children: React.ReactNode;
    icon?: string;
    size?: TagSize;
    type?: TagType;
    isDark?: boolean; //TODO: decide way of implementing variant on dark background
}
