import React, { useEffect, useRef, useState } from 'react';

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
@keyframes cv-ring {
  0%   { box-shadow: 0 0 0 0   oklch(0.4366 0.2066 289.78 / 0.6); }
  70%  { box-shadow: 0 0 0 6px oklch(0.4366 0.2066 289.78 / 0); }
  100% { box-shadow: 0 0 0 0   oklch(0.4366 0.2066 289.78 / 0); }
}
@keyframes cv-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes cv-spin  { to { transform: rotate(360deg); } }
@keyframes cv-toast-in   { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cv-banner-in  { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cv-indeterminate { 0% { transform: translateX(-120%); } 100% { transform: translateX(300%); } }
`;

// ─── Types ───────────────────────────────────────────────────────────────────────

type PubStatus = 'idle' | 'publishing' | 'queued' | 'failed' | 'success';

interface ToastItem {
    id: string;
    type: 'success' | 'error';
    title: string;
    subtitle?: string;
    actionLabel?: string;
}

let _toastCounter = 0;
const toastId = () => `t${++_toastCounter}`;

// ─── Animated primitives ───────────────────────────────────────────────────────

const Spinner = ({ color, size = 11 }: { color: string; size?: number }) => (
    <span
        style={{
            display: 'inline-block', width: size, height: size,
            border: `2px solid ${color}`, borderTopColor: 'transparent',
            borderRadius: '50%', animation: 'cv-spin 0.7s linear infinite', flexShrink: 0,
        }}
    />
);

const AnimatedEllipsis = () => {
    const [n, setN] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setN(x => (x + 1) % 4), 420);
        return () => clearInterval(id);
    }, []);
    return <span style={{ display: 'inline-block', width: 14, textAlign: 'left' }}>{'...'.slice(0, n)}</span>;
};

const StatusDot = ({ status, size = 8 }: { status: PubStatus; size?: number }) => {
    if (status === 'idle') return null;
    const map: Record<Exclude<PubStatus, 'idle'>, [string, string]> = {
        publishing: [C.primary70,  'cv-ring 1.3s ease-in-out infinite'],
        queued:     [C.neutral150, 'cv-blink 1.8s ease-in-out infinite'],
        failed:     [C.error80,    'none'],
        success:    [C.success90,  'none'],
    };
    const [bg, anim] = map[status];
    return (
        <span style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', background: bg, animation: anim, flexShrink: 0 }} />
    );
};

// ─── Publication status chip (sits next to the content type in the header) ──────

const PubChip = ({ status }: { status: PubStatus }) => {
    if (status === 'publishing') {
        return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 6, background: C.primary10, border: `1px solid ${C.primary30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.primary80 }}>
                <Spinner color={C.primary80} size={10} />
                <span>Publishing<AnimatedEllipsis /></span>
            </span>
        );
    }
    if (status === 'success') {
        return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 6, background: C.success20, border: `1px solid ${C.success30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.success90 }}>
                <span style={{ display: 'inline-flex', color: C.success90, fill: C.success90 }}><Icon name="check-circle" size={IconSize.Tiny} /></span>
                <span>Published</span>
            </span>
        );
    }
    if (status === 'queued') {
        return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 6, background: C.neutral40, border: `1px solid ${C.neutral70}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.neutral190 }}>
                <StatusDot status="queued" size={6} />
                <span>Queued</span>
            </span>
        );
    }
    if (status === 'failed') {
        return (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 6, background: C.error10, border: `1px solid ${C.error30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.error80 }}>
                <StatusDot status="failed" size={6} />
                <span>Publish failed</span>
            </span>
        );
    }
    return null;
};

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

// ─── Left icon rail ──────────────────────────────────────────────────────────────

const RAIL_ITEMS = [
    { icon: 'home',         label: 'Dashboard' },
    { icon: 'content-tree', label: 'Content structure', active: true },
    { icon: 'world',        label: 'Regional & translations' },
    { icon: 'box-component', label: 'Page builder' },
    { icon: 'user-group',   label: 'Users' },
    { icon: 'suitcase',     label: 'Commerce' },
    { icon: 'speaker',      label: 'Campaigns' },
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

// ─── Secondary text navigation ───────────────────────────────────────────────────

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

// ─── Top bar ─────────────────────────────────────────────────────────────────────

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

// ─── Content tree panel ──────────────────────────────────────────────────────────

interface TreeRowData {
    id: string;
    name: string;
    icon: string;
    depth: number;
    folder?: boolean;
    expanded?: boolean;
    selected?: boolean;
    status: PubStatus;
}

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
        {row.status !== 'idle' && (
            <span style={{ marginLeft: 6, flexShrink: 0 }}>
                <StatusDot status={row.status} size={8} />
            </span>
        )}
    </div>
);

const TreeMiniCount = ({ dot, count, label }: { dot: PubStatus; count: number; label: string }) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FONT, fontSize: 11, color: C.neutral170 }}>
        <StatusDot status={dot} size={6} />
        {count} {label}
    </span>
);

const ContentTreePanel = ({ rows }: { rows: TreeRowData[] }) => {
    const publishing = rows.filter(r => r.status === 'publishing').length;
    const queued     = rows.filter(r => r.status === 'queued').length;
    const failed     = rows.filter(r => r.status === 'failed').length;
    const anyActivity = publishing + queued + failed > 0;

    return (
        <div style={{ width: 300, minWidth: 300, background: C.neutral10, borderRight: `1px solid ${C.neutral60}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
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

            {/* Tree */}
            <div style={{ flex: 1, overflowY: 'auto', paddingTop: 4 }}>
                {rows.map(row => <TreeRow key={row.id} row={row} />)}
            </div>

            {/* Live publish-activity summary */}
            {anyActivity && (
                <div style={{ borderTop: `1px solid ${C.neutral60}`, background: C.neutral20, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {publishing > 0 && <TreeMiniCount dot="publishing" count={publishing} label="publishing" />}
                    {queued     > 0 && <TreeMiniCount dot="queued"     count={queued}     label="queued" />}
                    {failed     > 0 && <TreeMiniCount dot="failed"     count={failed}     label="failed" />}
                </div>
            )}
        </div>
    );
};

// ─── Background-publishing banner ────────────────────────────────────────────────

const PublishingBanner = ({ status }: { status: PubStatus }) => {
    if (status === 'publishing') {
        return (
            <div style={{ margin: '12px 32px 0', background: C.primary10, border: `1px solid ${C.primary30}`, borderLeft: `4px solid ${C.primary70}`, borderRadius: 8, padding: '12px 16px', animation: 'cv-banner-in 0.25s ease' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ marginTop: 2 }}><Spinner color={C.primary70} size={16} /></div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: C.neutral240 }}>
                            Publishing in the background<AnimatedEllipsis />
                        </div>
                        <div style={{ fontFamily: FONT, fontSize: 12.5, color: C.neutral190, marginTop: 2, lineHeight: 1.5 }}>
                            Version 4 (English) is being published. The currently live version stays available until it completes — you'll be notified when it's done.
                        </div>
                    </div>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: C.primary80, flexShrink: 0, alignSelf: 'center' }}>
                        View publish queue
                    </button>
                </div>
                <div style={{ position: 'relative', height: 4, borderRadius: 2, background: C.primary20, overflow: 'hidden', marginTop: 10 }}>
                    <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', borderRadius: 2, background: C.primary70, animation: 'cv-indeterminate 1.3s ease-in-out infinite' }} />
                </div>
            </div>
        );
    }
    if (status === 'success') {
        return (
            <div style={{ margin: '12px 32px 0', background: C.success20, border: `1px solid ${C.success30}`, borderLeft: `4px solid ${C.success90}`, borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 12, animation: 'cv-banner-in 0.25s ease' }}>
                <div style={{ color: C.success90, fill: C.success90, marginTop: 1, flexShrink: 0 }}>
                    <Icon name="check-circle" size={IconSize.SmallMedium} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 700, color: C.neutral240 }}>Ibexa Platform published</div>
                    <div style={{ fontFamily: FONT, fontSize: 12.5, color: C.neutral190, marginTop: 2 }}>The view has been refreshed with version 4.</div>
                </div>
            </div>
        );
    }
    return null;
};

// ─── Toasts ──────────────────────────────────────────────────────────────────────

const Toast = ({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) => (
    <div style={{
        background: C.neutral10,
        border: `1px solid ${toast.type === 'success' ? C.success30 : C.error30}`,
        borderLeft: `4px solid ${toast.type === 'success' ? C.success90 : C.error80}`,
        borderRadius: 8, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start',
        boxShadow: SHADOW.medium, width: 330, animation: 'cv-toast-in 0.2s ease',
    }}>
        <div style={{ color: toast.type === 'success' ? C.success90 : C.error80, fill: toast.type === 'success' ? C.success90 : C.error80, flexShrink: 0 }}>
            <Icon name={toast.type === 'success' ? 'check-circle' : 'alert-error'} size={IconSize.SmallMedium} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.neutral240 }}>{toast.title}</div>
            {toast.subtitle && <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190, marginTop: 2, lineHeight: 1.4 }}>{toast.subtitle}</div>}
            {toast.actionLabel && (
                <button style={{ marginTop: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.primary80 }}>
                    {toast.actionLabel}
                </button>
            )}
        </div>
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150, flexShrink: 0 }}>
            <Icon name="x" size={IconSize.Small} />
        </button>
    </div>
);

// ─── Outlined chrome button (Preview / Edit / Share / Move / overflow) ───────────

interface ChromeButtonProps {
    children?: React.ReactNode;
    icon?: string;
    locked?: boolean;
    title?: string;
}

const ChromeButton = ({ children, icon, locked, title }: ChromeButtonProps) => (
    <button
        disabled={locked}
        title={locked ? 'Locked while this item is publishing in the background' : title}
        style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, height: 36,
            padding: children ? '0 14px' : '0 9px',
            background: C.neutral10, border: `1px solid ${C.primary70}`, borderRadius: 8,
            color: C.primary80, fill: C.primary80, fontFamily: FONT, fontSize: 13.5, fontWeight: 600,
            cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.4 : 1, whiteSpace: 'nowrap',
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

// ─── Tabs ──────────────────────────────────────────────────────────────────────

const TABS = ['Fields', 'Sub-items', 'Translations', 'Versions', 'Locations', 'URL', 'Relations', 'Authors'];

interface TabBarProps {
    activeTab: string;
    onSelect: (tab: string) => void;
    versionsDot: PubStatus;
}

const TabBar = ({ activeTab, onSelect, versionsDot }: TabBarProps) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, paddingLeft: 32, paddingRight: 32, borderBottom: `1px solid ${C.neutral60}` }}>
        {TABS.map(tab => {
            const isActive = activeTab === tab;
            return (
                <button
                    key={tab}
                    onClick={() => onSelect(tab)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '10px 16px', cursor: 'pointer', whiteSpace: 'nowrap',
                        fontFamily: FONT, fontSize: 13.5,
                        border: `1px solid ${isActive ? C.neutral60 : 'transparent'}`,
                        borderBottom: isActive ? `1px solid ${C.neutral10}` : '1px solid transparent',
                        borderRadius: '8px 8px 0 0',
                        background: isActive ? C.neutral10 : 'transparent',
                        color: isActive ? C.primary80 : C.neutral190,
                        fontWeight: isActive ? 600 : 400,
                        marginBottom: -1,
                        boxShadow: isActive ? '0 -2px 6px oklch(0.1798 0.0104 248.41 / 0.04)' : 'none',
                    }}
                >
                    {tab}
                    {tab === 'Versions' && versionsDot !== 'idle' && <StatusDot status={versionsDot} size={8} />}
                </button>
            );
        })}
        <button style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', color: C.neutral150, fill: C.neutral150, marginBottom: -1 }} title="More tabs">
            <Icon name="more" size={IconSize.Small} />
        </button>
    </div>
);

// ─── Root mockup ─────────────────────────────────────────────────────────────────

const ContentViewPublishingMockup = () => {
    // Live publication state for the items in flight
    const [selectedStatus, setSelectedStatus] = useState<PubStatus>('publishing'); // Ibexa Platform (the open item)
    const [homepageStatus, setHomepageStatus] = useState<PubStatus>('queued');      // next item in the queue
    const [activeTab, setActiveTab] = useState('Fields');
    const [contentExpanded, setContentExpanded] = useState(true);
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const toastTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    const addToast = (t: Omit<ToastItem, 'id'>) => {
        const id = toastId();
        setToasts(prev => [...prev, { ...t, id }]);
        toastTimers.current[id] = setTimeout(() => dismissToast(id), 5200);
    };

    const dismissToast = (id: string) => {
        clearTimeout(toastTimers.current[id]);
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Scripted background-publishing timeline
    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        // 1) The open item finishes; the queue advances to the next item
        timers.push(setTimeout(() => {
            setSelectedStatus('success');
            setHomepageStatus('publishing');
            addToast({
                type: 'success',
                title: 'Ibexa Platform · version 4 published',
                subtitle: 'The view has been refreshed with the latest version.',
                actionLabel: 'View content',
            });
        }, 6500));

        // 2) The open item settles back to its steady published state
        timers.push(setTimeout(() => setSelectedStatus('idle'), 6500 + 2400));

        // 3) The next queued item completes
        timers.push(setTimeout(() => {
            setHomepageStatus('success');
            addToast({ type: 'success', title: 'Homepage · version 3 published', subtitle: 'Background publication completed.' });
        }, 6500 + 5400));

        // 4) ...and settles too
        timers.push(setTimeout(() => setHomepageStatus('idle'), 6500 + 5400 + 2400));

        return () => {
            timers.forEach(clearTimeout);
            Object.values(toastTimers.current).forEach(clearTimeout);
        };
    }, []);

    const isPublishing = selectedStatus === 'publishing';

    const treeRows: TreeRowData[] = [
        { id: 'root',     name: 'Ibexa Digital Experience Platform', icon: 'content-tree-site-structure', depth: 0, folder: true, expanded: true, status: 'idle' },
        { id: 'platform', name: 'Ibexa Platform', icon: 'folder', depth: 1, folder: true, expanded: true, selected: true, status: selectedStatus },
        { id: 'homepage', name: 'Homepage',        icon: 'layout',        depth: 2, status: homepageStatus },
        { id: 'articles', name: 'Latest articles', icon: 'folder',        depth: 2, folder: true, expanded: false, status: 'idle' },
        { id: 'getting',  name: 'Getting started', icon: 'note-text',     depth: 2, status: 'failed' },
        { id: 'contact',  name: 'Contact us',      icon: 'message-email', depth: 2, status: 'idle' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: FONT, background: C.neutral20, overflow: 'hidden' }}>
            <style>{ANIM_CSS}</style>

            <TopBar />

            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <LeftRail />
                <SecondaryNav />
                <ContentTreePanel rows={treeRows} />

                {/* Main content */}
                <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: C.neutral20 }}>
                    {/* Breadcrumb */}
                    <div style={{ padding: '10px 32px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT, fontSize: 13, background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, flexShrink: 0 }}>
                        <span style={{ cursor: 'pointer', color: C.primary80 }}>Ibexa Digital Experience Platform</span>
                        <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral100, fill: C.neutral100 }}><Icon name="arrow-caret-down" size={IconSize.Tiny} /></span>
                        <span style={{ color: C.neutral240, fontWeight: 500 }}>Ibexa Platform</span>
                    </div>

                    {/* Background-publishing banner */}
                    <PublishingBanner status={selectedStatus} />

                    {/* Header block */}
                    <div style={{ background: C.neutral10, padding: '18px 32px 0', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                            {/* Title + content type */}
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
                                    {selectedStatus === 'idle'
                                        ? <Tag type={TagType.Success} size={TagSize.Small}>Published</Tag>
                                        : <PubChip status={selectedStatus} />}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                <Button type={ButtonType.Primary} size={ButtonSize.Medium} icon="add" onClick={() => undefined}>
                                    Create content
                                </Button>
                                <ChromeButton>Preview</ChromeButton>
                                <ChromeButton locked={isPublishing}>Edit</ChromeButton>
                                <ChromeButton>Share</ChromeButton>
                                <ChromeButton locked={isPublishing}>Move</ChromeButton>
                                <ChromeButton icon="more" title="More actions" />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div style={{ marginTop: 18 }}>
                            <TabBar activeTab={activeTab} onSelect={setActiveTab} versionsDot={selectedStatus} />
                        </div>
                    </div>

                    {/* Tab content */}
                    <div style={{ flex: 1, background: C.neutral10, padding: '28px 32px 40px' }}>
                        {activeTab === 'Fields' ? (
                            <>
                                <h2 style={{ margin: '0 0 20px', fontFamily: FONT, fontSize: 20, fontWeight: 700, color: C.neutral240 }}>Descriptions</h2>

                                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                                    {/* Section header */}
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

                                    {/* Fields */}
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
                            </>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240, color: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
                                {activeTab} tab
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Toast stack — bottom right */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {toasts.map(t => <Toast key={t.id} toast={t} onDismiss={() => dismissToast(t.id)} />)}
            </div>
        </div>
    );
};

// ─── Storybook ───────────────────────────────────────────────────────────────────

const meta: Meta<typeof ContentViewPublishingMockup> = {
    component: ContentViewPublishingMockup,
    title: 'Mockups/ContentViewPublishing',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof ContentViewPublishingMockup>;

export const Default: Story = {
    name: 'Content view — background publishing',
};
