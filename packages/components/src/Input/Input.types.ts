import { ExtraAriaType } from '../../../../types/general';

export const INPUT_SIZE_VALUES = ['basic', 'small'] as const;
export const INPUT_TYPE_VALUES = ['text', 'password', 'email', 'number', 'tel', 'search'] as const;

export interface InputProps {
    name: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    controlled?: boolean;
    disabled?: boolean;
    error?: boolean;
    extraAria?: ExtraAriaType;
    extraClasses?: string;
    id?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    size?: (typeof INPUT_SIZE_VALUES)[number];
    type?: (typeof INPUT_TYPE_VALUES)[number];
    value?: string | number;
}
