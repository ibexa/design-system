import { BaseComponentAttributes } from '@ids-types/general';

export interface ChipProps extends BaseComponentAttributes {
    children: React.ReactNode;
    icon?: string;
    isClosable?: boolean;
    disabled?: boolean;
    onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    error?: boolean;
}
