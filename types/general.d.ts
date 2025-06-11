export type ExtraAriaType = Record<`aria-${string}`, boolean | number | string>;

export interface BaseAttributes {
    extraClasses?: string;
    extraAria?: ExtraAriaType;
    title?: string;
};
