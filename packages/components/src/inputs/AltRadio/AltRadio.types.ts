import { ReactNode, Ref } from 'react';

import { BaseComponentAriaAttributes } from '@ids-types/general';

interface InputPropsType {
    name: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onChange?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: (value: boolean, event?: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    id?: string;
    className?: string;
    ref?: Ref<HTMLInputElement>;
    required?: boolean;
    value?: string;
}

export interface AltRadioProps extends BaseComponentAriaAttributes {
    label: ReactNode;
    inputProps: InputPropsType;
}
