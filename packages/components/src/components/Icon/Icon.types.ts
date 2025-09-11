import { BaseIconProps } from '@ids-partials/BaseIcon';

export { BaseIconSize as IconSize } from '@ids-partials/BaseIcon';

export interface IconProps extends Omit<BaseIconProps, 'path' | 'name'> {
    path?: never;
    name: string;
}
