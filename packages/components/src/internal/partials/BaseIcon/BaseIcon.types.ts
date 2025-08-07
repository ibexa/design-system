export const BASE_ICON_SIZE_VALUES = [
    'tiny',
    'tiny-small',
    'small',
    'small-medium',
    'medium',
    'medium-large',
    'large',
    'large-huge',
    'huge',
] as const;

export type BaseIconSizeType = (typeof BASE_ICON_SIZE_VALUES)[number];

export interface BaseIconProps {
    path: string;
    className?: string;
    name?: string;
    size?: (typeof BASE_ICON_SIZE_VALUES)[number];
}
