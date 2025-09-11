import { BaseButtonProps } from '@ids-partials/BaseButton';

export { BaseButtonSize as ButtonSize, BaseButtonType as ButtonType } from '@ids-partials/BaseButton';

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
