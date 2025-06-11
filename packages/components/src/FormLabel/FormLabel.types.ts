import { ReactNode } from 'react';

import { BaseAttributes } from '@ids-types/general';

export interface FormLabelProps extends Exclude<BaseAttributes, 'extraAria'> {
    children: ReactNode;
    htmlFor: string;
    error?: boolean;
    required?: boolean;
}
