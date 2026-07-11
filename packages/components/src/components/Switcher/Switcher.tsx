import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Icon, IconSize } from '@ids-components/Icon';
import { OverflowList } from '@ids-components/OverflowList';
import { createCssClassNames } from '@ids-core';
import { useGetOrCreateId } from '@ids-hooks/generators';

import { SwitcherItem, SwitcherProps, SwitcherSize, SwitcherType } from './Switcher.types';

const ERROR_ICON = 'alert-error';
const MORE_ICON = 'arrow-double-right';
const NAVIGATION_FORWARD_KEYS = ['ArrowRight', 'ArrowDown'];
const NAVIGATION_BACKWARD_KEYS = ['ArrowLeft', 'ArrowUp'];
const NAVIGATION_STEP = 1;

type OverflowItem = SwitcherItem & { id: string };

export const Switcher = ({
    className = '',
    items,
    moreLabel = 'More',
    name,
    onChange = () => undefined,
    overflow = false,
    selectedValue,
    size = SwitcherSize.Large,
    title = '',
    type = SwitcherType.Backoffice,
}: SwitcherProps) => {
    const groupName = useGetOrCreateId(name);
    const rootRef = useRef<HTMLDivElement>(null);
    const hiddenCountRef = useRef(0);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    // Overflow "promote into track": when an item is picked from the More menu it is pinned to the
    // front so it becomes visible. Switching between already-visible items does NOT change this, so
    // the visible order (and OverflowList's measurement) stays stable — no reflow/flash on selection.
    const [promotedValue, setPromotedValue] = useState<string>();
    const overflowItems = useMemo<OverflowItem[]>(() => {
        const mapped = items.map((item) => ({ ...item, id: item.value }));
        const promoted = mapped.find((item) => item.value === promotedValue);

        if (!promoted) {
            return mapped;
        }

        return [promoted, ...mapped.filter((item) => item.value !== promotedValue)];
    }, [items, promotedValue]);
    const componentClassName = createCssClassNames({
        'ids-switcher': true,
        [`ids-switcher--${size}`]: true,
        [`ids-switcher--${type}`]: true,
        'ids-switcher--overflow': overflow,
        [className]: !!className,
    });
    const enabledValues = items.filter((item) => !item.disabled).map((item) => item.value);
    const isSelectedEnabled = selectedValue !== undefined && enabledValues.includes(selectedValue);
    const activeValue = isSelectedEnabled ? selectedValue : enabledValues[0];
    const selectItem = (item: SwitcherItem) => {
        if (item.disabled || item.value === selectedValue) {
            return;
        }

        onChange(item.value);
    };
    const focusItemByValue = (value: string) => {
        rootRef.current?.querySelector<HTMLButtonElement>(`[data-value="${value}"]`)?.focus();
    };
    const onGroupKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const isForward = NAVIGATION_FORWARD_KEYS.includes(event.key);
        const isBackward = NAVIGATION_BACKWARD_KEYS.includes(event.key);

        if (!isForward && !isBackward) {
            return;
        }

        const { target } = event;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        const focusedValue = target.getAttribute('data-value');
        const currentIndex = focusedValue ? enabledValues.indexOf(focusedValue) : -1;

        if (currentIndex === -1 || enabledValues.length === 0) {
            return;
        }

        event.preventDefault();

        const offset = isForward ? NAVIGATION_STEP : -NAVIGATION_STEP;
        const nextIndex = (currentIndex + offset + enabledValues.length) % enabledValues.length;
        const nextValue = enabledValues[nextIndex];

        onChange(nextValue);
        focusItemByValue(nextValue);
    };
    const renderItemButton = (item: SwitcherItem) => {
        const isSelected = item.value === selectedValue;
        const itemClassName = createCssClassNames({
            'ids-switcher__item': true,
            'ids-switcher__item--disabled': !!item.disabled,
            'ids-switcher__item--error': !!item.error,
            'ids-switcher__item--selected': isSelected,
        });

        return (
            <button
                aria-checked={isSelected}
                className={itemClassName}
                data-value={item.value}
                disabled={item.disabled}
                key={item.value}
                name={groupName}
                onClick={() => {
                    selectItem(item);
                }}
                role="radio"
                tabIndex={item.value === activeValue ? 0 : -1}
                title={title}
                type="button"
            >
                <span className="ids-switcher__item-label">{item.label}</span>
                {item.error && (
                    <span className="ids-switcher__item-icon">
                        <Icon name={ERROR_ICON} size={IconSize.TinySmall} />
                    </span>
                )}
            </button>
        );
    };
    // Only the trigger button lives inside OverflowList (which is `overflow: hidden`). The dropdown
    // menu is rendered as a sibling of OverflowList so it isn't clipped by that hidden overflow.
    const renderMore = ({ hiddenCount }: { hiddenCount: number }) => {
        hiddenCountRef.current = hiddenCount;

        const moreClassName = createCssClassNames({
            'ids-switcher__item': true,
            'ids-switcher__item--more': true,
        });

        return (
            <button
                aria-expanded={isMoreOpen}
                aria-haspopup="menu"
                className={moreClassName}
                onClick={() => {
                    setIsMoreOpen((open) => !open);
                }}
                type="button"
            >
                <span className="ids-switcher__item-label">{moreLabel}</span>
                <span className="ids-switcher__item-icon">
                    <Icon name={MORE_ICON} size={IconSize.TinySmall} />
                </span>
            </button>
        );
    };
    const renderMenu = () => {
        const hiddenItems = overflowItems.slice(overflowItems.length - hiddenCountRef.current);

        if (!isMoreOpen || hiddenItems.length === 0) {
            return null;
        }

        const onMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
            const { target } = event;
            const itemElement = target instanceof Element ? target.closest('.ids-switcher__item') : null;
            const value = itemElement?.getAttribute('data-value');

            if (value) {
                setPromotedValue(value);
            }

            setIsMoreOpen(false);
        };

        return (
            <div className="ids-switcher__menu" onClick={onMenuClick} role="menu">
                {hiddenItems.map((item) => renderItemButton(item))}
            </div>
        );
    };

    useEffect(() => {
        if (!isMoreOpen) {
            return undefined;
        }

        const onDocumentMouseDown = (event: MouseEvent) => {
            const { target } = event;

            if (rootRef.current && target instanceof Node && !rootRef.current.contains(target)) {
                setIsMoreOpen(false);
            }
        };

        document.addEventListener('mousedown', onDocumentMouseDown);

        return () => {
            document.removeEventListener('mousedown', onDocumentMouseDown);
        };
    }, [isMoreOpen]);

    return (
        <div className={componentClassName} onKeyDown={onGroupKeyDown} ref={rootRef} role="radiogroup" title={title}>
            {overflow ? (
                <>
                    <OverflowList<OverflowItem>
                        items={overflowItems}
                        renderItem={(item) => renderItemButton(item)}
                        renderMore={renderMore}
                    />
                    {renderMenu()}
                </>
            ) : (
                items.map((item) => renderItemButton(item))
            )}
        </div>
    );
};
