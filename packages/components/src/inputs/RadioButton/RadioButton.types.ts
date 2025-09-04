import { BaseChoiceInputProps } from '@ids-internal/partials/BaseChoiceInput';

export type RadioButtonProps = Omit<BaseChoiceInputProps, 'type'> & {
    value: string;
};
