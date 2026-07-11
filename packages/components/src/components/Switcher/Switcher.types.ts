import { BaseComponentAttributes } from '@ids-types/general';

export enum SwitcherSize {
    Large = 'large',
    Small = 'small',
}

export enum SwitcherType {
    Backoffice = 'backoffice',
    Builders = 'builders',
}

export interface SwitcherItem {
    value: string;
    label: string;
    disabled?: boolean;
    error?: boolean;
}

export interface SwitcherProps extends BaseComponentAttributes {
    items: SwitcherItem[];
    selectedValue?: string;
    size?: SwitcherSize;
    type?: SwitcherType;
    overflow?: boolean;
    name?: string;
    moreLabel?: string;
    onChange?: (value: string) => void;
}
