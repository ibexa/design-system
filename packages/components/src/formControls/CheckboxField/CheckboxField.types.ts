import { ReactNode } from 'react';

import { CheckboxProps } from '../../inputs/Checkbox';

export interface CheckboxFieldProps extends CheckboxProps {
    id: string;
    label: ReactNode;
    inputWrapperClassName?: string;
    labelClassName?: string;
}
