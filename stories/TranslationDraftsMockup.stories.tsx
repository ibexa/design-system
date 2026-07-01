import React, { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Tag, TagGhostType, TagType, TagSize } from '@ids-components/Tag';
import { Icon, IconSize } from '@ids-components/Icon';
import { CheckboxField } from '@ids-components/Checkbox';

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

const FONT = "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const SHADOW = {
    extraSmall: '0 0 12px 0 oklch(0.1798 0.0104 248.41 / 0.08)',
};

// ─── Types ────────────────────────────────────────────────────────────────────

type TranslationStatus = 'awaiting-review' | 'failed' | 'in-progress';

interface DraftRow {
    id: string;
    version: number;
    language: string;
    contributor: string;
    contributorInitials: string;
    created: string;
    lastSaved: string;
    isAutoTranslated: boolean;
    translationStatus?: TranslationStatus;
    jobRef?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_DRAFTS: DraftRow[] = [
    {
        id: 'd1',
        version: 9,
        language: 'English (United Kingdom)',
        contributor: 'Konrad Oboza',
        contributorInitials: 'KO',
        created: 'Jun 9, 2026 11:07',
        lastSaved: 'Jun 9, 2026 14:22',
        isAutoTranslated: false,
    },
    {
        id: 'd2',
        version: 8,
        language: 'French (France)',
        contributor: 'Translation Agent',
        contributorInitials: 'TA',
        created: 'Jun 9, 2026 10:15',
        lastSaved: 'Jun 9, 2026 10:15',
        isAutoTranslated: true,
        translationStatus: 'awaiting-review',
        jobRef: 'MKT-156',
    },
    {
        id: 'd3',
        version: 7,
        language: 'German (Germany)',
        contributor: 'Translation Agent',
        contributorInitials: 'TA',
        created: 'Jun 9, 2026 10:15',
        lastSaved: 'Jun 9, 2026 10:15',
        isAutoTranslated: true,
        translationStatus: 'failed',
        jobRef: 'MKT-156',
    },
    {
        id: 'd4',
        version: 6,
        language: 'Spanish (Spain)',
        contributor: 'Translation Agent',
        contributorInitials: 'TA',
        created: 'Jun 8, 2026 09:00',
        lastSaved: 'Jun 8, 2026 09:00',
        isAutoTranslated: true,
        translationStatus: 'awaiting-review',
        jobRef: 'MKT-155',
    },
    {
        id: 'd5',
        version: 5,
        language: 'Japanese (Japan)',
        contributor: 'Translation Agent',
        contributorInitials: 'TA',
        created: 'Jun 9, 2026 14:30',
        lastSaved: 'Jun 9, 2026 14:30',
        isAutoTranslated: true,
        translationStatus: 'in-progress',
        jobRef: 'MKT-157',
    },
];

const STATUS_LABEL: Record<TranslationStatus, string> = {
    'awaiting-review': 'For review',
    'failed':          'Failed',
    'in-progress':     'Translating…',
};

// ─── Column layout ─────────────────────────────────────────────────────────────

const COL_CHECKBOX    = 40;
const COL_VERSION     = 72;
const COL_CONTRIBUTOR = 216;
const COL_DATE        = 160;
const COL_ACTIONS     = 140;

// ─── Left navigation ──────────────────────────────────────────────────────────

const NAV_ICONS = [
    'content-tree', 'mountain', 'form-check-list', 'calendar',
    'tags', 'list-content', 'notes-list', 'database-settings',
] as const;

const LeftNav = () => (
    <nav style={{ width: 52, minWidth: 52, background: C.neutral240, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${C.neutral220}`, flexShrink: 0 }}>
            <img src="./cohesivo-logo-gradient.png" alt="Cohesivo" style={{ width: 34, height: 34, objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: 4, flex: 1 }}>
            {NAV_ICONS.map((icon, i) => (
                <button
                    key={icon}
                    title={icon}
                    style={{
                        width: '100%', height: 44, background: i === 0
                            ? 'linear-gradient(90deg, oklch(0.4047 0.1894 289.97) 40%, oklch(0.7328 0.1183 299.96) 100%)'
                            : 'transparent',
                        border: 'none',
                        borderLeft: i === 0 ? `3px solid ${C.primary70}` : '3px solid transparent',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: i === 0 ? C.neutral10 : C.neutral150,
                        fill:  i === 0 ? C.neutral10 : C.neutral150,
                    }}
                >
                    <Icon name={icon} size={IconSize.SmallMedium} />
                </button>
            ))}
        </div>
        <button title="Settings" style={{ width: '100%', height: 44, background: 'transparent', border: 'none', borderLeft: '3px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.neutral150, fill: C.neutral150, marginBottom: 8 }}>
            <Icon name="settings-cog" size={IconSize.SmallMedium} />
        </button>
    </nav>
);

// ─── Top bar ──────────────────────────────────────────────────────────────────

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
            <span style={{ display: 'inline-flex', transform: 'rotate(0deg)' }}>
                <Icon name="arrow-caret-down" size={IconSize.Tiny} />
            </span>
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

// ─── Row border + background helpers ─────────────────────────────────────────

const rowBorderColor = (draft: DraftRow): string => {
    if (!draft.isAutoTranslated) return 'transparent';
    switch (draft.translationStatus) {
        case 'failed':        return C.error80;
        case 'in-progress':   return C.neutral150;
        case 'awaiting-review':
        default:              return C.primary80;
    }
};

const rowBackground = (draft: DraftRow, hovered: boolean): string => {
    if (hovered) return C.neutral30;
    if (draft.isAutoTranslated && draft.translationStatus === 'failed') return C.error10;
    return C.neutral10;
};

// ─── Shared column header ─────────────────────────────────────────────────────

const ColHeader = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.neutral170, ...style }}>
        {children}
    </div>
);

// ─── Agent avatar ─────────────────────────────────────────────────────────────

const AgentAvatar = () => (
    <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: C.primary80,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.neutral10, fill: C.neutral10,
        flexShrink: 0,
    }}>
        <Icon name="arrows-right-and-left" size={IconSize.Small} />
    </div>
);

// ─── Human avatar ─────────────────────────────────────────────────────────────

const HumanAvatar = ({ initials }: { initials: string }) => (
    <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: C.success90,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.neutral10, fontFamily: FONT, fontSize: 11, fontWeight: 600,
        flexShrink: 0,
    }}>
        {initials}
    </div>
);

// ─── Draft row ────────────────────────────────────────────────────────────────

interface DraftRowProps {
    draft: DraftRow;
    checked: boolean;
    onCheck: (checked: boolean) => void;
    onReview: () => void;
    onRetry: () => void;
}

const DraftTableRow = ({ draft, checked, onCheck, onReview, onRetry }: DraftRowProps) => {
    const [hovered, setHovered] = useState(false);
    const isAuto = draft.isAutoTranslated;
    const status = draft.translationStatus;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                // 3px border on all rows (transparent for manual) ensures pixel-perfect column alignment
                borderLeft: `3px solid ${rowBorderColor(draft)}`,
                borderBottom: `1px solid ${C.neutral60}`,
                minHeight: 56,
                paddingLeft: 17, // 20 - 3 to compensate for border
                paddingRight: 20,
                background: rowBackground(draft, hovered),
                transition: 'background 0.12s',
            }}
        >
            {/* Checkbox */}
            <div style={{ width: COL_CHECKBOX, flexShrink: 0 }}>
                <CheckboxField
                    id={`chk-${draft.id}`}
                    name={`chk-${draft.id}`}
                    value={draft.id}
                    checked={checked}
                    onChange={onCheck}
                    label=""
                />
            </div>

            {/* Version */}
            <div style={{ width: COL_VERSION, flexShrink: 0, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>
                {draft.version}
            </div>

            {/* Language + inline status tag — the status lives here, not in a new column */}
            <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>
                    {draft.language}
                </span>
                {isAuto && status && (
                    <Tag
                        type={status === 'failed' ? TagGhostType.ErrorGhost : TagGhostType.NeutralGhost}
                        size={TagSize.Small}
                    >
                        {STATUS_LABEL[status]}
                    </Tag>
                )}
            </div>

            {/* Contributor — agent identity replaces human name for auto-translated rows */}
            <div style={{ width: COL_CONTRIBUTOR, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                {isAuto ? (
                    <>
                        <AgentAvatar />
                        <div>
                            <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240, fontWeight: 500, lineHeight: 1.3 }}>
                                Translation Agent
                            </div>
                            {draft.jobRef && (
                                <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, lineHeight: 1.3 }}>
                                    {draft.jobRef}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <HumanAvatar initials={draft.contributorInitials} />
                        <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>
                            {draft.contributor}
                        </span>
                    </>
                )}
            </div>

            {/* Created */}
            <div style={{ width: COL_DATE, flexShrink: 0, fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                {draft.created}
            </div>

            {/* Last saved */}
            <div style={{ width: COL_DATE, flexShrink: 0, fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                {draft.lastSaved}
            </div>

            {/* Actions — standard icons + context-appropriate CTA for auto-translated rows */}
            <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                <button
                    title="Compare versions"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.neutral100, fill: C.neutral100, display: 'flex', alignItems: 'center', borderRadius: 4 }}
                >
                    <Icon name="form-check-list" size={IconSize.SmallMedium} />
                </button>
                <button
                    title="Edit draft"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.neutral150, fill: C.neutral150, display: 'flex', alignItems: 'center', borderRadius: 4 }}
                >
                    <Icon name="edit-draft" size={IconSize.SmallMedium} />
                </button>

                {isAuto && status === 'awaiting-review' && (
                    <Button type={ButtonType.Primary} size={ButtonSize.Small} onClick={onReview}>
                        Review
                    </Button>
                )}
                {isAuto && status === 'failed' && (
                    <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} onClick={onRetry}>
                        Retry
                    </Button>
                )}
                {isAuto && status === 'in-progress' && (
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150, fontStyle: 'italic', paddingRight: 4 }}>
                        Running…
                    </span>
                )}
            </div>
        </div>
    );
};

// ─── Versions tab ─────────────────────────────────────────────────────────────

const VersionsTab = () => {
    const [drafts, setDrafts] = useState<DraftRow[]>(INITIAL_DRAFTS);
    const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
    const [retryTimers, setRetryTimers] = useState<Record<string, ReturnType<typeof setTimeout>>>({});

    useEffect(() => {
        return () => { Object.values(retryTimers).forEach(clearTimeout); };
    }, [retryTimers]);

    const toggleCheck = (id: string, checked: boolean) => {
        setCheckedIds(prev => {
            const next = new Set(prev);
            checked ? next.add(id) : next.delete(id);
            return next;
        });
    };

    const toggleAll = (checked: boolean) => {
        setCheckedIds(checked ? new Set(drafts.map(d => d.id)) : new Set());
    };

    const handleRetry = (id: string) => {
        setDrafts(prev => prev.map(d => d.id === id ? { ...d, translationStatus: 'in-progress' as TranslationStatus } : d));
        const t = setTimeout(() => {
            setDrafts(prev => prev.map(d => d.id === id ? { ...d, translationStatus: 'awaiting-review' as TranslationStatus } : d));
        }, 2000);
        setRetryTimers(prev => ({ ...prev, [id]: t }));
    };

    const handleReview = (id: string) => {
        // In real usage this navigates to the draft editor; here we simulate clearing the status
        setDrafts(prev => prev.map(d =>
            d.id === id
                ? { ...d, isAutoTranslated: false, translationStatus: undefined, contributor: 'Konrad Oboza', contributorInitials: 'KO' }
                : d
        ));
    };

    const allChecked = drafts.length > 0 && drafts.every(d => checkedIds.has(d.id));

    const headerRowStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        borderLeft: '3px solid transparent', // aligns with data rows
        borderBottom: `1px solid ${C.neutral60}`,
        background: C.neutral30,
        minHeight: 36,
        paddingLeft: 17,
        paddingRight: 20,
    };

    return (
        <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 32, overflowY: 'auto' }}>

            {/* ── Open drafts ────────────────────────────────────────────────── */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <h2 style={{ margin: 0, fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.neutral240 }}>
                        Open drafts
                    </h2>
                    <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="trash" onClick={() => undefined} ariaLabel="Delete selected drafts" />
                </div>

                {/* Collaboration warning */}
                <div style={{ marginBottom: 16, padding: '10px 14px', background: C.warning10, border: `1px solid ${C.warning30}`, borderLeft: `3px solid ${C.warning100}`, borderRadius: 6, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ color: C.warning100, fill: C.warning100, flexShrink: 0, marginTop: 1 }}>
                        <Icon name="alert-error" size={IconSize.Small} />
                    </div>
                    <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240, lineHeight: 1.5 }}>
                        Some drafts on the list might be disabled for editing due to an active real-time collaboration session. Only session participants can edit them.
                    </span>
                </div>

                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                    {/* Table header */}
                    <div style={headerRowStyle}>
                        <div style={{ width: COL_CHECKBOX, flexShrink: 0 }}>
                            <CheckboxField id="chk-all" name="chk-all" value="all" checked={allChecked} onChange={toggleAll} label="" />
                        </div>
                        <ColHeader style={{ width: COL_VERSION, flexShrink: 0 }}>Version</ColHeader>
                        <ColHeader style={{ flex: 1, minWidth: 200 }}>Modified language</ColHeader>
                        <ColHeader style={{ width: COL_CONTRIBUTOR, flexShrink: 0 }}>Contributor</ColHeader>
                        <ColHeader style={{ width: COL_DATE, flexShrink: 0 }}>Created</ColHeader>
                        <ColHeader style={{ width: COL_DATE, flexShrink: 0 }}>Last saved</ColHeader>
                        <div style={{ width: COL_ACTIONS, flexShrink: 0 }} />
                    </div>

                    {drafts.map(draft => (
                        <DraftTableRow
                            key={draft.id}
                            draft={draft}
                            checked={checkedIds.has(draft.id)}
                            onCheck={(c) => toggleCheck(draft.id, c)}
                            onReview={() => handleReview(draft.id)}
                            onRetry={() => handleRetry(draft.id)}
                        />
                    ))}
                </div>
            </section>

            {/* ── Published version ──────────────────────────────────────────── */}
            <section>
                <h2 style={{ margin: '0 0 12px', fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.neutral240 }}>
                    Published version
                </h2>
                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                    {/* Table header — no checkbox column here */}
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.neutral60}`, background: C.neutral30, minHeight: 36, paddingLeft: 20, paddingRight: 20 }}>
                        <ColHeader style={{ width: COL_VERSION, flexShrink: 0 }}>Version</ColHeader>
                        <ColHeader style={{ flex: 1, minWidth: 200 }}>Modified language</ColHeader>
                        <ColHeader style={{ width: COL_CONTRIBUTOR, flexShrink: 0 }}>Contributor</ColHeader>
                        <ColHeader style={{ width: COL_DATE, flexShrink: 0 }}>Created</ColHeader>
                        <ColHeader style={{ width: COL_DATE, flexShrink: 0 }}>Last saved</ColHeader>
                        <div style={{ width: COL_ACTIONS, flexShrink: 0 }} />
                    </div>
                    {/* Published row — no left border, no auto-translation indicators */}
                    <div style={{ display: 'flex', alignItems: 'center', minHeight: 56, paddingLeft: 20, paddingRight: 20, background: C.neutral10 }}>
                        <div style={{ width: COL_VERSION, flexShrink: 0, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>12</div>
                        <div style={{ flex: 1, minWidth: 200, fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>English (United Kingdom)</div>
                        <div style={{ width: COL_CONTRIBUTOR, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <HumanAvatar initials="KO" />
                            <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>Konrad Oboza</span>
                        </div>
                        <div style={{ width: COL_DATE, flexShrink: 0, fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>Jun 2, 2026 12:56</div>
                        <div style={{ width: COL_DATE, flexShrink: 0, fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>Jun 2, 2026 12:56</div>
                        <div style={{ width: COL_ACTIONS, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.neutral100, fill: C.neutral100, display: 'flex', alignItems: 'center', borderRadius: 4 }}>
                                <Icon name="form-check-list" size={IconSize.SmallMedium} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// ─── Content item shell ───────────────────────────────────────────────────────

const CONTENT_TABS = ['Fields', 'View', 'Sub-items', 'Translations', 'Versions', 'Locations', 'URL', 'Relations', 'Authors'];

const ContentShell = () => {
    const [activeTab, setActiveTab] = useState('Versions');

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.neutral30 }}>
            {/* Breadcrumb */}
            <div style={{ padding: '8px 32px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 13, color: C.neutral170, borderBottom: `1px solid ${C.neutral60}`, background: C.neutral10, flexShrink: 0 }}>
                <span style={{ cursor: 'pointer', color: C.primary80 }}>Content</span>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral100, fill: C.neutral100 }}>
                    <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                </span>
                <span style={{ cursor: 'pointer', color: C.primary80 }}>Blog</span>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral100, fill: C.neutral100 }}>
                    <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                </span>
                <span style={{ color: C.neutral240, fontWeight: 500 }}>Getting Started with Ibexa DXP</span>
            </div>

            {/* Content item header + tabs */}
            <div style={{ background: C.neutral10, flexShrink: 0 }}>
                <div style={{ padding: '16px 32px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{ color: C.neutral150, fill: C.neutral150 }}>
                            <Icon name="edit-draft" size={IconSize.SmallMedium} />
                        </div>
                        <h1 style={{ margin: 0, fontFamily: FONT, fontSize: 20, fontWeight: 700, color: C.neutral240 }}>
                            Getting Started with Ibexa DXP
                        </h1>
                        <Tag type={TagType.Success} size={TagSize.Small}>Published</Tag>
                    </div>
                </div>
                <div style={{ display: 'flex', paddingLeft: 32, borderBottom: `1px solid ${C.neutral60}` }}>
                    {CONTENT_TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '10px 14px',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: FONT, fontSize: 13,
                                color: activeTab === tab ? C.primary80 : C.neutral190,
                                fontWeight: activeTab === tab ? 600 : 400,
                                borderBottom: activeTab === tab ? `2px solid ${C.primary80}` : '2px solid transparent',
                                marginBottom: -1,
                                whiteSpace: 'nowrap',
                                transition: 'color 0.12s',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {activeTab === 'Versions' ? (
                    <VersionsTab />
                ) : (
                    <div style={{ padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200, color: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
                        {activeTab} tab
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Full mockup ──────────────────────────────────────────────────────────────

const TranslationDraftsMockup = () => (
    <div style={{ display: 'flex', height: '100vh', fontFamily: FONT, overflow: 'hidden' }}>
        <LeftNav />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <TopBar />
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* Secondary sidebar (simplified) */}
                <div style={{ width: 180, flexShrink: 0, background: C.neutral20, borderRight: `1px solid ${C.neutral60}`, padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
                    {['Content structure', 'Media', 'Trash'].map((item, i) => (
                        <button key={item} style={{ padding: '8px 16px', background: i === 0 ? C.primary20 : 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: FONT, fontSize: 13, color: i === 0 ? C.primary80 : C.neutral190, fontWeight: i === 0 ? 600 : 400 }}>
                            {item}
                        </button>
                    ))}
                </div>
                <ContentShell />
            </div>
        </div>
    </div>
);

// ─── Storybook ────────────────────────────────────────────────────────────────

const meta: Meta<typeof TranslationDraftsMockup> = {
    component: TranslationDraftsMockup,
    title: 'Mockups/Translation Drafts',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof TranslationDraftsMockup>;

export const Default: Story = {
    name: 'Versions tab — auto-translated draft indicators',
};