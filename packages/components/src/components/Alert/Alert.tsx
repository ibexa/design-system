import React, { useContext } from 'react';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Icon, IconSize } from '@ids-components/Icon';
import { TranslatorContext } from '@ids-context/Translator';

import { createCssClassNames } from '@ids-core/helpers/cssClassNames';

import { AlertProps, AlertRole, AlertType, AlertVariant } from './Alert.types';

const ICONS_TYPE_MAP: Record<AlertType, string> = {
    [AlertType.Error]: 'alert-error',
    [AlertType.Info]: 'info-rounded',
    [AlertType.Success]: 'check-circle',
    [AlertType.Warning]: 'alert-warning',
};
const ROLES_TYPE_MAP: Record<AlertType, AlertRole> = {
    [AlertType.Error]: AlertRole.Alert,
    [AlertType.Info]: AlertRole.Status,
    [AlertType.Success]: AlertRole.Status,
    [AlertType.Warning]: AlertRole.Alert,
};

export const Alert = ({
    actions = null,
    children = null,
    className = '',
    icon = '',
    iconPath = '',
    isDismissible = false,
    onDismiss,
    role,
    title = '',
    type,
    variant = AlertVariant.Floating,
}: AlertProps) => {
    const Translator = useContext(TranslatorContext);
    const closeLabel = Translator.trans(/*@Desc("Close")*/ 'ibexa.alert.close-btn.label');
    const componentClassName = createCssClassNames({
        'ids-alert': true,
        [`ids-alert--${type}`]: true,
        [`ids-alert--${variant}`]: true,
        [className]: !!className,
    });
    const iconName = icon || ICONS_TYPE_MAP[type];
    const iconProps = iconPath ? { path: iconPath } : { name: iconName };

    const handleDismissClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onDismiss?.(event);
    };

    return (
        <div className={componentClassName} role={role ?? ROLES_TYPE_MAP[type]}>
            <Icon className="ids-alert__icon" size={IconSize.Small} {...iconProps} />
            <div className="ids-alert__content">
                {title && <div className="ids-alert__title">{title}</div>}
                {children && <div className="ids-alert__description">{children}</div>}
                {actions && <div className="ids-alert__actions">{actions}</div>}
            </div>
            {isDismissible && (
                <Button
                    aria-label={closeLabel}
                    className="ids-alert__close-btn"
                    icon="discard"
                    onClick={handleDismissClick}
                    size={ButtonSize.Small}
                    type={ButtonType.TertiaryAlt}
                />
            )}
        </div>
    );
};
