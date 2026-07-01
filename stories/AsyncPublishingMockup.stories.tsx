import React, { useEffect, useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Tag, TagGhostType, TagType, TagSize } from '@ids-components/Tag';
import { Icon, IconSize } from '@ids-components/Icon';

// ─── Design tokens ────────────────────────────────────────────────────────────

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
    primary10:  'oklch(0.9577 0.0181 300.71)',
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
};

const FONT   = "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const SHADOW = {
    large:      '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.15)',
    medium:     '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.12)',
    extraSmall: '0 0 12px 0 oklch(0.1798 0.0104 248.41 / 0.08)',
};

// ─── Animation CSS ────────────────────────────────────────────────────────────

const ANIM_CSS = `
@keyframes ap-ring {
  0%   { box-shadow: 0 0 0 0   oklch(0.4366 0.2066 289.78 / 0.65); }
  70%  { box-shadow: 0 0 0 6px oklch(0.4366 0.2066 289.78 / 0); }
  100% { box-shadow: 0 0 0 0   oklch(0.4366 0.2066 289.78 / 0); }
}
@keyframes ap-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
@keyframes ap-spin {
  to { transform: rotate(360deg); }
}
@keyframes ap-toast-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ap-success-dot-fade {
  0%, 50% { opacity: 1; }
  100%    { opacity: 0; }
}
`;

// ─── Types ────────────────────────────────────────────────────────────────────

type PubStatus = 'draft' | 'queued' | 'publishing' | 'failed';
type TabDot    = 'idle' | 'queued' | 'publishing' | 'failed' | 'success';

interface VersionEntry {
    id: string;
    version: number;
    language: string;
    langCode: string;
    status: PubStatus;
    contributor: string;
    initials: string;
    date: string;
    queuePosition?: number;
}

interface ToastItem {
    id: string;
    type: 'success' | 'error';
    title: string;
    subtitle: string;
    actionLabel?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_PENDING: VersionEntry[] = [
    {
        id: 'p1', version: 4, language: 'English (United Kingdom)', langCode: 'en-GB',
        status: 'publishing', contributor: 'Amy Williams', initials: 'AW', date: 'May 14, 14:21',
    },
    {
        id: 'p2', version: 5, language: 'German (Germany)', langCode: 'de-DE',
        status: 'queued', queuePosition: 1, contributor: 'Lukas Bauer', initials: 'LB', date: 'May 14, 14:22',
    },
    {
        id: 'p3', version: 6, language: 'English (United Kingdom)', langCode: 'en-GB',
        status: 'failed', contributor: 'Sara Patel', initials: 'SP', date: 'May 14, 14:24',
    },
];

const INITIAL_DRAFT: VersionEntry = {
    id: 'd7', version: 7, language: 'English (United Kingdom)', langCode: 'en-GB',
    status: 'draft', contributor: 'Konrad Oboza', initials: 'KO', date: 'May 14, 14:30',
};

const PUBLISHED_INITIAL: VersionEntry = {
    id: 'pub3', version: 3, language: 'English (United Kingdom)', langCode: 'en-GB',
    status: 'draft', contributor: 'Amy Williams', initials: 'AW', date: 'April 06, 08:23',
};

const ARCHIVED_INITIAL: VersionEntry[] = [
    { id: 'a2', version: 2, language: 'English (United Kingdom)', langCode: 'en-GB', status: 'draft', contributor: 'Amy Williams', initials: 'AW', date: 'April 06, 08:22' },
    { id: 'a1', version: 1, language: 'English (United Kingdom)', langCode: 'en-GB', status: 'draft', contributor: 'Amy Williams', initials: 'AW', date: 'April 06, 08:18' },
];

// ─── Contributor avatar colours ───────────────────────────────────────────────

const AVATAR_COLOR: Record<string, string> = {
    KO: C.primary80,
    AW: C.success90,
    LB: C.warning100,
    SP: 'oklch(0.62 0.13 26)',
    TA: C.neutral170,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const computeTabDot = (rows: VersionEntry[]): TabDot => {
    if (rows.some(r => r.status === 'failed'))     return 'failed';
    if (rows.some(r => r.status === 'publishing')) return 'publishing';
    if (rows.some(r => r.status === 'queued'))     return 'queued';
    return 'idle';
};

let _toastCounter = 0;
const toastId = () => `t${++_toastCounter}`;

// ─── Animated sub-components ─────────────────────────────────────────────────

const Spinner = ({ color, size = 11 }: { color: string; size?: number }) => (
    <span style={{
        display: 'inline-block', width: size, height: size,
        border: `2px solid ${color}`, borderTopColor: 'transparent',
        borderRadius: '50%', animation: 'ap-spin 0.7s linear infinite', flexShrink: 0,
    }} />
);

const AnimatedEllipsis = () => {
    const [n, setN] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setN(x => (x + 1) % 4), 420);
        return () => clearInterval(id);
    }, []);
    return <span style={{ display: 'inline-block', width: 14, textAlign: 'left' }}>{'...'.slice(0, n)}</span>;
};

const StatusDot = ({ status, size = 7 }: { status: TabDot; size?: number }) => {
    if (status === 'idle') return null;
    const cfg: Record<string, [string, string]> = {
        publishing: [C.primary70,  'ap-ring 1.2s ease-in-out infinite'],
        queued:     [C.neutral150, 'ap-blink 1.8s ease-in-out infinite'],
        failed:     [C.error80,    'none'],
        success:    [C.success90,  'ap-success-dot-fade 2s ease forwards'],
    };
    const [bg, anim] = cfg[status] ?? [C.neutral150, 'none'];
    return (
        <span style={{
            display: 'inline-block', width: size, height: size,
            borderRadius: '50%', background: bg, animation: anim, flexShrink: 0,
        }} />
    );
};

// ─── Publication status chip (inline next to content type in header) ──────────

const PubChip = ({ status }: { status: TabDot }) => {
    if (status === 'idle' || status === 'success') return null;
    const cfgs = {
        publishing: { bg: C.primary10,  border: C.primary30,  color: C.primary80,  label: 'Publishing', dots: true,  spinner: true  },
        queued:     { bg: C.neutral40,  border: C.neutral70,  color: C.neutral190, label: 'Queued',     dots: false, spinner: false },
        failed:     { bg: C.error10,    border: C.error30,    color: C.error80,    label: 'Publish failed', dots: false, spinner: false },
    };
    const cfg = cfgs[status as keyof typeof cfgs];
    if (!cfg) return null;
    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 9px', borderRadius: 6,
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            fontFamily: FONT, fontSize: 12, fontWeight: 600, color: cfg.color,
        }}>
            {cfg.spinner
                ? <Spinner color={cfg.color} size={10} />
                : <StatusDot status={status} size={6} />}
            <span>{cfg.label}{cfg.dots ? <AnimatedEllipsis /> : ''}</span>
        </div>
    );
};

// ─── Nav / chrome (shared across both stories) ────────────────────────────────

const NAV_ICONS = [
    { icon: 'content-tree',      label: 'Content structure' },
    { icon: 'mountain',          label: 'Media' },
    { icon: 'form-check-list',   label: 'Forms' },
    { icon: 'calendar',          label: 'Calendar' },
    { icon: 'tags',              label: 'Tags' },
    { icon: 'list-content',      label: 'Sections' },
    { icon: 'notes-list',        label: 'Content types' },
    { icon: 'database-settings', label: 'Object states' },
];

const LeftNav = () => (
    <nav style={{ width: 52, minWidth: 52, background: C.neutral240, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderBottom: `1px solid ${C.neutral220}` }}>
            <img src="./cohesivo-logo-gradient.png" alt="Cohesivo" style={{ width: 34, height: 34, objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: 4, flex: 1 }}>
            {NAV_ICONS.map((item, i) => (
                <button
                    key={item.icon}
                    title={item.label}
                    style={{
                        width: '100%', height: 44,
                        background: i === 0 ? 'linear-gradient(90deg, oklch(0.4047 0.1894 289.97) 40%, oklch(0.7328 0.1183 299.96) 100%)' : 'transparent',
                        border: 'none',
                        borderLeft: i === 0 ? `3px solid ${C.primary70}` : '3px solid transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: i === 0 ? C.neutral10 : C.neutral150,
                        fill:  i === 0 ? C.neutral10 : C.neutral150,
                    }}
                >
                    <Icon name={item.icon} size={IconSize.SmallMedium} />
                </button>
            ))}
        </div>
        <button title="Settings" style={{ width: '100%', height: 44, background: 'transparent', border: 'none', borderLeft: '3px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.neutral150, fill: C.neutral150, marginBottom: 8 }}>
            <Icon name="settings-cog" size={IconSize.SmallMedium} />
        </button>
    </nav>
);

const TopBar = () => (
    <header style={{ height: 52, background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, gap: 12, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
            <img src="./cohesivo-logo-purple.png" alt="Cohesivo" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: C.neutral240, letterSpacing: '-0.01em' }}>Cohesivo</span>
        </div>
        <div style={{ width: 1, height: 20, background: C.neutral70, marginRight: 4 }} />
        <div style={{ flex: 1, maxWidth: 380, height: 32, background: C.neutral30, border: `1px solid ${C.neutral70}`, borderRadius: 8, display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 10, gap: 8, color: C.neutral150, fill: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
            <Icon name="search" size={IconSize.Small} />
            <span style={{ color: C.neutral150 }}>Search…</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 14, color: C.neutral190, cursor: 'pointer' }}>
            <Icon name="app-www" size={IconSize.Small} />
            <span>Main site</span>
            <Icon name="arrow-caret-down" size={IconSize.Tiny} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, color: C.neutral190, fill: C.neutral190 }}>
                <Icon name="app-settings" size={IconSize.SmallMedium} />
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.primary80, color: C.neutral10, fontFamily: FONT, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                KO
            </div>
        </div>
    </header>
);

// ─── Content-tree sidebar with live publication dots ──────────────────────────

interface TreeNodeProps {
    name: string;
    icon: string;
    depth: number;
    active?: boolean;
    dot?: TabDot;
    isFolder?: boolean;
    expanded?: boolean;
}

const TreeNode = ({ name, icon, depth, active, dot, isFolder, expanded }: TreeNodeProps) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        paddingLeft: 8 + depth * 14, paddingRight: 8, height: 30,
        background: active ? C.primary20 : 'transparent',
        cursor: 'pointer',
    }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, color: C.neutral150, fill: C.neutral150, flexShrink: 0, marginRight: 2 }}>
            {isFolder
                ? <span style={{ transform: expanded ? 'none' : 'rotate(-90deg)', display: 'inline-flex', transition: 'transform 0.15s' }}><Icon name="arrow-caret-down" size={IconSize.Tiny} /></span>
                : null}
        </span>
        <span style={{ color: active ? C.primary80 : C.neutral170, fill: active ? C.primary80 : C.neutral170, display: 'inline-flex', marginRight: 6, flexShrink: 0 }}>
            <Icon name={icon} size={IconSize.Small} />
        </span>
        <span style={{ fontFamily: FONT, fontSize: 12, color: active ? C.primary80 : C.neutral190, fontWeight: active ? 600 : 400, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {name}
        </span>
        {dot && dot !== 'idle' && (
            <span style={{ marginLeft: 4, flexShrink: 0 }}>
                <StatusDot status={dot} size={7} />
            </span>
        )}
    </div>
);

const ContentTreeSidebar = ({ activeDot }: { activeDot: TabDot }) => (
    <div style={{ width: 200, flexShrink: 0, background: C.neutral20, borderRight: `1px solid ${C.neutral60}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '10px 12px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.neutral60}` }}>
            <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.neutral240, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Content tree</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 4 }}>
            <TreeNode name="Blog" icon="list-content" depth={0} isFolder expanded />
            <TreeNode name="Getting Started with Ibexa DXP" icon="edit-draft" depth={1} active dot={activeDot} />
            <TreeNode name="AI-Powered Content Discovery" icon="edit-draft" depth={1} dot="queued" />
            <TreeNode name="Design System v2.0 Released" icon="edit-draft" depth={1} />
            <TreeNode name="Products" icon="list-content" depth={0} isFolder expanded />
            <TreeNode name="Ibexa DXP" icon="notes-list" depth={1} dot="failed" />
            <TreeNode name="Ibexa Commerce" icon="notes-list" depth={1} />
            <TreeNode name="Media Library" icon="mountain" depth={0} isFolder />
        </div>
    </div>
);

// ─── Toast notification system ────────────────────────────────────────────────

const Toast = ({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) => (
    <div style={{
        background: C.neutral10,
        border:     `1px solid ${toast.type === 'success' ? C.success30 : C.error30}`,
        borderLeft: `4px solid ${toast.type === 'success' ? C.success90 : C.error80}`,
        borderRadius: 8, padding: '12px 14px',
        display: 'flex', gap: 10, alignItems: 'flex-start',
        boxShadow: SHADOW.medium, width: 320,
        animation: 'ap-toast-in 0.2s ease',
    }}>
        <div style={{ color: toast.type === 'success' ? C.success90 : C.error80, fill: toast.type === 'success' ? C.success90 : C.error80, flexShrink: 0 }}>
            <Icon name={toast.type === 'success' ? 'check-circle' : 'alert-error'} size={IconSize.SmallMedium} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.neutral240 }}>{toast.title}</div>
            <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190, marginTop: 2, lineHeight: 1.4 }}>{toast.subtitle}</div>
            {toast.actionLabel && (
                <button style={{ marginTop: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.primary80 }}>
                    {toast.actionLabel}
                </button>
            )}
        </div>
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150, flexShrink: 0 }}>
            <Icon name="remove" size={IconSize.Small} />
        </button>
    </div>
);

// ─── Pending publication row ──────────────────────────────────────────────────

const StatusChip = ({ status }: { status: PubStatus }) => {
    if (status === 'draft') return null;
    if (status === 'publishing') {
        return (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 6, background: C.primary10, border: `1px solid ${C.primary30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.primary80 }}>
                <Spinner color={C.primary80} size={10} />
                <span>Publishing<AnimatedEllipsis /></span>
            </div>
        );
    }
    if (status === 'queued') {
        return (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 6, background: C.neutral40, border: `1px solid ${C.neutral70}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.neutral190 }}>
                <StatusDot status="queued" size={6} />
                <span>Queued</span>
            </div>
        );
    }
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 6, background: C.error10, border: `1px solid ${C.error30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.error80 }}>
            <StatusDot status="failed" size={6} />
            <span>Publish failed</span>
        </div>
    );
};

const ContributorAvatar = ({ initials }: { initials: string }) => (
    <div style={{ width: 26, height: 26, borderRadius: '50%', background: AVATAR_COLOR[initials] ?? C.neutral170, color: C.neutral10, fontFamily: FONT, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {initials}
    </div>
);

interface PendingRowUIProps {
    entry: VersionEntry;
    onCancel: () => void;
    onRetry: () => void;
    onPublish: () => void;
}

const PendingTableRow = ({ entry, onCancel, onRetry, onPublish }: PendingRowUIProps) => {
    const [hovered, setHovered] = useState(false);
    const isPublishing = entry.status === 'publishing';

    const borderColor =
        entry.status === 'failed'     ? C.error80 :
        entry.status === 'publishing' ? C.primary70 :
        entry.status === 'queued'     ? C.neutral150 :
        'transparent';

    const bg = hovered
        ? C.neutral30
        : entry.status === 'failed'
            ? C.error10
            : C.neutral10;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr 160px 160px 130px 200px',
                alignItems: 'center',
                borderLeft: `3px solid ${borderColor}`,
                borderBottom: `1px solid ${C.neutral60}`,
                minHeight: 52,
                paddingLeft: 17,
                paddingRight: 16,
                background: bg,
                transition: 'background 0.12s',
            }}
        >
            {/* Version */}
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>
                {entry.version}
            </div>

            {/* Language */}
            <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>
                {entry.language}
            </div>

            {/* Status */}
            <div>
                {entry.status === 'draft'
                    ? <Tag type={TagGhostType.NeutralGhost} size={TagSize.Small}>Draft</Tag>
                    : <StatusChip status={entry.status} />}
            </div>

            {/* Contributor */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <ContributorAvatar initials={entry.initials} />
                <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>{entry.contributor}</span>
            </div>

            {/* Date */}
            <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170 }}>{entry.date}</div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                {entry.status === 'draft' && (
                    <>
                        <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="edit-draft" onClick={() => undefined} ariaLabel="Edit draft" />
                        <Button type={ButtonType.Primary} size={ButtonSize.Small} onClick={onPublish}>
                            Publish
                        </Button>
                    </>
                )}
                {entry.status === 'queued' && (
                    <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                {entry.status === 'failed' && (
                    <>
                        <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="arrows-reload" onClick={onRetry}>
                            Retry
                        </Button>
                        <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="edit-draft" onClick={() => undefined}>
                            Open draft
                        </Button>
                    </>
                )}
                {isPublishing && (
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150, fontStyle: 'italic', paddingRight: 4 }}>
                        In progress…
                    </span>
                )}
            </div>
        </div>
    );
};

// ─── Stats chips ──────────────────────────────────────────────────────────────

const StatChip = ({ count, label, color, bg, border, dot }: {
    count: number; label: string; color: string; bg: string; border: string; dot?: TabDot;
}) => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, background: bg, border: `1px solid ${border}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color }}>
        {dot && <StatusDot status={dot} size={6} />}
        <span>{count} {label}</span>
    </div>
);

// ─── Published / archived row ─────────────────────────────────────────────────

const PublishedRow = ({ entry }: { entry: VersionEntry }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr 160px 160px 160px 200px', alignItems: 'center', minHeight: 52, paddingLeft: 20, paddingRight: 16, background: C.neutral10 }}>
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>{entry.version}</div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>{entry.language}</div>
        <div />
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <ContributorAvatar initials={entry.initials} />
            <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>{entry.contributor}</span>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170 }}>{entry.date}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.neutral100, fill: C.neutral100, display: 'flex', alignItems: 'center', borderRadius: 4 }}>
                <Icon name="form-check-list" size={IconSize.SmallMedium} />
            </button>
        </div>
    </div>
);

const ColHeader = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral170, textTransform: 'uppercase', letterSpacing: '0.04em', ...style }}>
        {children}
    </div>
);

// ─── Versions tab ─────────────────────────────────────────────────────────────

interface VersionsTabProps {
    onTabDotChange: (dot: TabDot) => void;
    onToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const VersionsTab = ({ onTabDotChange, onToast }: VersionsTabProps) => {
    const [pending, setPending]   = useState<VersionEntry[]>(INITIAL_PENDING);
    const [drafts, setDrafts]     = useState<VersionEntry[]>([INITIAL_DRAFT]);
    const [published, setPublished] = useState<VersionEntry>(PUBLISHED_INITIAL);
    const [archived, setArchived]   = useState<VersionEntry[]>(ARCHIVED_INITIAL);
    const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    // Sync tab dot to parent shell
    useEffect(() => {
        onTabDotChange(computeTabDot(pending));
    }, [pending]);

    // Auto-complete p1 (initial publishing item) after 5 seconds
    useEffect(() => {
        timers.current.auto = setTimeout(() => {
            completeItem('p1', true);
        }, 5000);
        return () => { Object.values(timers.current).forEach(clearTimeout); };
    }, []);

    const advanceQueue = (afterRemovingId: string, prevPending: VersionEntry[]): VersionEntry[] => {
        const remaining = prevPending.filter(r => r.id !== afterRemovingId);
        // If nothing is publishing, advance the first queued item
        if (!remaining.some(r => r.status === 'publishing')) {
            const firstQueued = remaining.find(r => r.status === 'queued');
            if (firstQueued) {
                return remaining.map((r, idx) => {
                    if (r.id === firstQueued.id) return { ...r, status: 'publishing' as PubStatus, queuePosition: undefined };
                    if (r.status === 'queued' && r.queuePosition !== undefined) {
                        return { ...r, queuePosition: r.queuePosition - 1 };
                    }
                    return r;
                });
            }
        }
        return remaining;
    };

    const completeItem = (id: string, success: boolean) => {
        setPending(prev => {
            const entry = prev.find(r => r.id === id);
            if (!entry) return prev;

            if (success) {
                // Move to published, archive current
                setPublished(pub => {
                    setArchived(arch => [pub, ...arch]);
                    return { ...entry, status: 'draft' };
                });
                onToast({
                    type: 'success',
                    title: `Getting Started with Ibexa DXP · v${entry.version} published`,
                    subtitle: 'The view has been refreshed.',
                    actionLabel: 'View content',
                });
                const next = advanceQueue(id, prev);
                // If a new item is now publishing, auto-complete it too
                const newPublishing = next.find(r => r.status === 'publishing');
                if (newPublishing) {
                    clearTimeout(timers.current[newPublishing.id]);
                    timers.current[newPublishing.id] = setTimeout(() => {
                        completeItem(newPublishing.id, true);
                    }, 4000);
                }
                return next;
            } else {
                return prev.map(r => r.id === id ? { ...r, status: 'failed' as PubStatus } : r);
            }
        });
    };

    const handleCancel = (id: string) => {
        setPending(prev => {
            const entry = prev.find(r => r.id === id);
            if (!entry) return prev;
            setDrafts(d => [...d, { ...entry, status: 'draft' }]);
            const remaining = prev.filter(r => r.id !== id);
            // Re-number queue
            let q = 1;
            return remaining.map(r => r.status === 'queued' ? { ...r, queuePosition: q++ } : r);
        });
        onToast({ type: 'success', title: 'Publication cancelled', subtitle: 'The draft is available for editing.' });
    };

    const handleRetry = (id: string) => {
        clearTimeout(timers.current[id]);
        setPending(prev => {
            const hasPublishing = prev.some(r => r.status === 'publishing');
            const next = prev.map(r => {
                if (r.id !== id) return r;
                if (hasPublishing) {
                    const maxQ = Math.max(0, ...prev.filter(x => x.queuePosition !== undefined).map(x => x.queuePosition!));
                    return { ...r, status: 'queued' as PubStatus, queuePosition: maxQ + 1 };
                }
                return { ...r, status: 'publishing' as PubStatus, queuePosition: undefined };
            });
            const retried = next.find(r => r.id === id);
            if (retried?.status === 'publishing') {
                timers.current[id] = setTimeout(() => completeItem(id, true), 4000);
            }
            return next;
        });
    };

    const handlePublish = (draftId: string) => {
        const draft = drafts.find(d => d.id === draftId);
        if (!draft) return;
        setDrafts(prev => prev.filter(d => d.id !== draftId));
        setPending(prev => {
            const hasPublishing = prev.some(r => r.status === 'publishing');
            const maxQ = Math.max(0, ...prev.filter(r => r.queuePosition !== undefined).map(r => r.queuePosition!));
            if (hasPublishing) {
                return [...prev, { ...draft, status: 'queued' as PubStatus, queuePosition: maxQ + 1 }];
            }
            timers.current[draft.id] = setTimeout(() => completeItem(draft.id, true), 4000);
            return [...prev, { ...draft, status: 'publishing' as PubStatus, queuePosition: undefined }];
        });
    };

    const countPublishing = pending.filter(r => r.status === 'publishing').length;
    const countQueued     = pending.filter(r => r.status === 'queued').length;
    const countFailed     = pending.filter(r => r.status === 'failed').length;

    const pendingHeaderGrid: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '64px 1fr 160px 160px 130px 200px',
        alignItems: 'center',
        borderLeft: '3px solid transparent',
        borderBottom: `1px solid ${C.neutral60}`,
        background: C.neutral30,
        minHeight: 36, paddingLeft: 17, paddingRight: 16,
    };

    const publishedHeaderGrid: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '64px 1fr 160px 160px 160px 200px',
        alignItems: 'center',
        borderBottom: `1px solid ${C.neutral60}`,
        background: C.neutral30,
        minHeight: 36, paddingLeft: 20, paddingRight: 16,
    };

    const allDraftAndPending = [...pending, ...drafts].sort((a, b) => b.version - a.version);

    return (
        <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 28, overflowY: 'auto' }}>

            {/* ── Drafts & pending publications ──────────────────────────────── */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                    <h2 style={{ margin: 0, fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.neutral240 }}>
                        Drafts &amp; pending publications
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {countPublishing > 0 && <StatChip count={countPublishing} label="publishing" color={C.primary80} bg={C.primary10} border={C.primary30} dot="publishing" />}
                        {countQueued     > 0 && <StatChip count={countQueued}     label="queued"     color={C.neutral190} bg={C.neutral40} border={C.neutral70} dot="queued" />}
                        {countFailed     > 0 && <StatChip count={countFailed}     label="failed"     color={C.error80} bg={C.error10} border={C.error30} dot="failed" />}
                        {countPublishing === 0 && countQueued === 0 && countFailed === 0 && (
                            <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>View refreshes when a publication completes</span>
                        )}
                    </div>
                </div>

                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                    {/* Header */}
                    <div style={pendingHeaderGrid}>
                        <ColHeader>Version</ColHeader>
                        <ColHeader>Language</ColHeader>
                        <ColHeader>Status</ColHeader>
                        <ColHeader>Triggered by</ColHeader>
                        <ColHeader>Triggered at</ColHeader>
                        <div />
                    </div>

                    {allDraftAndPending.length === 0 ? (
                        <div style={{ padding: '24px 20px', fontFamily: FONT, fontSize: 13, color: C.neutral150, textAlign: 'center' }}>
                            No open drafts or pending publications.
                        </div>
                    ) : (
                        allDraftAndPending.map(entry => (
                            <PendingTableRow
                                key={entry.id}
                                entry={entry}
                                onCancel={() => handleCancel(entry.id)}
                                onRetry={() => handleRetry(entry.id)}
                                onPublish={() => handlePublish(entry.id)}
                            />
                        ))
                    )}
                </div>
            </section>

            {/* ── Published version ──────────────────────────────────────────── */}
            <section>
                <h2 style={{ margin: '0 0 12px', fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.neutral240 }}>
                    Published version
                </h2>
                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                    <div style={publishedHeaderGrid}>
                        <ColHeader>Version</ColHeader>
                        <ColHeader>Language</ColHeader>
                        <div />
                        <ColHeader>Contributor</ColHeader>
                        <ColHeader>Published at</ColHeader>
                        <div />
                    </div>
                    <PublishedRow entry={published} />
                </div>
            </section>

            {/* ── Archived versions ──────────────────────────────────────────── */}
            <section>
                <h2 style={{ margin: '0 0 12px', fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.neutral240 }}>
                    Archived versions
                </h2>
                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                    <div style={publishedHeaderGrid}>
                        <ColHeader>Version</ColHeader>
                        <ColHeader>Language</ColHeader>
                        <div />
                        <ColHeader>Contributor</ColHeader>
                        <ColHeader>Date</ColHeader>
                        <div />
                    </div>
                    {archived.map(entry => (
                        <div key={entry.id} style={{ borderTop: `1px solid ${C.neutral60}` }}>
                            <PublishedRow entry={entry} />
                        </div>
                    ))}
                </div>
                {archived.length > 3 && (
                    <div style={{ marginTop: 8, fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>
                        Showing 3 of {archived.length} archived versions.
                    </div>
                )}
            </section>

            <div style={{ padding: '10px 14px', background: C.neutral30, border: `1px solid ${C.neutral60}`, borderRadius: 6 }}>
                <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>
                    <strong style={{ color: C.neutral190 }}>Note:</strong> Failed publications stay in "Pending" — opening the draft lets you fix the underlying issue and publish again. The previously live version remains accessible throughout.
                </span>
            </div>
        </div>
    );
};

// ─── Content item shell ───────────────────────────────────────────────────────

const CONTENT_TABS = ['Fields', 'View', 'Sub-items', 'Translations', 'Versions', 'Locations', 'URL', 'Relations', 'Authors'];

interface ContentShellProps {
    tabDot: TabDot;
    onTabDotChange: (dot: TabDot) => void;
    onToast: (toast: Omit<ToastItem, 'id'>) => void;
}

const ContentShell = ({ tabDot, onTabDotChange, onToast }: ContentShellProps) => {
    const [activeTab, setActiveTab] = useState('Versions');
    const isPublishing = tabDot === 'publishing';

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.neutral30 }}>
            {/* Breadcrumb */}
            <div style={{ padding: '8px 32px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 13, color: C.neutral170, borderBottom: `1px solid ${C.neutral60}`, background: C.neutral10, flexShrink: 0 }}>
                <span style={{ cursor: 'pointer', color: C.primary80 }}>Content</span>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral100, fill: C.neutral100 }}><Icon name="arrow-caret-down" size={IconSize.Tiny} /></span>
                <span style={{ cursor: 'pointer', color: C.primary80 }}>Blog</span>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral100, fill: C.neutral100 }}><Icon name="arrow-caret-down" size={IconSize.Tiny} /></span>
                <span style={{ color: C.neutral240, fontWeight: 500 }}>Getting Started with Ibexa DXP</span>
            </div>

            {/* Content item header */}
            <div style={{ background: C.neutral10, flexShrink: 0 }}>
                <div style={{ padding: '14px 32px 0' }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ color: C.neutral150, fill: C.neutral150 }}>
                                <Icon name="edit-draft" size={IconSize.SmallMedium} />
                            </div>
                            <h1 style={{ margin: 0, fontFamily: FONT, fontSize: 20, fontWeight: 700, color: C.neutral240 }}>
                                Getting Started with Ibexa DXP
                            </h1>
                        </div>
                        {/* Header action buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                            <Button type={ButtonType.Primary} size={ButtonSize.Small} icon="add" onClick={() => undefined}>
                                Create content
                            </Button>
                            <button style={{ background: 'none', border: `1px solid ${C.neutral70}`, borderRadius: 6, cursor: 'pointer', padding: '5px 10px', fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>Preview</button>
                            <button
                                style={{ background: 'none', border: `1px solid ${C.neutral70}`, borderRadius: 6, cursor: isPublishing ? 'not-allowed' : 'pointer', padding: '5px 10px', fontFamily: FONT, fontSize: 13, color: isPublishing ? C.neutral150 : C.neutral190, opacity: isPublishing ? 0.5 : 1 }}
                                title={isPublishing ? 'Editing disabled while publishing is in progress' : undefined}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                    {/* Meta row: content type + publication chip */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <Tag type={TagType.Neutral} size={TagSize.Small}>Blog post</Tag>
                        {tabDot === 'idle'
                            ? <Tag type={TagType.Success} size={TagSize.Small}>Published</Tag>
                            : <PubChip status={tabDot} />}
                    </div>
                </div>

                {/* Tab bar */}
                <div style={{ display: 'flex', paddingLeft: 32, borderBottom: `1px solid ${C.neutral60}`, marginTop: 8 }}>
                    {CONTENT_TABS.map(tab => {
                        const isActive = activeTab === tab;
                        const isVersionsTab = tab === 'Versions';
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '10px 14px',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontFamily: FONT, fontSize: 13,
                                    color: isActive ? C.primary80 : C.neutral190,
                                    fontWeight: isActive ? 600 : 400,
                                    borderBottom: isActive ? `2px solid ${C.primary80}` : '2px solid transparent',
                                    marginBottom: -1,
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.12s',
                                }}
                            >
                                {tab}
                                {isVersionsTab && tabDot !== 'idle' && (
                                    <StatusDot status={tabDot} size={7} />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {activeTab === 'Versions' ? (
                    <VersionsTab onTabDotChange={onTabDotChange} onToast={onToast} />
                ) : (
                    <div style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200, color: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
                        {activeTab} tab
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Root mockup ──────────────────────────────────────────────────────────────

const AsyncPublishingMockup = () => {
    const [tabDot, setTabDot]     = useState<TabDot>('publishing');
    const [toasts, setToasts]     = useState<ToastItem[]>([]);
    const toastTimers             = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    const addToast = (t: Omit<ToastItem, 'id'>) => {
        const id = toastId();
        setToasts(prev => [...prev, { ...t, id }]);
        toastTimers.current[id] = setTimeout(() => dismissToast(id), 5000);
    };

    const dismissToast = (id: string) => {
        clearTimeout(toastTimers.current[id]);
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: FONT, overflow: 'hidden' }}>
            <style>{ANIM_CSS}</style>
            <LeftNav />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <TopBar />
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    <ContentTreeSidebar activeDot={tabDot} />
                    <ContentShell
                        tabDot={tabDot}
                        onTabDotChange={setTabDot}
                        onToast={addToast}
                    />
                </div>
            </div>

            {/* Toast stack — bottom right */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {toasts.map(t => (
                    <Toast key={t.id} toast={t} onDismiss={() => dismissToast(t.id)} />
                ))}
            </div>
        </div>
    );
};

// ─── Admin publish queue story ────────────────────────────────────────────────

type QueueStatus = 'running' | 'queued' | 'failed';

interface QueueJob {
    id: string;
    status: QueueStatus;
    contentName: string;
    contentPath: string;
    version: number;
    lang: string;
    triggeredBy: string;
    triggeredAt: string;
    queuePosition?: number;
}

const INITIAL_QUEUE: QueueJob[] = [
    { id: 'j1', status: 'running',  contentName: 'Getting Started with Ibexa DXP', contentPath: '/Blog',                version: 4,  lang: 'en-GB', triggeredBy: 'Amy Williams', triggeredAt: '14:21:09' },
    { id: 'j2', status: 'running',  contentName: 'Ibexa DXP',                       contentPath: '/Products',            version: 7,  lang: 'en-GB', triggeredBy: 'Erik Holm',    triggeredAt: '14:20:55' },
    { id: 'j3', status: 'queued',   contentName: 'Getting Started with Ibexa DXP', contentPath: '/Blog',                version: 5,  lang: 'de-DE', triggeredBy: 'Lukas Bauer',  triggeredAt: '14:22:04', queuePosition: 1 },
    { id: 'j4', status: 'queued',   contentName: 'Northwind Products',              contentPath: '/Products/Northwind',  version: 12, lang: 'en-US', triggeredBy: 'Marta Garcia', triggeredAt: '14:22:31', queuePosition: 2 },
    { id: 'j5', status: 'failed',   contentName: 'Acme Press Newsroom',             contentPath: '/Blog/Press',          version: 14, lang: 'en-GB', triggeredBy: 'Sara Patel',   triggeredAt: '14:09:11' },
];

const QueueStatusChip = ({ status }: { status: QueueStatus }) => {
    if (status === 'running') return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 6, background: C.primary10, border: `1px solid ${C.primary30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.primary80 }}>
            <Spinner color={C.primary80} size={9} />
            <span>Publishing<AnimatedEllipsis /></span>
        </div>
    );
    if (status === 'queued') return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 6, background: C.neutral40, border: `1px solid ${C.neutral70}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.neutral190 }}>
            <StatusDot status="queued" size={6} />
            <span>Queued</span>
        </div>
    );
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 6, background: C.error10, border: `1px solid ${C.error30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.error80 }}>
            <StatusDot status="failed" size={6} />
            <span>Publish failed</span>
        </div>
    );
};

type QueueFilter = 'all' | 'running' | 'queued' | 'failed';

const PublishQueueAdmin = () => {
    const [jobs, setJobs]       = useState<QueueJob[]>(INITIAL_QUEUE);
    const [filter, setFilter]   = useState<QueueFilter>('all');
    const [toasts, setToasts]   = useState<ToastItem[]>([]);
    const toastTimers           = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    const addToast = (t: Omit<ToastItem, 'id'>) => {
        const id = toastId();
        setToasts(prev => [...prev, { ...t, id }]);
        toastTimers.current[id] = setTimeout(() => setToasts(prev => prev.filter(x => x.id !== id)), 4000);
    };

    const cancelJob = (id: string) => {
        setJobs(prev => {
            const removed = prev.filter(j => j.id !== id);
            let q = 1;
            return removed.map(j => j.status === 'queued' ? { ...j, queuePosition: q++ } : j);
        });
        addToast({ type: 'success', title: 'Job cancelled', subtitle: 'The queued publication was removed.' });
    };

    const running = jobs.filter(j => j.status === 'running').length;
    const queued  = jobs.filter(j => j.status === 'queued').length;
    const failed  = jobs.filter(j => j.status === 'failed').length;

    const visible = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);

    const FilterBtn = ({ f, label }: { f: QueueFilter; label: string }) => (
        <button
            onClick={() => setFilter(f)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 20, border: `1px solid ${filter === f ? C.primary30 : C.neutral70}`, background: filter === f ? C.primary20 : 'transparent', fontFamily: FONT, fontSize: 12, fontWeight: filter === f ? 600 : 400, color: filter === f ? C.primary80 : C.neutral190, cursor: 'pointer' }}
        >
            {f === 'running' && <Spinner color={filter === f ? C.primary80 : C.neutral190} size={8} />}
            {f === 'queued'  && <StatusDot status="queued" size={6} />}
            {f === 'failed'  && <StatusDot status="failed" size={6} />}
            {label}
        </button>
    );

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: FONT, background: C.neutral20, overflow: 'hidden' }}>
            <style>{ANIM_CSS}</style>
            <LeftNav />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <TopBar />
                <main style={{ flex: 1, overflow: 'auto', padding: 24 }}>
                    {/* Page header */}
                    <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: '14px 20px', marginBottom: 20, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', boxShadow: SHADOW.extraSmall }}>
                        <div>
                            <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                                Settings → System → Background publishing
                            </div>
                            <h1 style={{ margin: '0 0 4px', fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.neutral240 }}>Background publishing</h1>
                            <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>
                                Symfony Messenger · transport <code style={{ background: C.neutral40, padding: '1px 5px', borderRadius: 4 }}>async_pub1sh</code> · 2 workers · last drained 23s ago
                            </div>
                        </div>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: 'none', border: `1px solid ${C.neutral70}`, borderRadius: 6, cursor: 'pointer', fontFamily: FONT, fontSize: 13, color: C.neutral190, fill: C.neutral190 }}>
                            <Icon name="arrows-reload" size={IconSize.Small} />
                            Refresh
                        </button>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
                        {[
                            { label: 'In progress (24h)', value: running.toString(), sub: `${running} running`,     highlight: false },
                            { label: 'Queued (24h)',      value: queued.toString(),  sub: `${queued} in queue`,    highlight: false },
                            { label: 'Failed (24h)',      value: failed.toString(),  sub: 'need attention',        highlight: failed > 0 },
                            { label: 'Median publish time', value: '11.4s',          sub: 'last 24 hours',         highlight: false },
                        ].map(stat => (
                            <div key={stat.label} style={{ background: C.neutral10, border: `1px solid ${stat.highlight ? C.error30 : C.neutral60}`, borderRadius: 8, padding: '14px 16px', boxShadow: SHADOW.extraSmall }}>
                                <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{stat.label}</div>
                                <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: stat.highlight ? C.error80 : C.neutral240, lineHeight: 1 }}>{stat.value}</div>
                                <div style={{ fontFamily: FONT, fontSize: 12, color: stat.highlight ? C.error90 : C.neutral150, marginTop: 4 }}>{stat.sub}</div>
                            </div>
                        ))}
                    </div>

                    {/* Jobs table */}
                    <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                        <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.neutral170, marginRight: 4 }}>Filter:</span>
                            <FilterBtn f="all"     label={`All · ${jobs.length}`} />
                            <FilterBtn f="running" label={`Running · ${running}`} />
                            <FilterBtn f="queued"  label={`Queued · ${queued}`} />
                            <FilterBtn f="failed"  label={`Failed · ${failed}`} />
                            <span style={{ marginLeft: 'auto', fontFamily: FONT, fontSize: 11, color: C.neutral150 }}>Auto-refresh every 5s</span>
                        </div>

                        {/* Table header */}
                        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 72px 72px 160px 120px 120px 120px', alignItems: 'center', padding: '0 16px', height: 36, borderBottom: `1px solid ${C.neutral60}`, background: C.neutral30 }}>
                            {['Status', 'Content', 'Version', 'Lang', 'Triggered by', 'Triggered at', 'Queue pos.', ''].map((col, i) => (
                                <div key={i} style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral170, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{col}</div>
                            ))}
                        </div>

                        {visible.map((job, idx) => (
                            <div
                                key={job.id}
                                style={{ display: 'grid', gridTemplateColumns: '160px 1fr 72px 72px 160px 120px 120px 120px', alignItems: 'center', padding: '10px 16px', borderBottom: idx < visible.length - 1 ? `1px solid ${C.neutral60}` : 'none', background: job.status === 'failed' ? C.error10 : C.neutral10 }}
                            >
                                <div><QueueStatusChip status={job.status} /></div>
                                <div>
                                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.primary80, cursor: 'pointer' }}>{job.contentName}</div>
                                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150 }}>{job.contentPath}</div>
                                </div>
                                <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>{job.version}</div>
                                <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190, background: C.neutral40, border: `1px solid ${C.neutral70}`, borderRadius: 4, padding: '1px 6px', display: 'inline-block' }}>{job.lang}</div>
                                <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>{job.triggeredBy}</div>
                                <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, fontVariantNumeric: 'tabular-nums' }}>{job.triggeredAt}</div>
                                <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral150 }}>
                                    {job.queuePosition !== undefined ? `#${job.queuePosition}` : '–'}
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <button style={{ fontFamily: FONT, fontSize: 12, color: C.primary80, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Open</button>
                                    {job.status === 'queued' && (
                                        <button onClick={() => cancelJob(job.id)} style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Cancel</button>
                                    )}
                                    {job.status === 'failed' && (
                                        <button style={{ fontFamily: FONT, fontSize: 12, color: C.primary80, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>Open draft</button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div style={{ padding: '10px 16px', borderTop: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.neutral30 }}>
                            <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>Showing {visible.length} of {jobs.length} active jobs</span>
                            <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>Queue is FIFO; cancelling a queued job lets the next one proceed.</span>
                        </div>
                    </div>
                </main>
            </div>

            {/* Toast stack */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {toasts.map(t => (
                    <Toast key={t.id} toast={t} onDismiss={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
                ))}
            </div>
        </div>
    );
};

// ─── Storybook ────────────────────────────────────────────────────────────────

const meta: Meta<typeof AsyncPublishingMockup> = {
    component: AsyncPublishingMockup,
    title: 'Mockups/Async Publishing',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof AsyncPublishingMockup>;

export const Default: Story = {
    name: 'Content item — Versions tab',
};

export const AdminQueue: Story = {
    name: 'Admin — Publish queue',
    render: () => <PublishQueueAdmin />,
};