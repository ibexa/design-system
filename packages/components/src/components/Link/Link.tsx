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
}: LinkProps) => {
    const computedRel = target === '_blank' && !rel ? 'noopener noreferrer' : rel;

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
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

    const iconOnly = !!icon && !children;
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
            return icon;
        }

        return typeof children === 'string' ? children : '';
    };

    const renderIcon = () => {
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
