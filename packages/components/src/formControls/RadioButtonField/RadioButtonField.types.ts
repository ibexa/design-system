import { ReactNode } from 'react';

import { RadioButtonProps } from '../../inputs/RadioButton';

export interface RadioButtonFieldProps extends RadioButtonProps {
    id: string;
    label: ReactNode;
    inputWrapperClassName?: string;
    labelClassName?: string;
}
