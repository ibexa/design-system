import { BaseButtonProps } from '@ids-internal/partials/BaseButton/BaseButton.types';

export {
    BASE_BUTTON_SIZE_VALUES as BUTTON_SIZE_VALUES,
    BASE_BUTTON_TYPE_VALUES as BUTTON_TYPE_VALUES,
    type BaseButtonSizeType as ButtonSizeType,
    type BaseButtonTypesType as ButtonTypesType,
} from '@ids-internal/partials/BaseButton/BaseButton.types';

interface ButtonSharedProps extends BaseButtonProps {
    icon?: string;
}

interface ButtonHTMLProps extends ButtonSharedProps {
    ariaLabel: string;
}
interface ButtonStringProps extends Omit<ButtonSharedProps, 'ariaLabel'> {
    ariaLabel?: string;
    children: string;
}

export type ButtonProps = ButtonHTMLProps | ButtonStringProps;
