import { BaseCheckboxProps } from '@ids-internal/partials/BaseCheckbox';

interface ThreeStateCheckboxIsIndeterminateProps extends BaseCheckboxProps {
    indeterminate: true;
    checked: false;
}

interface ThreeStateCheckboxIsNotIndeterminateProps extends BaseCheckboxProps {
    indeterminate: false;
    checked: boolean;
}

export type ThreeStateCheckboxProps = ThreeStateCheckboxIsIndeterminateProps | ThreeStateCheckboxIsNotIndeterminateProps;
