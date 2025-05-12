export const ICON_SIZE_VALUES = ['tiny', 'tiny-small', 'small', 'small-medium', 'medium', 'medium-large', 'large', 'extra-large'] as const;

interface IconSharedProps {
    cssClass?: string;
    size: (typeof ICON_SIZE_VALUES)[number] | undefined;
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
