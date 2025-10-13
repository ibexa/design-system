import { BaseComponentAriaAttributes, ComponentEntryDataType } from '@ids-types/general';
import { BaseInputType } from '@ids-partials/BaseInput/BaseInput.types';
import React from 'react';

export enum InputTextInputSize {
    Medium = 'medium',
    Small = 'small',
}

export const INPUT_TYPE_VALUES = ['text', 'password', 'email', 'number', 'tel', 'search', 'url'] as const satisfies BaseInputType[];

export type InputTextInputType = (typeof INPUT_TYPE_VALUES)[number];

export interface InputTextInputRef {
    focus: () => void;
}

export interface InputTextInputProps extends BaseComponentAriaAttributes {
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
    ref?: React.Ref<InputTextInputRef>;
    required?: boolean;
    size?: InputTextInputSize;
    type?: InputTextInputType;
    value?: string | number;
}
