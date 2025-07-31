import { BaseComponentAttributes } from '@ids-types/general';

import { InputTextProps as BasicInputTextProps } from '../../inputs/InputText/InputText.types';
import { HelperTextProps } from '../../HelperText/HelperText.types';
import { LabelProps } from '../../Label/Label.types';

export interface InputTextProps extends BaseComponentAttributes {
    input: Omit<BasicInputTextProps, 'error' | 'name' | 'onChange' | 'value'>;
    name: BasicInputTextProps['name'];
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    onChange?: BasicInputTextProps['onChange'];
    onValidate?: (isValid: boolean, messages: string[]) => void;
    value?: BasicInputTextProps['value'];
}
