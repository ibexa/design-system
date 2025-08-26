import { ReactNode } from 'react';

import { BaseComponentAttributes } from '@ids-types/general';

import { HelperTextProps } from '../../../HelperText/HelperText.types';
import { LabelProps } from '../../../Label/Label.types';

export interface BaseFormControlProps extends BaseComponentAttributes {
    children: ReactNode;
    type: string;
    helperText?: HelperTextProps;
    label?: LabelProps;
}
