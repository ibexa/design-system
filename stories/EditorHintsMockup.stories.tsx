import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Tag, TagType, TagSize } from '@ids-components/Tag';
import { Icon, IconSize } from '@ids-components/Icon';

// ─── Design tokens ─────────────────────────────────────────────────────────────

const C = {
    neutral240: 'oklch(0.1798 0.0104 248.41)',
    neutral230: 'oklch(0.2326 0.0098 248.25)',
    neutral220: 'oklch(0.2822 0.0079 240.13)',
    neutral210: 'oklch(0.3302 0.0077 240.06)',
    neutral200: 'oklch(0.3739 0.0079 255.54)',
    neutral190: 'oklch(0.4185 0.0063 247.98)',
    neutral170: 'oklch(0.5051 0.006 247.95)',
    neutral150: 'oklch(0.5878 0.0047 236.55)',
    neutral100: 'oklch(0.7821 0.0018 247.85)',
    neutral80:  'oklch(0.8568 0.0011 197.14)',
    neutral70:  'oklch(0.8917 0.0014 286.37)',
    neutral60:  'oklch(0.9283 0.0013 286.37)',
    neutral50:  'oklch(0.9431 0 0)',
    neutral40:  'oklch(0.9581 0 0)',
    neutral30:  'oklch(0.9724 0.0011 197.14)',
    neutral20:  'oklch(0.9851 0 0)',
    neutral10:  'oklch(1 0 0)',
    primary80:  'oklch(0.4047 0.1894 289.97)',
    primary70:  'oklch(0.4366 0.2066 289.78)',
    primary30:  'oklch(0.8324 0.0726 300.08)',
    primary20:  'oklch(0.9155 0.0362 301.42)',
    primary10:  'oklch(0.9155 0.0362 301.42)',
    success90:  'oklch(0.5293 0.168969 139.5981)',
    success30:  'oklch(0.9154 0.0396 139.43)',
    success20:  'oklch(0.9428 0.0281 138.72)',
    error90:    'oklch(0.4653 0.1797 26.47)',
    error80:    'oklch(0.5112 0.1876 26.3)',
    error30:    'oklch(0.9159 0.043153 26.7918)',
    error20:    'oklch(0.9487 0.0256 26.53)',
    error10:    'oklch(0.9752 0.012174 29.8684)',
    warning100: 'oklch(0.5977 0.150481 53.6413)',
    warning30:  'oklch(0.9578 0.0265 74.76)',
    warning10:  'oklch(0.9868 0.0079 73.75)',
    info100:    'oklch(0.3526 0.0842 242.35)',
    info10:     'oklch(0.9804 0.0042 236.5)',
};

const SHADOW = {
    large:      '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.15)',
    medium:     '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.12)',
    extraSmall: '0 0 12px 0 oklch(0.1798 0.0104 248.41 / 0.08)',
};

const FONT = "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

const BRAND_GRADIENT = 'linear-gradient(135deg, oklch(0.4047 0.1894 289.97) 30%, oklch(0.7328 0.1183 299.96) 100%)';

// ─── Animation CSS ──────────────────────────────────────────────────────────────

const ANIM_CSS = `
@keyframes eh-card-in   { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes eh-hint-swap { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: translateX(0); } }
@keyframes eh-glow {
  0%   { box-shadow: 0 0 0 0   oklch(0.4366 0.2066 289.78 / 0.45); }
  70%  { box-shadow: 0 0 0 9px oklch(0.4366 0.2066 289.78 / 0); }
  100% { box-shadow: 0 0 0 0   oklch(0.4366 0.2066 289.78 / 0); }
}
@keyframes eh-snack-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

// ─── Types ───────────────────────────────────────────────────────────────────────

interface EditorHint {
    id: string;
    title: string;
    body: string;
    linkLabel: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const HINTS: EditorHint[] = [
    {
        id: 'autosave',
        title: 'Your work saves itself',
        body: 'Every edit is stored as a draft automatically. Look for the autosave indicator next to the title while editing — no manual saving needed.',
        linkLabel: 'See how drafts work',
    },
    {
        id: 'scheduling',
        title: 'Publish while you sleep',
        body: 'Set a future publication date on any content item and it goes live on its own — no midnight logins required.',
        linkLabel: 'Learn about scheduling',
    },
    {
        id: 'versions',
        title: 'Nothing is ever lost',
        body: 'Every published change creates a version. Compare versions side by side and restore any of them from the Versions tab.',
        linkLabel: 'Explore version history',
    },
    {
        id: 'bookmarks',
        title: 'Star your frequent flyers',
        body: 'Bookmark content you edit often with the star next to its title, and jump back to it instantly from the bookmarks menu.',
        linkLabel: 'Learn about bookmarks',
    },
    {
        id: 'preview',
        title: 'One item, many sites',
        body: 'The same content can render differently per site. Use Preview to check every site context before you publish.',
        linkLabel: 'See multisite preview',
    },
    {
        id: 'media',
        title: 'Upload once, reuse everywhere',
        body: 'Images and files added to the Media library can be embedded in any content item — no need to upload them twice.',
        linkLabel: 'Browse the Media library',
    },
];

// ─── Brand mark ────────────────────────────────────────────────────────────────

const BrandMark = ({ size = 30 }: { size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: size * 0.22, background: BRAND_GRADIENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width={size} height={size} viewBox="0 0 65 64" fill="none" aria-hidden style={{ display: 'block' }}>
            <path d="M33.3784 14.8663L36.5296 19.4717C36.7764 19.8285 36.6851 20.3167 36.3233 20.5624C36.1915 20.6533 36.0359 20.7004 35.877 20.7004L23.2486 20.7072C22.8124 20.7072 22.4607 20.3571 22.4607 19.9261L22.4438 13.9204C22.4438 13.4861 22.7921 13.136 23.2283 13.1326L30.0378 13.1191C30.0683 13.1191 30.0987 13.1191 30.1291 13.1225C31.3734 13.2302 32.523 13.8328 33.3175 14.7923C33.3378 14.8158 33.3581 14.8428 33.375 14.8697" fill={C.neutral10} />
            <path d="M33.348 49.0629C32.3776 50.3354 30.9947 50.8875 29.4631 50.8875H23.2553C22.8192 50.8875 22.4675 50.5374 22.4675 50.1032V44.1748C22.4709 43.7405 22.8225 43.3904 23.2587 43.3904L35.7993 43.3803C36.2355 43.3803 36.5871 43.7304 36.5871 44.1613C36.5871 44.3229 36.5397 44.4778 36.4451 44.6091L33.348 49.0629Z" fill={C.neutral10} />
            <path d="M49.7195 43.3231L38.839 43.3534C38.4029 43.3534 38.0512 43.0067 38.0479 42.5724C38.0479 42.4108 38.0952 42.2526 38.1899 42.1213L41.3039 37.6304C42.1525 36.4825 43.4915 35.7957 44.925 35.7755L49.7026 35.762C50.1387 35.762 50.4904 36.1088 50.4938 36.543L50.5073 42.5354C50.5073 42.9696 50.159 43.3198 49.7229 43.3231" fill={C.neutral10} />
            <path d="M50.5072 27.4165C50.5072 27.8508 50.1556 28.2009 49.7228 28.2009H44.81C43.3156 28.2009 42.0273 27.3963 41.1821 26.2214L38.2642 21.9427C38.0207 21.5858 38.112 21.0977 38.4704 20.8519C38.6023 20.7644 38.7578 20.7139 38.9167 20.7173L49.7126 20.7072C50.1488 20.7072 50.5004 21.0573 50.5004 21.4882L50.5106 27.4098L50.5072 27.4165Z" fill={C.neutral10} />
            <path d="M21.7034 21.4478V42.5791C21.7034 43.0134 21.2131 43.3635 20.6045 43.3635H14.8735C14.2683 43.3635 13.7747 43.0134 13.7747 42.5791V21.4478C13.7747 21.0135 14.2649 20.6634 14.8735 20.6634H20.6045C21.2097 20.6634 21.7034 21.0135 21.7034 21.4478Z" fill={C.neutral10} />
        </svg>
    </div>
);

// ─── Chrome: top bar, left rail, secondary nav ───────────────────────────────────

const TopBar = () => (
    <header style={{ height: 56, background: C.neutral240, display: 'flex', alignItems: 'center', paddingLeft: 14, paddingRight: 16, gap: 12, flexShrink: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, width: 200 }}>
            <BrandMark size={30} />
            <span style={{ fontFamily: FONT, fontSize: 17, fontWeight: 700, color: C.neutral10, letterSpacing: '-0.01em' }}>cohesivo</span>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 560, height: 36, background: C.neutral230, border: `1px solid ${C.neutral220}`, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, color: C.neutral150, fill: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
                <span style={{ flex: 1 }}>Search…</span>
                <Icon name="search" size={IconSize.Small} />
            </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: FONT, fontSize: 14, color: C.neutral80, fill: C.neutral80, cursor: 'pointer' }}>
                <Icon name="world" size={IconSize.Small} />
                <span>Site: All context</span>
                <Icon name="arrow-caret-down" size={IconSize.Tiny} />
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, color: C.neutral80, fill: C.neutral80 }} title="Notifications">
                <Icon name="bell" size={IconSize.SmallMedium} />
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, color: C.neutral80, fill: C.neutral80 }} title="Apps">
                <Icon name="apps" size={IconSize.SmallMedium} />
            </button>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.primary70, color: C.neutral10, fontFamily: FONT, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                AU
            </div>
        </div>
    </header>
);

const RAIL_ITEMS = [
    { icon: 'home',          label: 'Dashboard' },
    { icon: 'content-tree',  label: 'Content structure', active: true },
    { icon: 'world',         label: 'Regional & translations' },
    { icon: 'box-component', label: 'Page builder' },
    { icon: 'user-group',    label: 'Users' },
    { icon: 'suitcase',      label: 'Commerce' },
    { icon: 'speaker',       label: 'Campaigns' },
];

const LeftRail = () => (
    <nav style={{ width: 56, minWidth: 56, background: C.neutral240, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%', flex: 1 }}>
            {RAIL_ITEMS.map(item => (
                <button
                    key={item.icon}
                    title={item.label}
                    style={{
                        width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: item.active ? C.primary70 : 'transparent',
                        color: item.active ? C.neutral10 : C.neutral100,
                        fill:  item.active ? C.neutral10 : C.neutral100,
                        transition: 'background 0.15s',
                    }}
                >
                    <Icon name={item.icon} size={IconSize.SmallMedium} />
                </button>
            ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingBottom: 10 }}>
            <button title="Settings" style={{ width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', color: C.neutral100, fill: C.neutral100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="settings-cog" size={IconSize.SmallMedium} />
            </button>
            <button title="Bookmarks" style={{ width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', color: C.neutral100, fill: C.neutral100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="bookmark-outline" size={IconSize.SmallMedium} />
            </button>
        </div>
    </nav>
);

const SecondaryNav = () => {
    const primaryItems = [
        { label: 'Content structure', active: true },
        { label: 'Media' },
        { label: 'Drafts' },
        { label: 'Forms' },
        { label: 'Calendar' },
        { label: 'Tags' },
    ];
    const settingsItems = ['Sections', 'Content types', 'Object States'];

    return (
        <nav style={{ width: 210, minWidth: 210, background: C.neutral230, display: 'flex', flexDirection: 'column', padding: '12px 10px', gap: 2, overflowY: 'auto' }}>
            {primaryItems.map(item => (
                <div
                    key={item.label}
                    style={{
                        display: 'flex', alignItems: 'center', height: 34, padding: '0 12px', borderRadius: 8,
                        fontFamily: FONT, fontSize: 13.5, cursor: 'pointer',
                        background: item.active ? C.primary20 : 'transparent',
                        color: item.active ? C.primary80 : C.neutral100,
                        fontWeight: item.active ? 600 : 400,
                    }}
                >
                    {item.label}
                </div>
            ))}

            <div style={{ height: 1, background: C.neutral220, margin: '12px 12px 8px' }} />
            <div style={{ padding: '0 12px 4px', fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.neutral150 }}>Settings</div>

            {settingsItems.map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', height: 34, padding: '0 12px', borderRadius: 8, fontFamily: FONT, fontSize: 13.5, color: C.neutral100, cursor: 'pointer' }}>
                    {label}
                </div>
            ))}
        </nav>
    );
};

// ─── Content tree panel ──────────────────────────────────────────────────────────

interface TreeRowData {
    id: string;
    name: string;
    icon: string;
    depth: number;
    folder?: boolean;
    expanded?: boolean;
    selected?: boolean;
}

const TREE_ROWS: TreeRowData[] = [
    { id: 'root',     name: 'Ibexa Digital Experience Platform', icon: 'content-tree-site-structure', depth: 0, folder: true, expanded: true },
    { id: 'platform', name: 'Ibexa Platform', icon: 'folder', depth: 1, folder: true, expanded: true, selected: true },
    { id: 'homepage', name: 'Homepage',        icon: 'layout',        depth: 2 },
    { id: 'articles', name: 'Latest articles', icon: 'folder',        depth: 2, folder: true, expanded: false },
    { id: 'getting',  name: 'Getting started', icon: 'note-text',     depth: 2 },
    { id: 'contact',  name: 'Contact us',      icon: 'message-email', depth: 2 },
];

const TreeRow = ({ row }: { row: TreeRowData }) => (
    <div
        style={{
            display: 'flex', alignItems: 'center', height: 32,
            paddingLeft: 10 + row.depth * 16, paddingRight: 10,
            background: row.selected ? C.neutral40 : 'transparent',
            cursor: 'pointer',
        }}
    >
        <span style={{ width: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: C.neutral150, fill: C.neutral150, flexShrink: 0 }}>
            {row.folder && (
                <span style={{ transform: row.expanded ? 'none' : 'rotate(-90deg)', display: 'inline-flex', transition: 'transform 0.15s' }}>
                    <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                </span>
            )}
        </span>
        <span style={{ display: 'inline-flex', marginRight: 7, color: row.selected ? C.primary80 : C.neutral170, fill: row.selected ? C.primary80 : C.neutral170, flexShrink: 0 }}>
            <Icon name={row.icon} size={IconSize.Small} />
        </span>
        <span style={{ flex: 1, fontFamily: FONT, fontSize: 13, color: row.selected ? C.neutral240 : C.neutral190, fontWeight: row.selected ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {row.name}
        </span>
    </div>
);

const ContentTreePanel = () => (
    <div style={{ width: 300, minWidth: 300, background: C.neutral10, borderRight: `1px solid ${C.neutral60}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 12px', borderBottom: `1px solid ${C.neutral60}` }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.neutral170, fill: C.neutral170 }} title="Back">
                <Icon name="arrow-caret-left" size={IconSize.Small} />
            </button>
            <span style={{ display: 'inline-flex', color: C.neutral190, fill: C.neutral190 }}>
                <Icon name="content-tree" size={IconSize.Small} />
            </span>
            <span style={{ flex: 1, fontFamily: FONT, fontSize: 14, fontWeight: 700, color: C.neutral240 }}>Content tree</span>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150 }} title="Tree options">
                <Icon name="more" size={IconSize.Small} />
            </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 4 }}>
            {TREE_ROWS.map(row => <TreeRow key={row.id} row={row} />)}
        </div>
    </div>
);

// ─── Outlined chrome button ──────────────────────────────────────────────────────

const ChromeButton = ({ children, icon, title }: { children?: React.ReactNode; icon?: string; title?: string }) => (
    <button
        title={title}
        style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, height: 36,
            padding: children ? '0 14px' : '0 9px',
            background: C.neutral10, border: `1px solid ${C.primary70}`, borderRadius: 8,
            color: C.primary80, fill: C.primary80, fontFamily: FONT, fontSize: 13.5, fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap',
        }}
    >
        {icon && <Icon name={icon} size={IconSize.Small} />}
        {children}
    </button>
);

// ─── Fields ──────────────────────────────────────────────────────────────────────

const Field = ({ label, children, bold }: { label: string; children: React.ReactNode; bold?: boolean }) => (
    <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150, marginBottom: 6 }}>{label}</div>
        <div style={{ fontFamily: FONT, fontSize: 15, color: C.neutral240, fontWeight: bold ? 700 : 400, lineHeight: 1.6 }}>{children}</div>
    </div>
);

// ─── "Did you know?" hint widget ─────────────────────────────────────────────────

const BulbBadge = ({ size = 36, glow = false }: { size?: number; glow?: boolean }) => (
    <div
        style={{
            width: size, height: size, borderRadius: '50%', background: BRAND_GRADIENT,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            color: C.neutral10, fill: C.neutral10,
            animation: glow ? 'eh-glow 2.4s ease-in-out infinite' : 'none',
        }}
    >
        <Icon name="bulb-idea" size={size >= 36 ? IconSize.SmallMedium : IconSize.Small} />
    </div>
);

interface HintCardProps {
    hintIndex: number;
    onPrev: () => void;
    onNext: () => void;
    onJump: (index: number) => void;
    onMinimize: () => void;
    onTurnOff: () => void;
}

const HintCard = ({ hintIndex, onPrev, onNext, onJump, onMinimize, onTurnOff }: HintCardProps) => {
    const hint = HINTS[hintIndex];

    const navButtonStyle: React.CSSProperties = {
        width: 26, height: 26, borderRadius: 7, border: `1px solid ${C.neutral70}`,
        background: C.neutral10, cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: C.neutral190, fill: C.neutral190, padding: 0,
    };

    return (
        <div
            style={{
                width: 364, background: C.neutral10, borderRadius: 12, overflow: 'hidden',
                border: `1px solid ${C.neutral60}`, boxShadow: SHADOW.medium,
                animation: 'eh-card-in 0.25s ease',
            }}
        >
            {/* Gradient accent strip */}
            <div style={{ height: 4, background: BRAND_GRADIENT }} />

            <div style={{ padding: '14px 16px 12px' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <BulbBadge size={36} glow />
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.primary80 }}>
                            Did you know?
                        </div>
                        <div style={{ fontFamily: FONT, fontSize: 11.5, color: C.neutral150, marginTop: 1 }}>
                            Editor tip {hintIndex + 1} of {HINTS.length}
                        </div>
                    </div>
                    <button
                        onClick={onMinimize}
                        title="Minimize tips"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150, alignSelf: 'flex-start' }}
                    >
                        <Icon name="x" size={IconSize.Small} />
                    </button>
                </div>

                {/* Hint body — keyed by hint so switching re-triggers the swap animation */}
                <div key={hint.id} style={{ marginTop: 12, animation: 'eh-hint-swap 0.25s ease' }}>
                    <div style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 700, color: C.neutral240 }}>{hint.title}</div>
                    <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190, lineHeight: 1.55, marginTop: 5 }}>{hint.body}</div>
                    <button
                        style={{
                            marginTop: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                            display: 'inline-flex', alignItems: 'center', gap: 5,
                            fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: C.primary80, fill: C.primary80,
                        }}
                    >
                        {hint.linkLabel}
                        <Icon name="open-new-window" size={IconSize.Tiny} />
                    </button>
                </div>

                {/* Footer: turn off · dots · prev/next */}
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 14, paddingTop: 11, borderTop: `1px solid ${C.neutral50}` }}>
                    <button
                        onClick={onTurnOff}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: FONT, fontSize: 11.5, color: C.neutral150, textDecoration: 'underline' }}
                    >
                        Turn off tips
                    </button>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 5 }}>
                        {HINTS.map((h, i) => (
                            <button
                                key={h.id}
                                onClick={() => onJump(i)}
                                title={h.title}
                                style={{
                                    width: i === hintIndex ? 16 : 6, height: 6, borderRadius: 3, border: 'none', padding: 0,
                                    cursor: 'pointer', background: i === hintIndex ? C.primary70 : C.neutral70,
                                    transition: 'width 0.2s, background 0.2s',
                                }}
                            />
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={onPrev} title="Previous tip" style={navButtonStyle}>
                            <Icon name="arrow-caret-left" size={IconSize.Tiny} />
                        </button>
                        <button onClick={onNext} title="Next tip" style={navButtonStyle}>
                            <Icon name="arrow-caret-right" size={IconSize.Tiny} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HintPill = ({ onOpen }: { onOpen: () => void }) => (
    <button
        onClick={onOpen}
        title="Editor tips"
        style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 16px 0 6px',
            background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 20,
            boxShadow: SHADOW.extraSmall, cursor: 'pointer',
            fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral190,
            animation: 'eh-card-in 0.25s ease',
        }}
    >
        <BulbBadge size={30} glow />
        Tips
    </button>
);

const TurnedOffSnackbar = ({ onUndo, onDismiss }: { onUndo: () => void; onDismiss: () => void }) => (
    <div
        style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px',
            background: C.neutral230, borderRadius: 10, boxShadow: SHADOW.medium,
            animation: 'eh-snack-in 0.2s ease', maxWidth: 420,
        }}
    >
        <span style={{ fontFamily: FONT, fontSize: 12.5, color: C.neutral80, lineHeight: 1.45 }}>
            Editor tips turned off. You can re-enable them anytime in your user settings.
        </span>
        <button
            onClick={onUndo}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: FONT, fontSize: 12.5, fontWeight: 700, color: C.primary30, whiteSpace: 'nowrap' }}
        >
            Undo
        </button>
        <button
            onClick={onDismiss}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.neutral100, fill: C.neutral100 }}
            title="Dismiss"
        >
            <Icon name="x" size={IconSize.Tiny} />
        </button>
    </div>
);

// ─── Root mockup ─────────────────────────────────────────────────────────────────

type HintWidgetMode = 'open' | 'minimized' | 'off';

const EditorHintsMockup = () => {
    // Each session starts on a random tip, so returning editors see something new
    const [hintIndex, setHintIndex] = useState(() => Math.floor(Math.random() * HINTS.length));
    const [widgetMode, setWidgetMode] = useState<HintWidgetMode>('open');
    const [showOffSnackbar, setShowOffSnackbar] = useState(false);
    const [contentExpanded, setContentExpanded] = useState(true);

    const nextHint = () => setHintIndex(i => (i + 1) % HINTS.length);
    const prevHint = () => setHintIndex(i => (i - 1 + HINTS.length) % HINTS.length);

    const turnOff = () => {
        setWidgetMode('off');
        setShowOffSnackbar(true);
    };

    const undoTurnOff = () => {
        setWidgetMode('open');
        setShowOffSnackbar(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: FONT, background: C.neutral20, overflow: 'hidden' }}>
            <style>{ANIM_CSS}</style>

            <TopBar />

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <LeftRail />
                <SecondaryNav />
                <ContentTreePanel />

                {/* Main content */}
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: C.neutral20 }}>
                    {/* Breadcrumb */}
                    <div style={{ padding: '10px 32px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT, fontSize: 13, background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, flexShrink: 0 }}>
                        <span style={{ cursor: 'pointer', color: C.primary80 }}>Ibexa Digital Experience Platform</span>
                        <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral100, fill: C.neutral100 }}><Icon name="arrow-caret-down" size={IconSize.Tiny} /></span>
                        <span style={{ color: C.neutral240, fontWeight: 500 }}>Ibexa Platform</span>
                    </div>

                    {/* Header block */}
                    <div style={{ background: C.neutral10, padding: '18px 32px 0', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <h1 style={{ margin: 0, fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.neutral240 }}>Ibexa Platform</h1>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150 }} title="Add to bookmarks">
                                        <Icon name="favourite-outline" size={IconSize.SmallMedium} />
                                    </button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 13, color: C.neutral170, fill: C.neutral170 }}>
                                        <Icon name="folder" size={IconSize.Small} />
                                        Folder
                                    </span>
                                    <Tag type={TagType.Success} size={TagSize.Small}>Published</Tag>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                <Button type={ButtonType.Primary} size={ButtonSize.Medium} icon="add" onClick={() => undefined}>
                                    Create content
                                </Button>
                                <ChromeButton>Preview</ChromeButton>
                                <ChromeButton>Edit</ChromeButton>
                                <ChromeButton>Share</ChromeButton>
                                <ChromeButton icon="more" title="More actions" />
                            </div>
                        </div>

                        {/* Simplified tab strip */}
                        <div style={{ display: 'flex', gap: 4, marginTop: 18, borderBottom: `1px solid ${C.neutral60}` }}>
                            {['Fields', 'Sub-items', 'Versions', 'Locations'].map((tab, i) => (
                                <div
                                    key={tab}
                                    style={{
                                        padding: '10px 16px', fontFamily: FONT, fontSize: 13.5, cursor: 'pointer',
                                        color: i === 0 ? C.primary80 : C.neutral190, fontWeight: i === 0 ? 600 : 400,
                                        borderBottom: i === 0 ? `2px solid ${C.primary70}` : '2px solid transparent',
                                        marginBottom: -1,
                                    }}
                                >
                                    {tab}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tab content */}
                    <div style={{ flex: 1, background: C.neutral10, padding: '28px 32px 40px' }}>
                        <h2 style={{ margin: '0 0 20px', fontFamily: FONT, fontSize: 20, fontWeight: 700, color: C.neutral240 }}>Descriptions</h2>

                        <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: contentExpanded ? `1px solid ${C.neutral60}` : 'none', background: C.neutral20 }}>
                                <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.neutral240 }}>Content</span>
                                <button
                                    onClick={() => setContentExpanded(v => !v)}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.primary80, fill: C.primary80 }}
                                >
                                    {contentExpanded ? 'Hide' : 'Show'}
                                    <span style={{ transform: contentExpanded ? 'none' : 'rotate(-90deg)', display: 'inline-flex', transition: 'transform 0.15s' }}>
                                        <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                                    </span>
                                </button>
                            </div>

                            {contentExpanded && (
                                <div style={{ padding: '22px 18px 4px' }}>
                                    <Field label="Name">Ibexa Platform</Field>
                                    <Field label="Short name">Ibexa Platform</Field>
                                    <Field label="Short description" bold>You are now ready to start your project.</Field>
                                    <Field label="Description">
                                        <p style={{ margin: '0 0 12px' }}>This is the clean installation coming with Ibexa Platform.</p>
                                        <p style={{ margin: 0 }}>It's a bare-bones setup of the Platform, an excellent foundation to build upon if you want to start your project from scratch.</p>
                                    </Field>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {/* "Did you know?" widget — single fixed home, bottom right */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                {widgetMode === 'open' && (
                    <HintCard
                        hintIndex={hintIndex}
                        onPrev={prevHint}
                        onNext={nextHint}
                        onJump={setHintIndex}
                        onMinimize={() => setWidgetMode('minimized')}
                        onTurnOff={turnOff}
                    />
                )}
                {widgetMode === 'minimized' && (
                    <HintPill
                        onOpen={() => {
                            nextHint();
                            setWidgetMode('open');
                        }}
                    />
                )}
                {showOffSnackbar && (
                    <TurnedOffSnackbar onUndo={undoTurnOff} onDismiss={() => setShowOffSnackbar(false)} />
                )}
            </div>
        </div>
    );
};

// ─── Storybook ───────────────────────────────────────────────────────────────────

const meta: Meta<typeof EditorHintsMockup> = {
    component: EditorHintsMockup,
    title: 'Mockups/EditorHints',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof EditorHintsMockup>;

export const Default: Story = {
    name: 'Content view — editor tips widget',
};