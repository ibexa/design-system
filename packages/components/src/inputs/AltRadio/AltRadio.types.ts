import { ReactNode } from 'react';

import { BaseChoiceInputProps } from '@ids-internal/partials/BaseChoiceInput';

export interface AltRadioProps extends Omit<BaseChoiceInputProps, 'type'> {
    label: ReactNode;
    tileClassName?: string;
}
