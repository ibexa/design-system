import React, { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Icon, IconSize } from '@ids-components/Icon';
import { RadioButtonsListField, RadioButtonsListFieldDirection } from '@ids-components/RadioButton';

// ─── Design tokens ───────────────────────────────────────────────────────────

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
const MONO = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace";
const BRAND_GRADIENT = 'linear-gradient(135deg, oklch(0.4047 0.1894 289.97) 30%, oklch(0.7328 0.1183 299.96) 100%)';

// ─── Types ────────────────────────────────────────────────────────────────────

type SiteAccess = 'site' | 'corporate' | 'admin';
type EditorFormat = 'json' | 'yaml';
type View = 'list' | 'detail';

interface ConfigItem {
    id: string;
    label: string;
    description: string;
    icon: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const SA_LABELS: Record<SiteAccess, string> = {
    site:      'site',
    corporate: 'corporate',
    admin:     'admin',
};

const CONFIGS_BY_SA: Record<SiteAccess, ConfigItem[]> = {
    site: [
        { id: 'content-type',  label: 'Content Type',    description: 'Maps content type identifiers to their specific configurations.', icon: 'note-text' },
        { id: 'url-alias',     label: 'URL Aliases',     description: 'Configures URL alias patterns for content routing.',             icon: 'world' },
        { id: 'design',        label: 'Design',           description: 'Defines theme and design asset paths for this SiteAccess.',     icon: 'box-component' },
    ],
    corporate: [
        { id: 'content-type',  label: 'Content Type',    description: 'Maps content type identifiers to their specific configurations.', icon: 'note-text' },
        { id: 'segment-group', label: 'Segment Groups',  description: 'Assigns visitor segment groups for personalisation targeting.',   icon: 'user-group' },
    ],
    admin: [
        { id: 'content-type',  label: 'Content Type',    description: 'Maps content type identifiers to their specific configurations.', icon: 'note-text' },
    ],
};

const EDITOR_DEFAULTS: Record<SiteAccess, Record<string, string>> = {
    site: {
        'content-type':  '[\n  {\n    "identifier": "article",\n    "thumbnail": "/assets/images/article.svg"\n  },\n  {\n    "identifier": "folder",\n    "thumbnail": "/assets/images/folder.svg"\n  }\n]',
        'url-alias':     '{\n  "slug_converter": "urlalias.slug_converter.apostroph",\n  "transformation": "urlalias.name_schema_strategy.identical"\n}',
        'design':        '{\n  "current_design": "standard",\n  "override_path": "/var/site/themes"\n}',
    },
    corporate: {
        'content-type':  '[]',
        'segment-group': '[\n  {\n    "group_id": 1,\n    "name": "Premium subscribers"\n  }\n]',
    },
    admin: {
        'content-type':  '[]',
    },
};

const YAML_DEFAULTS: Record<SiteAccess, Record<string, string>> = {
    site: {
        'content-type':  '- identifier: article\n  thumbnail: /assets/images/article.svg\n- identifier: folder\n  thumbnail: /assets/images/folder.svg',
        'url-alias':     'slug_converter: urlalias.slug_converter.apostroph\ntransformation: urlalias.name_schema_strategy.identical',
        'design':        'current_design: standard\noverride_path: /var/site/themes',
    },
    corporate: {
        'content-type':  '[]',
        'segment-group': '- group_id: 1\n  name: Premium subscribers',
    },
    admin: {
        'content-type':  '[]',
    },
};

const JSON_EXAMPLE: Record<string, string> = {
    'content-type':  '[\n  {\n    "identifier": "article",\n    "thumbnail": "/assets/images/article.svg"\n  },\n  {\n    "identifier": "folder",\n    "thumbnail": "/assets/images/folder.svg"\n  }\n]',
    'url-alias':     '{\n  "slug_converter": "urlalias.slug_converter.apostroph",\n  "transformation": "urlalias.name_schema_strategy.identical"\n}',
    'design':        '{\n  "current_design": "standard",\n  "override_path": "/var/site/themes"\n}',
    'segment-group': '[\n  {\n    "group_id": 1,\n    "name": "Premium subscribers"\n  }\n]',
};

// ─── Toast ────────────────────────────────────────────────────────────────────

const ANIM_CSS = `
@keyframes sa-toast-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes sa-spin { to { transform: rotate(360deg); } }
`;

let _toastCounter = 0;
const toastId = () => `t${++_toastCounter}`;

interface ToastItem {
    id: string;
    type: 'success' | 'error';
    title: string;
    subtitle?: string;
}

const Spinner = ({ color, size = 11 }: { color: string; size?: number }) => (
    <span style={{ display: 'inline-block', width: size, height: size, border: `2px solid ${color}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'sa-spin 0.7s linear infinite', flexShrink: 0 }} />
);

const Toast = ({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) => (
    <div style={{ background: C.neutral10, border: `1px solid ${toast.type === 'success' ? C.success30 : C.error30}`, borderLeft: `4px solid ${toast.type === 'success' ? C.success90 : C.error80}`, borderRadius: 8, padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'flex-start', boxShadow: SHADOW.medium, width: 330, animation: 'sa-toast-in 0.2s ease' }}>
        <div style={{ color: toast.type === 'success' ? C.success90 : C.error80, fill: toast.type === 'success' ? C.success90 : C.error80, flexShrink: 0 }}>
            <Icon name={toast.type === 'success' ? 'check-circle' : 'alert-error'} size={IconSize.SmallMedium} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.neutral240 }}>{toast.title}</div>
            {toast.subtitle && <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190, marginTop: 2, lineHeight: 1.4 }}>{toast.subtitle}</div>}
        </div>
        <button onClick={onDismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150, flexShrink: 0 }}>
            <Icon name="x" size={IconSize.Small} />
        </button>
    </div>
);

// ─── BrandMark ────────────────────────────────────────────────────────────────

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

// ─── TopBar ───────────────────────────────────────────────────────────────────

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

// ─── LeftRail ─────────────────────────────────────────────────────────────────

const RAIL_ITEMS = [
    { icon: 'home',         label: 'Dashboard' },
    { icon: 'user-group',   label: 'Users' },
    { icon: 'world',        label: 'Languages & Sites' },
    { icon: 'content-tree', label: 'Content structure' },
    { icon: 'speaker',      label: 'Campaigns' },
];

const LeftRail = () => (
    <nav style={{ width: 56, minWidth: 56, background: C.neutral240, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%', flex: 1 }}>
            {RAIL_ITEMS.map(item => (
                <button key={item.icon} title={item.label} style={{ width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: C.neutral100, fill: C.neutral100 }}>
                    <Icon name={item.icon} size={IconSize.SmallMedium} />
                </button>
            ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingBottom: 10 }}>
            <button title="Settings" style={{ width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', background: C.primary70, color: C.neutral10, fill: C.neutral10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="settings-cog" size={IconSize.SmallMedium} />
            </button>
            <button title="Bookmarks" style={{ width: 40, height: 40, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'transparent', color: C.neutral100, fill: C.neutral100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="bookmark-outline" size={IconSize.SmallMedium} />
            </button>
        </div>
    </nav>
);

// ─── SecondaryNav ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
    'Users', 'Roles', 'Dashboards', 'Dashboard type', 'Languages',
    'Workflow', 'URL management', 'Segments', 'Corporate',
    'Recent activity', 'System information', 'AI actions', 'SiteAccess Configuration',
];

const AdminSecondaryNav = () => (
    <nav style={{ width: 210, minWidth: 210, background: C.neutral230, display: 'flex', flexDirection: 'column', padding: '12px 10px', gap: 2, overflowY: 'auto' }}>
        {NAV_ITEMS.map(label => {
            const active = label === 'SiteAccess Configuration';
            return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', height: 34, padding: '0 12px', borderRadius: 8, fontFamily: FONT, fontSize: 13.5, cursor: 'pointer', background: active ? C.primary20 : 'transparent', color: active ? C.primary80 : C.neutral100, fontWeight: active ? 600 : 400 }}>
                    {label}
                </div>
            );
        })}
    </nav>
);

// ─── SiteAccess Selector ──────────────────────────────────────────────────────

const SiteAccessSelector = ({ selected, onSelect }: { selected: SiteAccess; onSelect: (sa: SiteAccess) => void }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {(Object.keys(SA_LABELS) as SiteAccess[]).map(sa => {
            const active = sa === selected;
            return (
                <button
                    key={sa}
                    onClick={() => onSelect(sa)}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        height: 34, padding: active ? '0 14px 0 10px' : '0 14px', borderRadius: 8, cursor: 'pointer',
                        fontFamily: FONT, fontSize: 13.5, fontWeight: active ? 600 : 500,
                        border: `1.5px solid ${C.primary70}`,
                        background: active ? C.primary70 : C.neutral10,
                        color: active ? C.neutral10 : C.primary80,
                        transition: 'background 0.15s, color 0.15s',
                        boxShadow: active ? SHADOW.extraSmall : 'none',
                    }}
                >
                    {active && (
                        <span style={{ display: 'inline-flex', fill: C.neutral10 }}>
                            <Icon name="check-mark" size={IconSize.Tiny} />
                        </span>
                    )}
                    {SA_LABELS[sa]}
                </button>
            );
        })}
        <span style={{ marginLeft: 4, fontFamily: FONT, fontSize: 12.5, color: C.neutral150 }}>
            Selected SiteAccess context
        </span>
    </div>
);

// ─── Config list item ─────────────────────────────────────────────────────────

const ConfigListItem = ({ config, onClick }: { config: ConfigItem; onClick: () => void }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: 14,
            width: '100%', textAlign: 'left', padding: '14px 18px',
            background: C.neutral10, border: 'none', cursor: 'pointer',
            borderBottom: `1px solid ${C.neutral60}`,
            transition: 'background 0.1s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = C.neutral20)}
        onMouseLeave={e => (e.currentTarget.style.background = C.neutral10)}
    >
        <div style={{ width: 36, height: 36, borderRadius: 8, background: C.primary10, border: `1px solid ${C.primary30}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: C.primary80, fill: C.primary80 }}>
            <Icon name={config.icon} size={IconSize.Small} />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.primary80 }}>{config.label}</div>
            <div style={{ fontFamily: FONT, fontSize: 12.5, color: C.neutral150, marginTop: 2 }}>{config.description}</div>
        </div>
        <span style={{ color: C.neutral150, fill: C.neutral150, flexShrink: 0 }}>
            <Icon name="arrow-caret-right" size={IconSize.Small} />
        </span>
    </button>
);

// ─── List view ────────────────────────────────────────────────────────────────

interface ListViewProps {
    selectedSA: SiteAccess;
    onSelectSA: (sa: SiteAccess) => void;
    onOpenConfig: (config: ConfigItem) => void;
}

const ListView = ({ selectedSA, onSelectSA, onOpenConfig }: ListViewProps) => {
    const configs = CONFIGS_BY_SA[selectedSA];
    return (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: C.neutral20 }}>
            {/* Breadcrumb */}
            <div style={{ padding: '10px 32px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT, fontSize: 13, background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, flexShrink: 0 }}>
                <span style={{ color: C.neutral170 }}>Admin</span>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral150, fill: C.neutral150 }}>
                    <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                </span>
                <span style={{ color: C.neutral240, fontWeight: 500 }}>SiteAccess Configuration</span>
            </div>

            {/* Content */}
            <div style={{ padding: '28px 32px', flex: 1 }}>
                {/* Page header */}
                <div style={{ marginBottom: 28 }}>
                    <h1 style={{ margin: '0 0 6px', fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.neutral240 }}>
                        SiteAccess Configuration
                    </h1>
                    <p style={{ margin: 0, fontFamily: FONT, fontSize: 14, color: C.neutral170, lineHeight: 1.5 }}>
                        Select a SiteAccess to browse and edit its available configurations.
                    </p>
                </div>

                {/* SA Selector card */}
                <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 10, padding: '18px 20px', marginBottom: 20, boxShadow: SHADOW.extraSmall }}>
                    <SiteAccessSelector selected={selectedSA} onSelect={onSelectSA} />
                </div>

                {/* Configurations list card */}
                <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 10, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                    {/* Card header */}
                    <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.neutral60}`, background: C.neutral20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: C.neutral240 }}>Available Configurations</span>
                            <span style={{ marginLeft: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: C.primary20, fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.primary80 }}>
                                {configs.length}
                            </span>
                        </div>
                        <span style={{ fontFamily: FONT, fontSize: 12.5, color: C.neutral150 }}>
                            SiteAccess: <strong style={{ color: C.neutral240 }}>{selectedSA}</strong>
                        </span>
                    </div>
                    {configs.map(config => (
                        <ConfigListItem key={config.id} config={config} onClick={() => onOpenConfig(config)} />
                    ))}
                </div>
            </div>
        </main>
    );
};

// ─── Inline code highlight helper ─────────────────────────────────────────────

const InlineCode = ({ children }: { children: string }) => (
    <code style={{ fontFamily: MONO, fontSize: 12.5, background: C.neutral40, border: `1px solid ${C.neutral60}`, borderRadius: 4, padding: '1px 5px', color: C.error80 }}>
        {children}
    </code>
);

// ─── Detail view ──────────────────────────────────────────────────────────────

interface DetailViewProps {
    config: ConfigItem;
    selectedSA: SiteAccess;
    onBack: () => void;
    onSaved: (label: string, sa: SiteAccess) => void;
}

const DetailView = ({ config, selectedSA, onBack, onSaved }: DetailViewProps) => {
    const [format, setFormat] = useState<EditorFormat>('json');
    const [editorValue, setEditorValue] = useState(
        EDITOR_DEFAULTS[selectedSA]?.[config.id] ?? '[]'
    );
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            onSaved(config.label, selectedSA);
        }, 1400);
    };

    const handleFormatChange = (value: string) => {
        const next = value as EditorFormat;
        if (next === format) return;
        const src = next === 'yaml'
            ? (YAML_DEFAULTS[selectedSA]?.[config.id] ?? '')
            : (EDITOR_DEFAULTS[selectedSA]?.[config.id] ?? '[]');
        setFormat(next);
        setEditorValue(src);
    };

    const exampleCode = JSON_EXAMPLE[config.id] ?? '[]';

    return (
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', background: C.neutral20 }}>
            {/* Breadcrumb */}
            <div style={{ padding: '10px 32px', display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT, fontSize: 13, background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, flexShrink: 0 }}>
                <span style={{ color: C.neutral170 }}>Admin</span>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral150, fill: C.neutral150 }}>
                    <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                </span>
                <button onClick={onBack} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: FONT, fontSize: 13, color: C.primary80 }}>
                    SiteAccess Configuration
                </button>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral150, fill: C.neutral150 }}>
                    <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                </span>
                <span style={{ color: C.neutral240, fontWeight: 500 }}>{config.label} ({selectedSA})</span>
            </div>

            {/* Content */}
            <div style={{ padding: '28px 32px', flex: 1 }}>
                <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 10, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>

                    {/* Detail header */}
                    <div style={{ padding: '24px 28px 20px', borderBottom: `1px solid ${C.neutral60}` }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 44, height: 44, borderRadius: 10, background: C.primary10, border: `1px solid ${C.primary30}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: C.primary80, fill: C.primary80 }}>
                                <Icon name={config.icon} size={IconSize.SmallMedium} />
                            </div>
                            <div>
                                <h1 style={{ margin: '0 0 4px', fontFamily: FONT, fontSize: 22, fontWeight: 700, color: C.neutral240 }}>
                                    Configure: {config.label}
                                    <span style={{ fontSize: 16, fontWeight: 500, color: C.neutral170, marginLeft: 8 }}>({selectedSA})</span>
                                </h1>
                                <p style={{ margin: 0, fontFamily: FONT, fontSize: 13.5, color: C.neutral190, lineHeight: 1.5 }}>
                                    {config.description}
                                </p>
                            </div>
                        </div>

                        {/* Schema info */}
                        <div style={{ background: C.neutral20, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: '14px 18px' }}>
                            <ul style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <li style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                                    <strong style={{ color: C.neutral240 }}>Structure:</strong> A list of objects.
                                </li>
                                <li style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                                    <strong style={{ color: C.neutral240 }}>Required fields:</strong>{' '}
                                    <InlineCode>identifier</InlineCode>{' '}(e.g.,{' '}
                                    <InlineCode>article</InlineCode>,{' '}
                                    <InlineCode>folder</InlineCode>).
                                </li>
                                <li style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                                    <strong style={{ color: C.neutral240 }}>Optional fields:</strong>{' '}
                                    <InlineCode>thumbnail</InlineCode>{' '}(a path to an image or SVG file).
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Example */}
                    <div style={{ padding: '20px 28px', borderBottom: `1px solid ${C.neutral60}` }}>
                        <p style={{ margin: '0 0 10px', fontFamily: FONT, fontSize: 13, fontStyle: 'italic', color: C.neutral170 }}>Example:</p>
                        <pre style={{ margin: 0, padding: '14px 16px', background: C.neutral40, border: `1px solid ${C.neutral60}`, borderRadius: 8, fontFamily: MONO, fontSize: 12.5, color: C.neutral230, lineHeight: 1.6, overflowX: 'auto' }}>
                            {exampleCode}
                        </pre>
                    </div>

                    {/* Back to list */}
                    <div style={{ padding: '16px 28px', borderBottom: `1px solid ${C.neutral60}`, background: C.neutral20 }}>
                        <Button
                            type={ButtonType.Secondary}
                            size={ButtonSize.Small}
                            icon="arrow-caret-left"
                            onClick={onBack}
                        >
                            Back to list
                        </Button>
                    </div>

                    {/* Edit Configuration */}
                    <div style={{ padding: '24px 28px' }}>
                        <h2 style={{ margin: '0 0 20px', fontFamily: FONT, fontSize: 18, fontWeight: 700, color: C.neutral240 }}>
                            Edit Configuration
                        </h2>

                        {/* Format toggle */}
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: C.neutral240, marginBottom: 8 }}>
                                Editor Format
                            </div>
                            <RadioButtonsListField
                                label={undefined}
                                helperText={undefined}
                                name="editor-format"
                                value={format}
                                onChange={handleFormatChange}
                                direction={RadioButtonsListFieldDirection.Horizontal}
                                items={[
                                    { id: 'json', label: 'JSON', value: 'json' },
                                    { id: 'yaml', label: 'YAML', value: 'yaml' },
                                ]}
                            />
                            <p style={{ margin: '6px 0 0', fontFamily: FONT, fontSize: 12.5, color: C.neutral150 }}>
                                Switching formats will reload the editor with the current configuration in the selected format.
                            </p>
                        </div>

                        {/* Code editor */}
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 10, right: 12, fontFamily: MONO, fontSize: 11, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', pointerEvents: 'none' }}>
                                {format}
                            </div>
                            <textarea
                                value={editorValue}
                                onChange={e => setEditorValue(e.target.value)}
                                spellCheck={false}
                                style={{
                                    width: '100%', minHeight: 280, boxSizing: 'border-box',
                                    padding: '14px 16px', paddingTop: 36,
                                    fontFamily: MONO, fontSize: 13, lineHeight: 1.65,
                                    color: C.neutral230, background: C.neutral40,
                                    border: `1.5px solid ${C.neutral60}`, borderRadius: 8,
                                    resize: 'vertical', outline: 'none',
                                    transition: 'border-color 0.15s',
                                }}
                                onFocus={e => (e.currentTarget.style.borderColor = C.primary70)}
                                onBlur={e => (e.currentTarget.style.borderColor = C.neutral60)}
                            />
                        </div>

                        {/* Save actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16 }}>
                            <button
                                onClick={isSaving ? undefined : handleSave}
                                disabled={isSaving}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 16px', borderRadius: 8, border: 'none', cursor: isSaving ? 'not-allowed' : 'pointer', background: isSaving ? C.primary30 : C.primary70, color: C.neutral10, fill: C.neutral10, fontFamily: FONT, fontSize: 13.5, fontWeight: 600, transition: 'background 0.15s' }}
                            >
                                {isSaving && <Spinner color={C.neutral10} size={13} />}
                                {isSaving ? 'Saving…' : 'Save configuration'}
                            </button>
                            <Button type={ButtonType.Secondary} size={ButtonSize.Medium} onClick={isSaving ? () => undefined : onBack}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

// ─── Root mockup ──────────────────────────────────────────────────────────────

const SiteAccessConfigMockup = () => {
    const [selectedSA, setSelectedSA] = useState<SiteAccess>('site');
    const [view, setView] = useState<View>('list');
    const [activeConfig, setActiveConfig] = useState<ConfigItem | null>(null);
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const toastTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    useEffect(() => () => { Object.values(toastTimers.current).forEach(clearTimeout); }, []);

    const dismissToast = (id: string) => {
        clearTimeout(toastTimers.current[id]);
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const addToast = (t: Omit<ToastItem, 'id'>) => {
        const id = toastId();
        setToasts(prev => [...prev, { ...t, id }]);
        toastTimers.current[id] = setTimeout(() => dismissToast(id), 5000);
    };

    const handleOpenConfig = (config: ConfigItem) => {
        setActiveConfig(config);
        setView('detail');
    };

    const handleBack = () => {
        setView('list');
        setActiveConfig(null);
    };

    const handleSelectSA = (sa: SiteAccess) => {
        setSelectedSA(sa);
        setView('list');
        setActiveConfig(null);
    };

    const handleSaved = (label: string, sa: SiteAccess) => {
        addToast({
            type: 'success',
            title: `${label} (${sa}) saved`,
            subtitle: 'The configuration has been updated successfully.',
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: FONT, background: C.neutral20, overflow: 'hidden' }}>
            <style>{ANIM_CSS}</style>
            <TopBar />
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <LeftRail />
                <AdminSecondaryNav />

                {view === 'list' ? (
                    <ListView
                        selectedSA={selectedSA}
                        onSelectSA={handleSelectSA}
                        onOpenConfig={handleOpenConfig}
                    />
                ) : (
                    <DetailView
                        config={activeConfig!}
                        selectedSA={selectedSA}
                        onBack={handleBack}
                        onSaved={handleSaved}
                    />
                )}
            </div>

            {/* Toast stack — bottom right */}
            <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {toasts.map(t => <Toast key={t.id} toast={t} onDismiss={() => dismissToast(t.id)} />)}
            </div>
        </div>
    );
};

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta<typeof SiteAccessConfigMockup> = {
    component: SiteAccessConfigMockup,
    title: 'Mockups/SiteAccessConfig',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof SiteAccessConfigMockup>;

export const Default: Story = {
    name: 'SiteAccess Configuration',
};