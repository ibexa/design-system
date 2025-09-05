import { BaseComponentAttributes } from '@ids-types/general';

import { CheckboxFieldProps } from '../CheckboxField/CheckboxField.types';
import { DIRECTION } from '@ids-internal/partials/BaseInputsList/BaseInputsList.types';
import { HelperTextProps } from '../../HelperText/HelperText.types';
import { LabelProps } from '../../Label/Label.types';

export { DIRECTION };

export type CheckboxItem = Omit<CheckboxFieldProps, 'name' | 'checked'>;

export enum CHECKBOXES_LIST_ACTION {
    CHECK = 'check',
    UNCHECK = 'uncheck',
}

export interface CheckboxesListProps extends BaseComponentAttributes {
    id: string;
    name: string;
    onChange?: (value: string[], itemValue: string, action: CHECKBOXES_LIST_ACTION) => void;
    direction?: DIRECTION;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    items: CheckboxItem[];
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    required?: boolean;
    value?: string[];
}
