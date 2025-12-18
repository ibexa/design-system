import { BaseComponentAttributes } from '@ids-types/general';

export enum BadgeSize {
    Medium = 'medium',
    Small = 'small',
}

export enum BadgeVariant {
    String = 'string',
    Number = 'number',
}

export interface BadgeProps extends BaseComponentAttributes {
    value: string;
    variant: BadgeVariant;
    maxValue?: number;
    size?: BadgeSize;
}
