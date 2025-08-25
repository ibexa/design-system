import { BaseComponentAttributes } from '@ids-types/general';

export const BADGE_SIZE_VALUES = ['medium', 'small'] as const;

export type BadgeSizeType = (typeof BADGE_SIZE_VALUES)[number];

export interface BadgeProps extends BaseComponentAttributes {
    value: number;
    size?: BadgeSizeType;
}
