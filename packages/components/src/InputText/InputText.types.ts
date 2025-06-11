import { BaseInputTypesType } from '../internal/partials/BaseInput/BaseInput.types';
import { ExtraAriaType } from '../../../../types/general';

export const INPUT_SIZE_VALUES = ['basic', 'small'] as const;
export const INPUT_TYPE_VALUES = [
    'text',
    'password',
    'email',
    'number',
    'tel',
    'search',
    'url',
] as const satisfies BaseInputTypesType[];

export type InputTextSizeType = (typeof INPUT_SIZE_VALUES)[number];
export type InputTextTypesType = (typeof INPUT_TYPE_VALUES)[number];
export interface InputTextProps {
    name: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: boolean;
    extraAria?: ExtraAriaType;
    extraClasses?: string;
    id?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: InputTextSizeType;
    type?: InputTextTypesType;
    value?: string | number;
}
