import { BaseSelectionInputProps } from '@ids-internal/partials/BaseSelectionInput';

interface ThreeStateCheckboxIsIndeterminateProps extends Omit<BaseSelectionInputProps, 'type'> {
    indeterminate: true;
    checked: false;
}

interface ThreeStateCheckboxIsNotIndeterminateProps extends Omit<BaseSelectionInputProps, 'type'> {
    indeterminate: false;
    checked: boolean;
}

export type ThreeStateCheckboxProps = ThreeStateCheckboxIsIndeterminateProps | ThreeStateCheckboxIsNotIndeterminateProps;
