import { BaseComponentAttributes } from '@ids-types/general';

import { HelperTextProps as FullHelperTextProps } from '../HelperText/HelperText.types';
import { InputTextProps as FullInputTextProps } from '../inputs/InputText';
import { LabelProps as FullLabelProps } from '../Label/Label.types';

export const HELPER_TEXT_TYPE_VALUES = ['default', 'error'] as const;

export type FormControlTypesType = (typeof HELPER_TEXT_TYPE_VALUES)[number];

export type HelperTextProps = Omit<FullHelperTextProps, 'children' | 'type'> & {
    content: FullHelperTextProps['children'];
};

export type InputTextProps = Omit<FullInputTextProps, 'disabled' | 'error'>;

export type LabelProps = Omit<FullLabelProps, 'children' | 'error' | 'htmlFor' | 'required'> & {
    content: FullLabelProps['children'];
};

export interface FormControlProps extends BaseComponentAttributes {
    input: InputTextProps;
    helperText?: HelperTextProps;
    label?: LabelProps;
    onValidate?: (isValid: boolean, messages: string[]) => void;
}
