import React, { useEffect, useRef, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Tag, TagGhostType, TagType, TagSize } from '@ids-components/Tag';
import { Icon, IconSize } from '@ids-components/Icon';

// ─── Design tokens (mirrors AgentsMockup) ────────────────────────────────────

const C = {
    neutral240: 'oklch(0.1798 0.0104 248.41)',
    neutral230: 'oklch(0.2326 0.0098 248.25)',
    neutral220: 'oklch(0.2822 0.0079 240.13)',
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
};

const SHADOW = {
    large:      '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.15)',
    medium:     '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.12)',
    extraSmall: '0 0 12px 0 oklch(0.1798 0.0104 248.41 / 0.08)',
};

const FONT = "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

// ─── Types ───────────────────────────────────────────────────────────────────

type MatchMode = 'all' | 'any';
type ContentItemType = 'article' | 'landing-page' | 'blog-post';

interface Segment {
    id: string;
    name: string;
    description?: string;
}

interface ContentItem {
    id: string;
    name: string;
    type: ContentItemType;
    typeLabel: string;
    path: string;
}

interface PersonalizationRule {
    id: string;
    matchMode: MatchMode;
    segmentIds: string[];
    contentId: string | null;
}

// ─── Lookups ─────────────────────────────────────────────────────────────────

const CONTENT_TYPE_TAG: Record<ContentItemType, TagType> = {
    article:        TagType.Info,
    'landing-page': TagType.Primary,
    'blog-post':    TagType.PrimaryAlt,
};

const CONTENT_ICON: Record<ContentItemType, string> = {
    article:        'edit-draft',
    'landing-page': 'notes-list',
    'blog-post':    'edit-draft',
};

// ─── Mock data ───────────────────────────────────────────────────────────────

const SEGMENTS: Segment[] = [
    { id: 'mon-aud-1',  name: 'mon audience 1',         description: 'French-speaking visitors' },
    { id: 'mon-aud-2',  name: 'mon audience 2',         description: 'Returning visitors, FR' },
    { id: 'mkol-1',     name: 'MKolankowski - test 1',  description: 'Internal QA segment' },
    { id: 'mkol-4',     name: 'MKolankowski - test 4',  description: 'Internal QA segment' },
    { id: 'vip',        name: 'VIP customers',          description: 'LTV > €5,000' },
    { id: 'eu-de',      name: 'EU – Germany',           description: 'Geo-IP: DE' },
    { id: 'eu-fr',      name: 'EU – France',            description: 'Geo-IP: FR' },
    { id: 'eu-at',      name: 'EU – Austria',           description: 'Geo-IP: AT' },
    { id: 'first-time', name: 'First-time visitors',    description: 'No previous sessions' },
    { id: 'mobile',     name: 'Mobile users',           description: 'Device: mobile or tablet' },
];

const CONTENT_ITEMS: ContentItem[] = [
    { id: 'art-1',  name: 'test_article_1',                 type: 'article',      typeLabel: 'Article',      path: '/Blog' },
    { id: 'art-2',  name: 'test_article_2',                 type: 'article',      typeLabel: 'Article',      path: '/Blog' },
    { id: 'art-3',  name: 'Ibexa DXP – Welcome guide',      type: 'article',      typeLabel: 'Article',      path: '/Blog' },
    { id: 'art-4',  name: 'Ibexa Discover – change',        type: 'article',      typeLabel: 'Article',      path: '/Products' },
    { id: 'art-5',  name: 'Ibexa Discover – article_1',     type: 'article',      typeLabel: 'Article',      path: '/Products' },
    { id: 'lp-1',   name: 'Enterprise hero',                type: 'landing-page', typeLabel: 'Landing page', path: '/Landing pages' },
    { id: 'lp-2',   name: 'SMB hero',                       type: 'landing-page', typeLabel: 'Landing page', path: '/Landing pages' },
    { id: 'bp-1',   name: 'What\'s new in v2.0',            type: 'blog-post',    typeLabel: 'Blog post',    path: '/Blog' },
];

const INITIAL_RULES: PersonalizationRule[] = [
    { id: 'rule-1', matchMode: 'any', segmentIds: ['mon-aud-2'],            contentId: 'art-4' },
    { id: 'rule-2', matchMode: 'all', segmentIds: ['mkol-4', 'eu-de'],      contentId: 'art-5' },
    { id: 'rule-3', matchMode: 'any', segmentIds: ['eu-fr', 'eu-at'],       contentId: 'lp-1' },
];

const INITIAL_FALLBACK_ID = 'art-2';

// ─── Navigation ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    { icon: 'content-tree',      label: 'Content structure' },
    { icon: 'mountain',          label: 'Media' },
    { icon: 'form-check-list',   label: 'Forms' },
    { icon: 'calendar',          label: 'Calendar' },
    { icon: 'tags',              label: 'Tags' },
    { icon: 'list-content',      label: 'Sections' },
    { icon: 'notes-list',        label: 'Content types' },
    { icon: 'database-settings', label: 'Object states' },
];

const LeftNav = ({ activeItem = 0 }: { activeItem?: number }) => (
    <nav style={{ width: 52, minWidth: 52, background: C.neutral240, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderBottom: `1px solid ${C.neutral220}` }}>
            <img src="./cohesivo-logo-gradient.png" alt="Cohesivo" style={{ width: 34, height: 34, objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: 4, flex: 1 }}>
            {NAV_ITEMS.map((item, i) => (
                <button
                    key={item.icon}
                    title={item.label}
                    style={{
                        width: '100%', height: 44,
                        background: i === activeItem ? 'linear-gradient(90deg, oklch(0.4047 0.1894 289.97) 40%, oklch(0.7328 0.1183 299.96) 100%)' : 'transparent',
                        border: 'none',
                        borderLeft: i === activeItem ? `3px solid ${C.primary70}` : '3px solid transparent',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: i === activeItem ? C.neutral10 : C.neutral150,
                        fill:  i === activeItem ? C.neutral10 : C.neutral150,
                        transition: 'background 0.2s, color 0.2s', padding: 0,
                    }}
                    onMouseEnter={e => { if (i !== activeItem) { (e.currentTarget as HTMLButtonElement).style.background = C.neutral220; (e.currentTarget as HTMLButtonElement).style.color = C.neutral10; } }}
                    onMouseLeave={e => { if (i !== activeItem) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = C.neutral150; } }}
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
    <header style={{ height: 52, background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', paddingLeft: 16, paddingRight: 16, gap: 12, flexShrink: 0, zIndex: 5 }}>
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SectionHeading = ({ icon, title, helperText }: { icon: string; title: string; helperText?: string }) => (
    <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ color: C.primary80, fill: C.primary80 }}>
                <Icon name={icon} size={IconSize.SmallMedium} />
            </div>
            <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: C.neutral240 }}>{title}</div>
        </div>
        {helperText && (
            <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 4, marginLeft: 28 }}>
                {helperText}
            </div>
        )}
    </div>
);

const findContent = (id: string | null) => CONTENT_ITEMS.find(c => c.id === id) ?? null;
const findSegment = (id: string) => SEGMENTS.find(s => s.id === id);

// ─── Notification ────────────────────────────────────────────────────────────

const Notification = ({ message, onDismiss }: { message: string; onDismiss: () => void }) => (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 2000, background: C.neutral10, border: `1px solid ${C.success30}`, borderLeft: `4px solid ${C.success90}`, borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: SHADOW.medium, maxWidth: 360, animation: 'ids-slide-in 0.25s ease' }}>
        <style>{`@keyframes ids-slide-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
        <div style={{ color: C.success90, fill: C.success90, flexShrink: 0 }}>
            <Icon name="check-circle" size={IconSize.SmallMedium} />
        </div>
        <span style={{ fontFamily: FONT, fontSize: 14, color: C.neutral240, flex: 1 }}>{message}</span>
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.neutral150, fill: C.neutral150, display: 'flex', alignItems: 'center' }}>
            <Icon name="remove" size={IconSize.Small} />
        </button>
    </div>
);

// ─── Content picker modal ────────────────────────────────────────────────────

interface ContentPickerModalProps {
    currentId: string | null;
    title: string;
    onCancel: () => void;
    onSelect: (id: string) => void;
}

const ContentPickerModal = ({ currentId, title, onCancel, onSelect }: ContentPickerModalProps) => {
    const [pickedId, setPickedId] = useState<string | null>(currentId);
    const [query, setQuery] = useState('');

    const filtered = CONTENT_ITEMS.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) || c.path.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(19, 28, 38, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(2px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <div style={{ background: C.neutral10, borderRadius: 12, width: 520, maxHeight: '80vh', boxShadow: SHADOW.large, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ color: C.primary80, fill: C.primary80 }}>
                        <Icon name="content-tree" size={IconSize.SmallMedium} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: C.neutral240 }}>{title}</div>
                        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 2 }}>Pick a content item from the library</div>
                    </div>
                    <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.neutral150, fill: C.neutral150, display: 'flex', alignItems: 'center' }}>
                        <Icon name="remove" size={IconSize.Small} />
                    </button>
                </div>

                <div style={{ padding: '12px 20px', borderBottom: `1px solid ${C.neutral60}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, background: C.neutral30, border: `1px solid ${C.neutral70}`, borderRadius: 8, padding: '0 12px', color: C.neutral150, fill: C.neutral150 }}>
                        <Icon name="search" size={IconSize.Small} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Filter by name or location…"
                            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: FONT, fontSize: 14, color: C.neutral240 }}
                        />
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
                    {filtered.length === 0 && (
                        <div style={{ padding: '32px 20px', textAlign: 'center', color: C.neutral150, fontFamily: FONT, fontSize: 13 }}>
                            No content items match your filter.
                        </div>
                    )}
                    {filtered.map(item => {
                        const isPicked = pickedId === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setPickedId(item.id)}
                                style={{
                                    width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px',
                                    background: isPicked ? C.primary10 : 'transparent',
                                    border: 'none', borderLeft: isPicked ? `3px solid ${C.primary80}` : '3px solid transparent',
                                    cursor: 'pointer', textAlign: 'left',
                                }}
                                onMouseEnter={e => { if (!isPicked) (e.currentTarget as HTMLButtonElement).style.background = C.neutral30; }}
                                onMouseLeave={e => { if (!isPicked) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                            >
                                <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${isPicked ? C.primary80 : C.neutral80}`, background: isPicked ? C.primary80 : C.neutral10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {isPicked && <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.neutral10 }} />}
                                </div>
                                <div style={{ color: isPicked ? C.primary80 : C.neutral170, fill: isPicked ? C.primary80 : C.neutral170, flexShrink: 0 }}>
                                    <Icon name={CONTENT_ICON[item.type]} size={IconSize.SmallMedium} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>{item.name}</div>
                                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 1 }}>{item.path}</div>
                                </div>
                                <Tag type={CONTENT_TYPE_TAG[item.type]} size={TagSize.Small}>{item.typeLabel}</Tag>
                            </button>
                        );
                    })}
                </div>

                <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${C.neutral60}` }}>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170 }}>
                        {pickedId ? `Selected: ${findContent(pickedId)?.name}` : 'No item selected'}
                    </span>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button type={ButtonType.SecondaryAlt} onClick={onCancel}>Cancel</Button>
                        <Button
                            type={ButtonType.Primary}
                            icon="check-circle"
                            onClick={() => pickedId && onSelect(pickedId)}
                        >
                            Select content
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Segment add popover ─────────────────────────────────────────────────────

interface SegmentPopoverProps {
    excludeIds: string[];
    onPick: (id: string) => void;
    onClose: () => void;
}

const SegmentPopover = ({ excludeIds, onPick, onClose }: SegmentPopoverProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onClose();
        };
        // Defer to avoid catching the click that opened the popover
        const id = setTimeout(() => document.addEventListener('mousedown', handler), 0);
        return () => { clearTimeout(id); document.removeEventListener('mousedown', handler); };
    }, [onClose]);

    const available = SEGMENTS.filter(s => !excludeIds.includes(s.id) && s.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div
            ref={ref}
            style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 50,
                width: 320, maxHeight: 320, background: C.neutral10,
                border: `1px solid ${C.neutral70}`, borderRadius: 8, boxShadow: SHADOW.medium,
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
        >
            <div style={{ padding: 8, borderBottom: `1px solid ${C.neutral60}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 30, background: C.neutral30, border: `1px solid ${C.neutral70}`, borderRadius: 6, padding: '0 10px', color: C.neutral150, fill: C.neutral150 }}>
                    <Icon name="search" size={IconSize.Tiny} />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find a segment…"
                        style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: FONT, fontSize: 13, color: C.neutral240 }}
                    />
                </div>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, padding: '4px 0' }}>
                {available.length === 0 && (
                    <div style={{ padding: '20px 12px', textAlign: 'center', color: C.neutral150, fontFamily: FONT, fontSize: 12 }}>
                        {SEGMENTS.length === excludeIds.length ? 'All segments are already added' : 'No segments match'}
                    </div>
                )}
                {available.map(seg => (
                    <button
                        key={seg.id}
                        onClick={() => onPick(seg.id)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = C.neutral30}
                        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
                    >
                        <div style={{ color: C.primary80, fill: C.primary80, flexShrink: 0 }}>
                            <Icon name="tags" size={IconSize.Small} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: C.neutral240 }}>{seg.name}</div>
                            {seg.description && (
                                <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, marginTop: 1 }}>{seg.description}</div>
                            )}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// ─── Match mode toggle ───────────────────────────────────────────────────────

const MatchModeToggle = ({ value, onChange, disabled }: { value: MatchMode; onChange: (v: MatchMode) => void; disabled?: boolean }) => (
    <div style={{ display: 'flex', gap: 2, padding: 2, background: C.neutral40, borderRadius: 8, opacity: disabled ? 0.6 : 1, alignSelf: 'flex-start' }}>
        {([['all', 'Match all'], ['any', 'Match any']] as [MatchMode, string][]).map(([key, label]) => (
            <button
                key={key}
                onClick={() => !disabled && onChange(key)}
                disabled={disabled}
                style={{
                    padding: '5px 12px', borderRadius: 6, border: 'none',
                    background: value === key ? C.neutral10 : 'transparent',
                    boxShadow: value === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    color: value === key ? C.neutral240 : C.neutral170,
                    fontFamily: FONT, fontSize: 12, fontWeight: value === key ? 600 : 400,
                    cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
                }}
            >
                {label}
            </button>
        ))}
    </div>
);

// ─── Content slot (compact card showing chosen content) ──────────────────────

interface ContentSlotProps {
    contentId: string | null;
    placeholder: string;
    onChange: () => void;
    onClear?: () => void;
    compact?: boolean;
}

const ContentSlot = ({ contentId, placeholder, onChange, onClear, compact }: ContentSlotProps) => {
    const item = findContent(contentId);

    if (!item) {
        return (
            <button
                onClick={onChange}
                style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: compact ? '8px 12px' : '12px 16px', borderRadius: 8,
                    background: C.neutral20, border: `1px dashed ${C.neutral80}`,
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                    color: C.neutral170, fill: C.neutral170,
                    fontFamily: FONT, fontSize: 13,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.primary80; (e.currentTarget as HTMLButtonElement).style.color = C.primary80; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.neutral80; (e.currentTarget as HTMLButtonElement).style.color = C.neutral170; }}
            >
                <Icon name="add" size={IconSize.Small} />
                {placeholder}
            </button>
        );
    }

    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: compact ? '8px 12px' : '12px 16px',
            background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8,
        }}>
            <div style={{ color: C.primary80, fill: C.primary80, flexShrink: 0 }}>
                <Icon name={CONTENT_ICON[item.type]} size={IconSize.SmallMedium} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                </div>
                {!compact && (
                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, marginTop: 1 }}>{item.path}</div>
                )}
            </div>
            <Tag type={CONTENT_TYPE_TAG[item.type]} size={TagSize.Small}>{item.typeLabel}</Tag>
            <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} onClick={onChange}>Change</Button>
            {onClear && (
                <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="trash" onClick={onClear} ariaLabel="Remove content" />
            )}
        </div>
    );
};

// ─── Rule card ───────────────────────────────────────────────────────────────

interface RuleCardProps {
    rule: PersonalizationRule;
    index: number;
    onChange: (rule: PersonalizationRule) => void;
    onDelete: () => void;
    onOpenContentPicker: () => void;
}

const RuleCard = ({ rule, index, onChange, onDelete, onOpenContentPicker }: RuleCardProps) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const addSegment = (id: string) => {
        onChange({ ...rule, segmentIds: [...rule.segmentIds, id] });
        setPopoverOpen(false);
    };
    const removeSegment = (id: string) => onChange({ ...rule, segmentIds: rule.segmentIds.filter(s => s !== id) });
    const setMode = (mode: MatchMode) => onChange({ ...rule, matchMode: mode });

    const segmentCount = rule.segmentIds.length;
    const isIncomplete = segmentCount === 0 || !rule.contentId;
    const conditionWord = index === 0 ? 'IF' : 'ELSE IF';

    return (
        <div style={{
            background: C.neutral10,
            border: `1px solid ${isIncomplete ? C.warning30 : C.neutral60}`,
            borderLeft: `3px solid ${isIncomplete ? C.warning100 : C.primary80}`,
            borderRadius: 8, overflow: 'visible',
            boxShadow: SHADOW.extraSmall,
        }}>
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: `1px solid ${C.neutral60}`, background: C.neutral30 }}>
                <div title="Drag to reorder" style={{ cursor: 'grab', color: C.neutral150, fill: C.neutral150, display: 'flex', alignItems: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></svg>
                </div>
                <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral10, background: C.primary80, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.04em' }}>
                    P{index + 1}
                </span>
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>
                    Rule {index + 1}
                </span>
                <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, fontStyle: 'italic' }}>
                    ({conditionWord})
                </span>
                {isIncomplete && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONT, fontSize: 11, color: C.warning100, fontWeight: 600 }}>
                        <Icon name="alert-error" size={IconSize.Tiny} />
                        Incomplete
                    </span>
                )}
                <div style={{ flex: 1 }} />
                <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="trash" onClick={onDelete} ariaLabel={`Delete rule ${index + 1}`} />
            </div>

            {/* Body: WHEN / THEN */}
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* WHEN */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.primary80, background: C.primary20, border: `1px solid ${C.primary30}`, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.04em' }}>
                                WHEN
                            </span>
                            <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                                visitor matches
                            </span>
                        </div>
                        <MatchModeToggle value={rule.matchMode} onChange={setMode} disabled={segmentCount < 2} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, padding: 8, minHeight: 44, background: C.neutral30, border: `1px solid ${C.neutral70}`, borderRadius: 8 }}>
                            {rule.segmentIds.map((segId, i) => {
                                const seg = findSegment(segId);
                                if (!seg) return null;
                                return (
                                    <React.Fragment key={segId}>
                                        {i > 0 && (
                                            <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: C.neutral150, padding: '0 2px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                                {rule.matchMode === 'all' ? 'AND' : 'OR'}
                                            </span>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px 4px 10px', background: C.primary20, border: `1px solid ${C.primary30}`, borderRadius: 16, fontFamily: FONT, fontSize: 12, color: C.primary80, fontWeight: 500 }}>
                                            <Icon name="tags" size={IconSize.Tiny} />
                                            {seg.name}
                                            <button
                                                onClick={() => removeSegment(segId)}
                                                title={`Remove ${seg.name}`}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit', fill: 'currentColor', padding: 2, opacity: 0.7, borderRadius: 4 }}
                                                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
                                                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'}
                                            >
                                                <Icon name="remove" size={IconSize.Tiny} />
                                            </button>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                            <div style={{ position: 'relative' }}>
                                <Button
                                    type={ButtonType.TertiaryAlt}
                                    size={ButtonSize.Small}
                                    icon="add"
                                    onClick={() => setPopoverOpen(v => !v)}
                                >
                                    {segmentCount === 0 ? 'Add segment' : 'Add'}
                                </Button>
                                {popoverOpen && (
                                    <SegmentPopover
                                        excludeIds={rule.segmentIds}
                                        onPick={addSegment}
                                        onClose={() => setPopoverOpen(false)}
                                    />
                                )}
                            </div>
                        </div>
                        {segmentCount < 2 && (
                            <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, marginTop: 6, marginLeft: 2 }}>
                                {segmentCount === 0
                                    ? 'No segments yet — this rule will never match.'
                                    : 'Add a second segment to use the match-all / match-any logic.'}
                            </div>
                        )}
                    </div>
                </div>

                {/* THEN */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.success90, background: C.success20, border: `1px solid ${C.success30}`, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.04em' }}>
                            THEN
                        </span>
                        <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                            show this content
                        </span>
                    </div>
                    <ContentSlot
                        contentId={rule.contentId}
                        placeholder="Pick a content item…"
                        onChange={onOpenContentPicker}
                        compact
                    />
                </div>
            </div>
        </div>
    );
};

// ─── Page shell ──────────────────────────────────────────────────────────────

interface PickerTarget {
    kind: 'fallback' | 'rule';
    ruleId?: string;
}

const LandingBlockMockup = () => {
    const [fallbackId, setFallbackId] = useState<string | null>(INITIAL_FALLBACK_ID);
    const [rules, setRules] = useState<PersonalizationRule[]>(INITIAL_RULES);
    const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dropIndicator, setDropIndicator] = useState<{ ruleId: string; position: 'before' | 'after' } | null>(null);

    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => setNotification(null), 3500);
        return () => clearTimeout(timer);
    }, [notification]);

    const updateRule = (id: string, updates: Partial<PersonalizationRule>) =>
        setRules(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)));

    const addRule = () => {
        const id = `rule-${Date.now()}`;
        setRules(prev => [...prev, { id, matchMode: 'any', segmentIds: [], contentId: null }]);
    };

    const removeRule = (id: string) => {
        setRules(prev => prev.filter(r => r.id !== id));
        setNotification('Rule removed.');
    };

    const handleDragStart = (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', id); } catch (_) { /* some browsers throw on setData */ }
    };

    const handleDragOver = (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
        if (!draggedId || draggedId === id) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const rect = e.currentTarget.getBoundingClientRect();
        const position: 'before' | 'after' = e.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
        setDropIndicator(prev => (prev && prev.ruleId === id && prev.position === position ? prev : { ruleId: id, position }));
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setDropIndicator(null);
    };

    const handleDrop = (id: string) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!draggedId || !dropIndicator) { handleDragEnd(); return; }
        const fromIdx = rules.findIndex(r => r.id === draggedId);
        let toIdx = rules.findIndex(r => r.id === dropIndicator.ruleId);
        if (fromIdx < 0 || toIdx < 0) { handleDragEnd(); return; }
        if (dropIndicator.position === 'after') toIdx += 1;
        if (fromIdx < toIdx) toIdx -= 1;
        if (fromIdx === toIdx) { handleDragEnd(); return; }
        const next = [...rules];
        const [moved] = next.splice(fromIdx, 1);
        next.splice(toIdx, 0, moved);
        setRules(next);
        setNotification(`Rule moved to priority P${toIdx + 1}.`);
        handleDragEnd();
    };

    const handleListDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        // Only clear when leaving the rules container entirely, not when crossing into a child
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setDropIndicator(null);
        }
    };

    const handlePickerSelect = (contentId: string) => {
        if (!pickerTarget) return;
        if (pickerTarget.kind === 'fallback') {
            setFallbackId(contentId);
        } else if (pickerTarget.ruleId) {
            updateRule(pickerTarget.ruleId, { contentId });
        }
        setPickerTarget(null);
    };

    const pickerCurrentId = pickerTarget
        ? pickerTarget.kind === 'fallback'
            ? fallbackId
            : rules.find(r => r.id === pickerTarget.ruleId)?.contentId ?? null
        : null;

    const totalRules = rules.length;
    const incompleteRules = rules.filter(r => r.segmentIds.length === 0 || !r.contentId).length;

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: FONT, background: C.neutral20, overflow: 'hidden' }}>
            <LeftNav activeItem={0} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <TopBar />

                <main style={{ flex: 1, overflow: 'auto', background: C.neutral20 }}>
                    {/* Page header */}
                    <div style={{ background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ color: C.primary80, fill: C.primary80 }}>
                                <Icon name="list-content" size={IconSize.Medium} />
                            </div>
                            <div>
                                <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.neutral240, lineHeight: 1.3 }}>
                                    Personalized Hero Block
                                </div>
                                <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 2 }}>
                                    Cohesivo Administration &rsaquo; Landing pages &rsaquo; Enterprise hero &rsaquo; Personalized Hero Block
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <Button type={ButtonType.SecondaryAlt} onClick={() => {
                                setFallbackId(INITIAL_FALLBACK_ID);
                                setRules(INITIAL_RULES);
                                setNotification('Changes discarded.');
                            }}>Discard</Button>
                            <Button type={ButtonType.Primary} icon="check-circle" onClick={() => setNotification('Block configuration saved.')}>
                                Save and close
                            </Button>
                        </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding: 24, display: 'flex', gap: 24, alignItems: 'flex-start', maxWidth: 1280, margin: '0 auto' }}>
                        {/* Main column */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>

                            {/* Rules section — comes first */}
                            <section style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 20, boxShadow: SHADOW.extraSmall, display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                                    <SectionHeading
                                        icon="content-tree"
                                        title="Personalization rules"
                                        helperText="Rules are evaluated top-to-bottom — the first matching rule wins. Drag to reorder, or use the priority badges as a guide. If none match, the default content below is shown."
                                    />
                                    <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="add" onClick={addRule}>
                                        Add rule
                                    </Button>
                                </div>

                                {rules.length === 0 ? (
                                    <div style={{ padding: '32px 20px', textAlign: 'center', background: C.neutral30, border: `1px dashed ${C.neutral80}`, borderRadius: 8 }}>
                                        <div style={{ color: C.neutral150, fill: C.neutral150, marginBottom: 8, display: 'inline-flex' }}>
                                            <Icon name="content-tree" size={IconSize.Medium} />
                                        </div>
                                        <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240 }}>No personalization rules yet</div>
                                        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 4, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
                                            All visitors will see the default content below. Add a rule to tailor the block for specific segments.
                                        </div>
                                        <div style={{ marginTop: 12 }}>
                                            <Button type={ButtonType.Primary} size={ButtonSize.Small} icon="add" onClick={addRule}>
                                                Add your first rule
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                                        onDragLeave={handleListDragLeave}
                                    >
                                        {rules.map((rule, i) => {
                                            const isDragged = draggedId === rule.id;
                                            const showBefore = dropIndicator?.ruleId === rule.id && dropIndicator.position === 'before';
                                            const showAfter  = dropIndicator?.ruleId === rule.id && dropIndicator.position === 'after';
                                            return (
                                                <div
                                                    key={rule.id}
                                                    draggable
                                                    onDragStart={handleDragStart(rule.id)}
                                                    onDragOver={handleDragOver(rule.id)}
                                                    onDrop={handleDrop(rule.id)}
                                                    onDragEnd={handleDragEnd}
                                                    style={{
                                                        position: 'relative',
                                                        opacity: isDragged ? 0.35 : 1,
                                                        transition: 'opacity 0.15s ease',
                                                    }}
                                                >
                                                    {showBefore && (
                                                        <div style={{ position: 'absolute', left: 0, right: 0, top: -7, height: 3, background: C.primary80, borderRadius: 2, zIndex: 10, pointerEvents: 'none', boxShadow: `0 0 8px ${C.primary30}` }}>
                                                            <div style={{ position: 'absolute', left: -4, top: -3, width: 9, height: 9, borderRadius: '50%', background: C.primary80 }} />
                                                            <div style={{ position: 'absolute', right: -4, top: -3, width: 9, height: 9, borderRadius: '50%', background: C.primary80 }} />
                                                        </div>
                                                    )}
                                                    <RuleCard
                                                        rule={rule}
                                                        index={i}
                                                        onChange={(next) => updateRule(rule.id, next)}
                                                        onDelete={() => removeRule(rule.id)}
                                                        onOpenContentPicker={() => setPickerTarget({ kind: 'rule', ruleId: rule.id })}
                                                    />
                                                    {showAfter && (
                                                        <div style={{ position: 'absolute', left: 0, right: 0, bottom: -7, height: 3, background: C.primary80, borderRadius: 2, zIndex: 10, pointerEvents: 'none', boxShadow: `0 0 8px ${C.primary30}` }}>
                                                            <div style={{ position: 'absolute', left: -4, top: -3, width: 9, height: 9, borderRadius: '50%', background: C.primary80 }} />
                                                            <div style={{ position: 'absolute', right: -4, top: -3, width: 9, height: 9, borderRadius: '50%', background: C.primary80 }} />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>

                            {/* Visual ELSE connector */}
                            {rules.length > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 8 }}>
                                    <div style={{ width: 2, height: 16, background: C.neutral70 }} />
                                    <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral170, background: C.neutral40, border: `1px solid ${C.neutral70}`, padding: '2px 10px', borderRadius: 12, letterSpacing: '0.06em' }}>
                                        OTHERWISE
                                    </span>
                                    <div style={{ flex: 1, height: 1, background: C.neutral70 }} />
                                </div>
                            )}

                            {/* Fallback section — now at the bottom */}
                            <section style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderLeft: `3px solid ${C.neutral100}`, borderRadius: 8, padding: 20, boxShadow: SHADOW.extraSmall, display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                                    <SectionHeading
                                        icon="form-check-list"
                                        title="Default content (fallback)"
                                        helperText="Shown when the visitor doesn't match any rule above. Acts as the final ‘else’ branch — and as a safety net if every rule becomes invalid."
                                    />
                                    <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral170, background: C.neutral40, border: `1px solid ${C.neutral70}`, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.04em', flexShrink: 0 }}>
                                        ELSE
                                    </span>
                                </div>
                                <ContentSlot
                                    contentId={fallbackId}
                                    placeholder="Pick a default content item…"
                                    onChange={() => setPickerTarget({ kind: 'fallback' })}
                                    onClear={fallbackId ? () => setFallbackId(null) : undefined}
                                />
                                {!fallbackId && (
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px', background: C.warning10, border: `1px solid ${C.warning30}`, borderLeft: `3px solid ${C.warning100}`, borderRadius: 6 }}>
                                        <div style={{ color: C.warning100, fill: C.warning100, flexShrink: 0, marginTop: 1 }}>
                                            <Icon name="alert-error" size={IconSize.Small} />
                                        </div>
                                        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral240 }}>
                                            <strong>No default content set.</strong> Visitors who don't match any rule will see nothing in this block.
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 20, boxShadow: SHADOW.extraSmall }}>
                                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240, marginBottom: 12 }}>Block summary</div>
                                {[
                                    { label: 'Active rules',    value: String(totalRules) },
                                    { label: 'Incomplete',      value: incompleteRules > 0 ? `${incompleteRules} need attention` : 'None', highlight: incompleteRules > 0 },
                                    { label: 'Default content', value: findContent(fallbackId)?.name ?? '— not set —' },
                                    { label: 'Block ID',        value: 'block-hero-0142' },
                                    { label: 'Modified',        value: '2 Jun 2026' },
                                ].map(row => (
                                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px solid ${C.neutral50}`, fontFamily: FONT, fontSize: 13, gap: 8 }}>
                                        <span style={{ color: C.neutral170, flexShrink: 0 }}>{row.label}</span>
                                        <span style={{ color: row.highlight ? C.warning100 : C.neutral240, fontWeight: 600, fontSize: 12, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {row.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: C.primary10, border: `1px solid ${C.primary30}`, borderRadius: 8, padding: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.primary80, marginBottom: 8 }}>
                                    <Icon name="ai" size={IconSize.Small} />
                                    How matching works
                                </div>
                                <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190, lineHeight: 1.7 }}>
                                    Each rule reads as:<br />
                                    <code style={{ fontFamily: 'monospace', fontSize: 11, color: C.primary80 }}>
                                        IF visitor matches segments → show content
                                    </code>
                                </div>
                                <ul style={{ margin: '8px 0 0', paddingLeft: 18, fontFamily: FONT, fontSize: 12, color: C.neutral190, lineHeight: 1.6 }}>
                                    <li>Rules evaluate <strong>top-to-bottom</strong></li>
                                    <li><strong>Match all</strong> — visitor in every segment</li>
                                    <li><strong>Match any</strong> — visitor in at least one</li>
                                    <li>No match? → <strong>default content</strong> shows</li>
                                </ul>
                            </div>

                            <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 20, boxShadow: SHADOW.extraSmall }}>
                                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240, marginBottom: 12 }}>Preview as</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {['Anonymous visitor', 'mon audience 2', 'VIP + DE'].map(label => (
                                        <button
                                            key={label}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 8,
                                                padding: '8px 10px', borderRadius: 6,
                                                background: C.neutral30, border: `1px solid ${C.neutral60}`,
                                                cursor: 'pointer', textAlign: 'left',
                                                fontFamily: FONT, fontSize: 12, color: C.neutral240, fontWeight: 500,
                                            }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.primary30; (e.currentTarget as HTMLButtonElement).style.background = C.primary10; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.neutral60; (e.currentTarget as HTMLButtonElement).style.background = C.neutral30; }}
                                        >
                                            <Icon name="app-www" size={IconSize.Tiny} />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>

            {pickerTarget && (
                <ContentPickerModal
                    currentId={pickerCurrentId}
                    title={pickerTarget.kind === 'fallback' ? 'Choose default content' : 'Choose content for this rule'}
                    onCancel={() => setPickerTarget(null)}
                    onSelect={handlePickerSelect}
                />
            )}

            {notification && <Notification message={notification} onDismiss={() => setNotification(null)} />}
        </div>
    );
};

// ─── Storybook ───────────────────────────────────────────────────────────────

const meta: Meta<typeof LandingBlockMockup> = {
    component: LandingBlockMockup,
    title: 'Mockups/Landing Block – Personalization',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof LandingBlockMockup>;

export const Default: Story = {
    name: 'Block configuration',
};
