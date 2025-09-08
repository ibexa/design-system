import { BaseComponentAriaAttributes, ComponentEntryDataType } from '@ids-types/general';
import { BaseInputType } from '@ids-internal/partials/BaseInput/BaseInput.types';

export enum InputTextSize {
    Medium = 'medium',
    Small = 'small',
}

export const INPUT_TYPE_VALUES = ['text', 'password', 'email', 'number', 'tel', 'search', 'url'] as const satisfies BaseInputType[];

export type InputTextType = (typeof INPUT_TYPE_VALUES)[number];

export interface InputTextProps extends BaseComponentAriaAttributes {
    name: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    placeholder?: string;
    processActions?: (actions: ComponentEntryDataType[]) => ComponentEntryDataType[];
    readOnly?: boolean;
    required?: boolean;
    size?: InputTextSize;
    type?: InputTextType;
    value?: string | number;
}
