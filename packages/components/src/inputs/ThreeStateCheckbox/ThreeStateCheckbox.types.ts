import { BaseChoiceInputProps } from '@ids-internal/partials/BaseChoiceInput';

interface ThreeStateCheckboxIsIndeterminateProps extends Omit<BaseChoiceInputProps, 'type'> {
    indeterminate: true;
    checked: false;
}

interface ThreeStateCheckboxIsNotIndeterminateProps extends Omit<BaseChoiceInputProps, 'type'> {
    indeterminate: false;
    checked: boolean;
}

export type ThreeStateCheckboxProps = ThreeStateCheckboxIsIndeterminateProps | ThreeStateCheckboxIsNotIndeterminateProps;
