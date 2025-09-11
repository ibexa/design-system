import { BaseChoiceInputProps } from '@ids-internal/partials/BaseChoiceInput';

export enum ToggleSize {
    Small = 'small',
    Medium = 'medium',
}

export type ToggleProps = Omit<BaseChoiceInputProps, 'type' | 'error'> & {
    enabledLabel?: string;
    disabledLabel?: string;
    size?: ToggleSize;
    value: string;
};
