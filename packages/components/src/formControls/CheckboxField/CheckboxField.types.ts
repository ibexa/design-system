import { ReactNode } from 'react';

import { CheckboxProps } from '../../inputs/Checkbox/Checkbox.types';
import { ThreeStateCheckboxProps } from '../../inputs/ThreeStateCheckbox/ThreeStateCheckbox.types';

interface CheckboxFieldPropsBase {
    id: string;
    label: ReactNode;
    inputWrapperClassName?: string;
    labelClassName?: string;
}

type CheckboxFieldBasicProps = CheckboxProps &
    CheckboxFieldPropsBase & {
        useIndeterminate?: false;
    };

type ThreeStateCheckboxFieldProps = ThreeStateCheckboxProps &
    CheckboxFieldPropsBase & {
        useIndeterminate: true;
    };

export type CheckboxFieldProps = CheckboxFieldBasicProps | ThreeStateCheckboxFieldProps;
