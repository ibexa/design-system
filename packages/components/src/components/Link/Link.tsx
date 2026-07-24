import React from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { createCssClassNames } from '@ids-core';

import { LinkProps, LinkSize, LinkType, LinkVariant } from './Link.types';

const ICON_SIZE_MAPPING: Record<LinkSize, IconSize> = {
    [LinkSize.Medium]: IconSize.Small,
    [LinkSize.Small]: IconSize.TinySmall,
} as const;

export const Link = ({
    onClick,
    children = null,
    ariaLabel,
    disabled = false,
    href,
    target,
    rel,
    className = '',
    extraAria = {},
    title = '',
    variant = LinkVariant.Button,
    size = LinkSize.Medium,
    type = LinkType.Tertiary,
    icon,
    iconUrl,
}: LinkProps) => {
    const computedRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
        if (disabled) {
            event.preventDefault();
            return;
        }
        onClick?.(event);
    };

    if (variant === LinkVariant.Text) {
        const componentClassName = createCssClassNames({
            'ids-link': true,
            'ids-link--disabled': disabled,
            [className]: !!className,
        });

        return (
            <a
                aria-label={ariaLabel}
                className={componentClassName}
                href={href}
                onClick={handleClick}
                rel={computedRel}
                target={target}
                title={title}
                {...extraAria}
            >
                {children}
            </a>
        );
    }

    const hasIcon = !!icon || !!iconUrl;
    const iconOnly = hasIcon && !children;
    const componentClassName = createCssClassNames({
        'ids-btn': true,
        [`ids-btn--${type}`]: true,
        [`ids-btn--${size}`]: true,
        'ids-btn--icon-only': iconOnly,
        'ids-link--disabled': disabled,
        [className]: !!className,
    });

    const getLinkAriaLabel = () => {
        if (ariaLabel) {
            return ariaLabel;
        } else if (iconOnly) {
            if (iconUrl !== undefined) {
                return iconUrl;
            }

            return icon;
        }

        return typeof children === 'string' ? children : '';
    };

    const renderIcon = () => {
        if (iconUrl) {
            const iconSize = ICON_SIZE_MAPPING[size];

            return (
                <div className="ids-btn__icon">
                    <Icon path={iconUrl} size={iconSize} />
                </div>
            );
        }

        if (icon) {
            const iconSize = ICON_SIZE_MAPPING[size];

            return (
                <div className="ids-btn__icon">
                    <Icon name={icon} size={iconSize} />
                </div>
            );
        }

        return null;
    };

    const renderLabel = () => {
        if (!iconOnly) {
            return <div className="ids-btn__label">{children}</div>;
        }

        return null;
    };

    return (
        <a
            aria-label={getLinkAriaLabel()}
            className={componentClassName}
            href={href}
            onClick={handleClick}
            rel={computedRel}
            role="link"
            target={target}
            title={title}
            {...extraAria}
        >
            {renderIcon()}
            {renderLabel()}
        </a>
    );
};
