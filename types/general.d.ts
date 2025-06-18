export type ExtraAriaType = Record<`aria-${string}`, boolean | number | string>;

export interface BaseComponentAttributes {
    extraClasses?: string;
    title?: string;
};

export interface BaseComponentAriaAttributes extends BaseComponentAttributes {
    extraAria?: ExtraAriaType;
};
