import { BaseComponentAriaAttributes } from '@ids-types/general';

export interface BaseChoiceInputWithLabelProps extends BaseComponentAriaAttributes {
    children: React.ReactNode;
    id: string;
    inputWrapperClassName?: string;
    labelClassName?: string;
    renderInput: () => React.ReactNode;
}
