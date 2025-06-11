import { ReactNode } from 'react';

import { BaseComponentAttributes } from '@ids-types/general';

export interface FormLabelProps extends BaseComponentAttributes {
    children: ReactNode;
    htmlFor: string;
    error?: boolean;
    required?: boolean;
}
