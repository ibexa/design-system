export const ICON_SIZE_VALUES = [
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

export type IconSizeType = (typeof ICON_SIZE_VALUES)[number];

interface IconSharedProps {
    cssClass?: string;
    size?: (typeof ICON_SIZE_VALUES)[number];
}
interface IconCustomPathProps extends IconSharedProps {
    customPath: string;
    name?: never;
}
interface IconNameProps extends IconSharedProps {
    customPath?: never;
    name: string;
}

export type IconProps = IconCustomPathProps | IconNameProps;
