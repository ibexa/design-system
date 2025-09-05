import { BaseChoiceInputProps } from '@ids-internal/partials/BaseChoiceInput';

export type CheckboxProps = Omit<BaseChoiceInputProps, 'type'> & {
    value: string;
};
