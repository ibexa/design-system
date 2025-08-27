import { BaseComponentAttributes } from '@ids-types/general';

import { InputTextProps as BasicInputTextProps } from '../../inputs/InputText/InputText.types';
import { HelperTextProps } from '../../HelperText/HelperText.types';
import { LabelProps } from '../../Label/Label.types';

export interface FormControlInputTextProps extends BaseComponentAttributes {
    id: string;
    name: BasicInputTextProps['name'];
    input?: Omit<BasicInputTextProps, 'error' | 'name' | 'onChange' | 'value'>;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    onChange?: BasicInputTextProps['onChange'];
    onValidate?: (isValid: boolean, messages: string[]) => void;
    value?: BasicInputTextProps['value'];
}

export type OnChangeArgsType = Parameters<NonNullable<FormControlInputTextProps['onChange']>>;

export type ValueType = NonNullable<FormControlInputTextProps['value']>;
