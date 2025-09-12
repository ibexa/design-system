import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';

export type CheckboxInputProps = Omit<BaseChoiceInputProps, 'type'> & {
    value: string;
};
