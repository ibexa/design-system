import { BaseChoiceInputProps } from '@ids-partials/BaseChoiceInput';

interface ThreeStateCheckboxIsIndeterminateProps extends Omit<BaseChoiceInputProps, 'type'> {
    indeterminate: true;
    checked: false;
}

interface ThreeStateCheckboxIsNotIndeterminateProps extends Omit<BaseChoiceInputProps, 'type'> {
    indeterminate: false;
    checked: boolean;
}

export type ThreeStateCheckboxInputProps = ThreeStateCheckboxIsIndeterminateProps | ThreeStateCheckboxIsNotIndeterminateProps;
