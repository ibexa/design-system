import { BaseComponentAriaAttributes, ComponentEntryDataType } from '@ids-types/general';
import { BaseInputTypesType } from '@ids-internal/partials/BaseInput/BaseInput.types';

export const INPUT_SIZE_VALUES = ['medium', 'small'] as const;
export const INPUT_TYPE_VALUES = ['text', 'password', 'email', 'number', 'tel', 'search', 'url'] as const satisfies BaseInputTypesType[];

export type InputTextSizeType = (typeof INPUT_SIZE_VALUES)[number];
export type InputTextTypesType = (typeof INPUT_TYPE_VALUES)[number];

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
    size?: InputTextSizeType;
    type?: InputTextTypesType;
    value?: string | number;
}
