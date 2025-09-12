import { Ref } from 'react';

import { BaseComponentAriaAttributes } from '@ids-types/general';
import { BaseInputType } from '@ids-partials/BaseInput/BaseInput.types';

export const INPUT_TYPE_VALUES = ['checkbox', 'radio'] as const satisfies BaseInputType[];

export type InputChoiceTypesType = (typeof INPUT_TYPE_VALUES)[number];

export interface BaseChoiceInputProps extends BaseComponentAriaAttributes {
    name: string;
    type: InputChoiceTypesType;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    inputClassName?: string;
    ref?: Ref<HTMLInputElement>;
    required?: boolean;
    value?: string;
}
