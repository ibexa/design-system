import { BaseComponentAttributes } from '@ids-types/general';

export interface ChipProps extends BaseComponentAttributes {
    children: React.ReactNode;
    isClosable?: boolean;
    disabled?: boolean;
    onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    error?: boolean;
}
