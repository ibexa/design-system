import { BaseComponentAttributes } from '@ids-types/general';

import { DIRECTION } from '@ids-internal/partials/BaseInputsList/BaseInputsList.types';
import { HelperTextProps } from '../../HelperText/HelperText.types';
import { LabelProps } from '../../Label/Label.types';
import { RadioButtonFieldProps } from '../RadioButtonField/RadioButtonField.types';

export { DIRECTION };

export type RadioButtonItem = Omit<RadioButtonFieldProps, 'name' | 'checked'>

export interface RadioButtonsListProps extends BaseComponentAttributes {
    id: string;
    name: string;
    onChange?: (value: string) => void;
    direction?: DIRECTION;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    items: RadioButtonItem[];
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    required?: boolean;
    value?: string;
}
