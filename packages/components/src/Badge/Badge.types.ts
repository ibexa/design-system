import { BaseComponentAttributes } from '@ids-types/general';

export enum BadgeSize {
    Medium = 'medium',
    Small = 'small',
}

export interface BadgeProps extends BaseComponentAttributes {
    value: number;
    size?: BadgeSize;
}
