import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';

export enum ToggleButtonInputSize {
    Small = 'small',
    Medium = 'medium',
}

export type ToggleButtonInputProps = Omit<BaseChoiceInputProps, 'type' | 'error'> & {
    enabledLabel?: string;
    disabledLabel?: string;
    onChange?: (checked: boolean) => void;
    size?: ToggleButtonInputSize;
};
