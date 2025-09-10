import { type BaseIconProps } from '@ids-internal/partials/BaseIcon';

export { BaseIconSize as IconSize } from '@ids-internal/partials/BaseIcon';

export interface IconProps extends Omit<BaseIconProps, 'path' | 'name'> {
    path?: never;
    name: string;
}
