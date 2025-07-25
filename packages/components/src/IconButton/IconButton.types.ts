import { BaseButtonProps } from '@ids-internal/partials/BaseButton/BaseButton.types';

export {
    BASE_BUTTON_SIZE_VALUES as ICON_BUTTON_SIZE_VALUES,
    BASE_BUTTON_TYPE_VALUES as ICON_BUTTON_TYPE_VALUES,
    type BaseButtonSizeType as IconButtonSizeType,
    type BaseButtonTypesType as IconButtonTypesType,
} from '@ids-internal/partials/BaseButton/BaseButton.types';

export interface IconButtonProps extends Omit<BaseButtonProps, 'ariaLabel' | 'children'> {
    icon: string;
    ariaLabel?: string;
    children?: never;
}
