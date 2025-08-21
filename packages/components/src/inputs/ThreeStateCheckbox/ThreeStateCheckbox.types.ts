import { CheckboxProps } from '../Checkbox';

interface ThreeStateCheckboxIsIndeterminateProps extends CheckboxProps {
    indeterminate: true;
    value: false;
}

interface ThreeStateCheckboxIsNotIndeterminateProps extends CheckboxProps {
    indeterminate: false;
    value: boolean;
}

export type ThreeStateCheckboxProps = ThreeStateCheckboxIsIndeterminateProps | ThreeStateCheckboxIsNotIndeterminateProps;
