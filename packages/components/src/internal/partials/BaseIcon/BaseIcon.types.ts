export enum BaseIconSize {
    Tiny = 'tiny',
    TinySmall = 'tiny-small',
    Small = 'small',
    SmallMedium = 'small-medium',
    Medium = 'medium',
    MediumLarge = 'medium-large',
    Large = 'large',
    LargeHuge = 'large-huge',
    Huge = 'huge',
};

export interface BaseIconProps {
    path: string;
    className?: string;
    name?: string;
    size?: BaseIconSize;
}
