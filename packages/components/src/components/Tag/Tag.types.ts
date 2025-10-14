import { BaseComponentAttributes } from '@ids-types/general';

export enum TagSize {
    Medium = 'medium',
    Small = 'small',
}

export enum TagGhostType {
    SuccessGhost = 'success-ghost',
    ErrorGhost = 'error-ghost',
    NeutralGhost = 'neutral-ghost',
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
}

export interface TagProps extends BaseComponentAttributes {
    children: React.ReactNode;
    type: TagType | TagGhostType;
    icon?: string;
    size?: TagSize;
    isDark?: boolean; //TODO: decide way of implementing variant on dark background
}
