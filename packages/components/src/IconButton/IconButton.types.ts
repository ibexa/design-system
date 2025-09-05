import { BaseButtonProps } from '@ids-internal/partials/BaseButton';

export { BaseButtonSize as IconButtonSize, BaseButtonType as IconButtonType } from '@ids-internal/partials/BaseButton';

export interface IconButtonProps extends Omit<BaseButtonProps, 'ariaLabel' | 'children'> {
    icon: string;
    ariaLabel?: string;
    children?: never;
}
