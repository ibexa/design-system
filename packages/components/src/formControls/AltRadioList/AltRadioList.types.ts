import { BaseComponentAttributes } from '@ids-types/general';

import { AltRadioProps } from '../../inputs/AltRadio/AltRadio.types';
import { DIRECTION } from '@ids-internal/partials/BaseInputsList/BaseInputsList.types';
import { HelperTextProps } from '../../HelperText/HelperText.types';
import { LabelProps } from '../../Label/Label.types';

export { DIRECTION };

export type AltRadioItem = Omit<AltRadioProps, 'name' | 'checked'>;

export interface AltRadioListProps extends BaseComponentAttributes {
    id: string;
    name: string;
    onChange?: (value: string) => void;
    direction?: DIRECTION;
    helperText?: HelperTextProps['children'];
    helperTextExtra?: Omit<HelperTextProps, 'children' | 'type'>;
    items: AltRadioItem[];
    label?: LabelProps['children'];
    labelExtra?: Omit<LabelProps, 'children' | 'error' | 'htmlFor' | 'required'>;
    required?: boolean;
    value?: string;
}
