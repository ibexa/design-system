import { BaseIconProps } from '@ids-internal/partials/BaseIcon/BaseIcon.types';

export {
    BASE_ICON_SIZE_VALUES as ICON_SIZE_VALUES,
    type BaseIconSizeType as IconSizeType,
} from '@ids-internal/partials/BaseIcon/BaseIcon.types';
export interface IconProps extends Omit<BaseIconProps, 'path' | 'name'> {
    path?: never;
    name: string;
}
