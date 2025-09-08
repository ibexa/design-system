import { BaseComponentAriaAttributes } from '@ids-types/general';
import { HelperTextProps } from '../../../HelperText/HelperText.types';
import { LabelProps } from '../../../Label/Label.types';

export enum Direction {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export interface BaseInputsListProps<T> extends BaseComponentAriaAttributes {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    direction?: Direction;
    helperTextProps?: HelperTextProps;
    labelProps?: LabelProps;
}
