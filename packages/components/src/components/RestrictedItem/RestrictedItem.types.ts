import { BaseComponentAttributes } from '@ids-types/general';

export interface RestrictedItemProps extends BaseComponentAttributes {
    name: string;
    message?: string;
}