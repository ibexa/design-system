import { Ref } from 'react';

import { BaseComponentAriaAttributes } from '@ids-types/general';

export interface CheckboxProps extends BaseComponentAriaAttributes {
    name: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    inputClassName?: string;
    ref?: Ref<HTMLInputElement>;
    required?: boolean;
    value?: boolean;
}
