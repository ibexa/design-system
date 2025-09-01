import { BaseComponentAriaAttributes } from '@ids-types/general';
import { HelperTextProps } from '../../../HelperText/HelperText.types';
import { LabelProps } from '../../../Label/Label.types';

export enum DIRECTION {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
}

export interface BaseInputsListProps<T> extends BaseComponentAriaAttributes {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    direction?: DIRECTION;
    helperTextProps?: HelperTextProps;
    labelProps?: LabelProps;
}
