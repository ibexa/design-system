import type { ReactNode } from 'react';

import { BaseComponentAttributes } from '@ids-types/general';

export enum AlertType {
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
    Info = 'info',
}

export enum AlertVariant {
    Floating = 'floating',
    Local = 'local',
    Toast = 'toast',
}

export enum AlertRole {
    Alert = 'alert',
    Status = 'status',
}

export interface AlertProps extends Omit<BaseComponentAttributes, 'title'> {
    type: AlertType;
    title?: string;
    variant?: AlertVariant;
    children?: ReactNode;
    actions?: ReactNode;
    icon?: string;
    iconPath?: string;
    isDismissible?: boolean;
    onDismiss?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    role?: AlertRole;
}
