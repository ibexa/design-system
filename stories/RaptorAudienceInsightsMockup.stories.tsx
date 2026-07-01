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
    info100:    'oklch(0.3526 0.0842 242.35)',
    info30:     'oklch(0.9035 0.0275 236.5)',
    info10:     'oklch(0.9804 0.0042 236.5)',
};

const FONT          = "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const BRAND_GRADIENT = 'linear-gradient(135deg, oklch(0.4047 0.1894 289.97) 30%, oklch(0.7328 0.1183 299.96) 100%)';
const SHADOW = {
    large:      '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.15)',
    medium:     '4px 22px 47px 0 oklch(0.5255 0.212 294.46 / 0.12)',
    extraSmall: '0 0 12px 0 oklch(0.1798 0.0104 248.41 / 0.08)',
};

// ─── Animations ───────────────────────────────────────────────────────────────

const ANIM_CSS = `
@keyframes ri-shimmer {
  0%   { background-position: -400% 0; }
  100% { background-position: 400% 0; }
}
@keyframes ri-fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ri-spin {
  to { transform: rotate(360deg); }
}
`;

const SHIMMER_STYLE: React.CSSProperties = {
    background: `linear-gradient(90deg, ${C.neutral30} 25%, ${C.neutral50} 50%, ${C.neutral30} 75%)`,
    backgroundSize: '400% 100%',
    animation: 'ri-shimmer 1.4s ease-in-out infinite',
    borderRadius: 4,
};

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewState = 'loaded' | 'loading' | 'error' | 'empty';

// ─── BrandMark (self-contained SVG) ───────────────────────────────────────────

const BrandMark = ({ size = 28 }: { size?: number }) => (
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

// ─── Top bar ──────────────────────────────────────────────────────────────────

const TopBar = () => (
    <header style={{ height: 52, background: C.neutral240, display: 'flex', alignItems: 'center', paddingLeft: 14, paddingRight: 16, gap: 12, flexShrink: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 220 }}>
            <BrandMark size={28} />
            <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: C.neutral10, letterSpacing: '-0.01em' }}>cohesivo</span>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: 520, height: 34, background: C.neutral230, border: `1px solid ${C.neutral220}`, borderRadius: 8, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, color: C.neutral150, fill: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
                <Icon name="search" size={IconSize.Small} />
                <span style={{ color: C.neutral150 }}>Search…</span>
            </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 13, color: C.neutral80, fill: C.neutral80, cursor: 'pointer' }}>
                <Icon name="app-www" size={IconSize.Small} />
                <span>Main site</span>
                <Icon name="arrow-caret-down" size={IconSize.Tiny} />
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, color: C.neutral80, fill: C.neutral80 }} title="App settings">
                <Icon name="app-settings" size={IconSize.SmallMedium} />
            </button>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.primary70, color: C.neutral10, fontFamily: FONT, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                KO
            </div>
        </div>
    </header>
);

// ─── Left icon rail ────────────────────────────────────────────────────────────

const RAIL_ITEMS = [
    { icon: 'content-tree',      label: 'Content' },
    { icon: 'mountain',          label: 'Media' },
    { icon: 'tags',              label: 'Audiences', active: true },
    { icon: 'form-check-list',   label: 'Forms' },
    { icon: 'calendar',          label: 'Calendar' },
    { icon: 'list-content',      label: 'Commerce' },
    { icon: 'notes-list',        label: 'Campaigns' },
    { icon: 'database-settings', label: 'Settings' },
];

const LeftRail = () => (
    <nav style={{ width: 52, minWidth: 52, background: C.neutral240, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6, zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: 4, flex: 1 }}>
            {RAIL_ITEMS.map(item => (
                <button
                    key={item.icon}
                    title={item.label}
                    style={{
                        width: '100%', height: 44,
                        background: item.active ? 'linear-gradient(90deg, oklch(0.4047 0.1894 289.97) 40%, oklch(0.7328 0.1183 299.96) 100%)' : 'transparent',
                        border: 'none',
                        borderLeft: item.active ? `3px solid ${C.primary70}` : '3px solid transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: item.active ? C.neutral10 : C.neutral150,
                        fill:  item.active ? C.neutral10 : C.neutral150,
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

// ─── Secondary navigation (Audiences section) ─────────────────────────────────

const SecondaryNav = () => (
    <nav style={{ width: 200, minWidth: 200, background: C.neutral20, borderRight: `1px solid ${C.neutral60}`, display: 'flex', flexDirection: 'column', padding: '12px 0' }}>
        <div style={{ padding: '0 12px 8px', fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audiences</div>
        {[
            { label: 'All audiences',   active: true  },
            { label: 'Segments',        active: false },
            { label: 'User groups',     active: false },
            { label: 'Import / export', active: false },
        ].map(item => (
            <div key={item.label} style={{ padding: '7px 16px', fontFamily: FONT, fontSize: 13, cursor: 'pointer', background: item.active ? C.primary20 : 'transparent', color: item.active ? C.primary80 : C.neutral190, fontWeight: item.active ? 600 : 400 }}>
                {item.label}
            </div>
        ))}
        <div style={{ height: 1, background: C.neutral60, margin: '10px 12px' }} />
        <div style={{ padding: '0 12px 8px', fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.05em' }}>CDP Integration</div>
        {[
            { label: 'Raptor CDP',    active: false },
            { label: 'Sync log',      active: false },
            { label: 'Configuration', active: false },
        ].map(item => (
            <div key={item.label} style={{ padding: '7px 16px', fontFamily: FONT, fontSize: 13, cursor: 'pointer', color: C.neutral190 }}>
                {item.label}
            </div>
        ))}
    </nav>
);

// ─── Info tooltip icon ────────────────────────────────────────────────────────

const InfoIcon = ({ tooltip }: { tooltip: string }) => (
    <span
        title={tooltip}
        style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 16, height: 16, borderRadius: '50%',
            border: `1.5px solid ${C.neutral100}`, color: C.neutral150,
            fontFamily: FONT, fontSize: 10, fontWeight: 700, cursor: 'help',
            flexShrink: 0, userSelect: 'none',
        }}
    >
        i
    </span>
);

// ─── Population bar (replaces donut for share metrics) ───────────────────────

const PopulationBar = ({ audienceValue, totalValue, formatValue, color = C.primary80 }: {
    audienceValue: number;
    totalValue: number;
    formatValue: (v: number) => string;
    color?: string;
}) => {
    const pct = (audienceValue / totalValue) * 100;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
            <div>
                <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.neutral240, lineHeight: 1 }}>
                    {formatValue(audienceValue)}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 4 }}>in audience</div>
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190 }}>Share of total population</span>
                    <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: C.neutral240 }}>{pct.toFixed(1)}%</span>
                </div>
                <div style={{ height: 10, background: C.neutral60, borderRadius: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 5, transition: 'width 0.6s ease' }} />
                </div>
                <div style={{ marginTop: 5, fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>
                    vs {formatValue(totalValue)} total population
                </div>
            </div>
        </div>
    );
};

// ─── Retention bars ───────────────────────────────────────────────────────────

const RetentionBars = ({ audiencePct, totalPct }: { audiencePct: number; totalPct: number }) => {
    const diff = audiencePct - totalPct;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            {[
                { label: 'In audience',       pct: audiencePct, color: C.primary80 },
                { label: 'Total population',  pct: totalPct,    color: C.neutral150 },
            ].map(row => (
                <div key={row.label}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190 }}>{row.label}</span>
                        <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: C.neutral240 }}>{row.pct.toFixed(1)}%</span>
                    </div>
                    <div style={{ height: 10, background: C.neutral60, borderRadius: 5, overflow: 'hidden' }}>
                        <div style={{
                            height: '100%', width: `${row.pct}%`,
                            background: row.color, borderRadius: 5,
                            transition: 'width 0.6s ease',
                        }} />
                    </div>
                </div>
            ))}
            {diff > 0 && (
                <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 5, padding: '3px 8px', borderRadius: 4, background: C.success20, border: `1px solid ${C.success30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.success90 }}>
                    +{diff.toFixed(1)} pp above population average
                </div>
            )}
        </div>
    );
};

// ─── Shimmer skeleton ─────────────────────────────────────────────────────────

const SkeletonBlock = ({ w, h, radius = 4 }: { w: number | string; h: number; radius?: number }) => (
    <div style={{ ...SHIMMER_STYLE, width: w, height: h, borderRadius: radius, flexShrink: 0 }} />
);

// ─── Card frame ───────────────────────────────────────────────────────────────

interface CardFrameProps {
    title: string;
    tooltip: string;
    openQuestion?: boolean;
    children: React.ReactNode;
}

const CardFrame = ({ title, tooltip, openQuestion, children }: CardFrameProps) => (
    <div style={{
        background: C.neutral10,
        border: openQuestion ? `1.5px dashed ${C.neutral100}` : `1px solid ${C.neutral60}`,
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: openQuestion ? 'none' : SHADOW.extraSmall,
        display: 'flex', flexDirection: 'column',
        flex: '1 1 0',
        minWidth: 260,
        animation: 'ri-fade-in 0.25s ease',
    }}>
        {/* Header */}
        <div style={{ padding: '12px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${openQuestion ? C.neutral60 : C.neutral60}` }}>
            <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: openQuestion ? C.neutral150 : C.neutral240 }}>{title}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {openQuestion && (
                    <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: C.warning100, background: C.warning10, border: `1px solid ${C.warning30}`, borderRadius: 4, padding: '1px 5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Scope open question
                    </span>
                )}
                <InfoIcon tooltip={tooltip} />
            </div>
        </div>
        {/* Body */}
        <div style={{ padding: '16px', flex: 1 }}>
            {children}
        </div>
    </div>
);

// ─── Individual metric cards ──────────────────────────────────────────────────

const CustomersCard = ({ loading, error, onRetry }: { loading?: boolean; error?: boolean; onRetry?: () => void }) => {
    if (loading) return (
        <CardFrame title="Number of customers" tooltip="Total number of identified customers matching the audience criteria, compared to the full Raptor CDP population.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <SkeletonBlock w="60%" h={26} />
                <SkeletonBlock w="40%" h={12} />
                <SkeletonBlock w="100%" h={10} radius={5} />
                <SkeletonBlock w="55%" h={12} />
            </div>
        </CardFrame>
    );
    if (error) return (
        <CardFrame title="Number of customers" tooltip="Total number of identified customers matching the audience criteria, compared to the full Raptor CDP population.">
            <ErrorCardBody onRetry={onRetry} />
        </CardFrame>
    );
    return (
        <CardFrame title="Number of customers" tooltip="Total number of identified customers matching the audience criteria, compared to the full Raptor CDP population.">
            <PopulationBar
                audienceValue={24891}
                totalValue={892340}
                formatValue={v => v.toLocaleString('en-GB')}
            />
        </CardFrame>
    );
};

const ClvCard = ({ loading, error, onRetry }: { loading?: boolean; error?: boolean; onRetry?: () => void }) => {
    if (loading) return (
        <CardFrame title="Total customer lifetime value" tooltip="Sum of CLV for all customers in the audience, compared to the total CLV across the full Raptor CDP population. Currency is set in your Raptor configuration (EUR).">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <SkeletonBlock w="70%" h={26} />
                <SkeletonBlock w="40%" h={12} />
                <SkeletonBlock w="100%" h={10} radius={5} />
                <SkeletonBlock w="60%" h={12} />
            </div>
        </CardFrame>
    );
    if (error) return (
        <CardFrame title="Total customer lifetime value" tooltip="Sum of CLV for all customers in the audience, compared to the total CLV across the full Raptor CDP population. Currency is set in your Raptor configuration (EUR).">
            <ErrorCardBody onRetry={onRetry} />
        </CardFrame>
    );
    return (
        <CardFrame title="Total customer lifetime value" tooltip="Sum of CLV for all customers in the audience, compared to the total CLV across the full Raptor CDP population. Currency is set in your Raptor configuration (EUR).">
            <PopulationBar
                audienceValue={1847320}
                totalValue={12400000}
                formatValue={v => `€${v.toLocaleString('en-GB')}`}
                color={C.success90}
            />
        </CardFrame>
    );
};

const RetentionCard = ({ loading, error, onRetry }: { loading?: boolean; error?: boolean; onRetry?: () => void }) => {
    if (loading) return (
        <CardFrame title="Customer retention rate" tooltip="Percentage of audience customers who made a repeat purchase within the measured window, compared to the overall population retention rate.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SkeletonBlock w="100%" h={10} radius={5} />
                <SkeletonBlock w="75%" h={10} radius={5} />
                <SkeletonBlock w="50%" h={20} radius={4} />
            </div>
        </CardFrame>
    );
    if (error) return (
        <CardFrame title="Customer retention rate" tooltip="Percentage of audience customers who made a repeat purchase within the measured window, compared to the overall population retention rate.">
            <ErrorCardBody onRetry={onRetry} />
        </CardFrame>
    );
    return (
        <CardFrame title="Customer retention rate" tooltip="Percentage of audience customers who made a repeat purchase within the measured window, compared to the overall population retention rate.">
            <RetentionBars audiencePct={68.4} totalPct={41.2} />
        </CardFrame>
    );
};

const GeneralInfoCard = ({ loading }: { loading?: boolean }) => {
    if (loading) return (
        <CardFrame title="General information" tooltip="Transactional metadata for this audience: first transaction, most recent transaction, and the timestamp when Raptor last recomputed audience membership." openQuestion>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <SkeletonBlock w="70%" h={14} />
                <SkeletonBlock w="70%" h={14} />
                <SkeletonBlock w="60%" h={14} />
            </div>
        </CardFrame>
    );
    return (
        <CardFrame title="General information" tooltip="Transactional metadata for this audience: first transaction, most recent transaction, and the timestamp when Raptor last recomputed audience membership." openQuestion>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                    { label: 'First transaction', value: 'March 3, 2024'      },
                    { label: 'Last transaction',  value: 'June 18, 2026'      },
                    { label: 'Last updated',       value: 'Jun 20, 2026 · 10:42' },
                ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: FONT, fontSize: 13, gap: 8 }}>
                        <span style={{ color: C.neutral170 }}>{row.label}</span>
                        <span style={{ color: C.neutral240, fontWeight: 600, flexShrink: 0 }}>{row.value}</span>
                    </div>
                ))}
                <div style={{ marginTop: 6, padding: '8px 10px', background: C.warning10, border: `1px solid ${C.warning30}`, borderRadius: 6, fontFamily: FONT, fontSize: 11, color: C.warning100, lineHeight: 1.4 }}>
                    This card's scope is under review — see Open Question §1 in the shaped spec. It may be added back if the freshness indicator alone is insufficient.
                </div>
            </div>
        </CardFrame>
    );
};

// ─── Error card body (per-card degradation) ───────────────────────────────────

const ErrorCardBody = ({ onRetry }: { onRetry?: () => void }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 100, gap: 10, padding: '8px 0' }}>
        <div style={{ color: C.error80, fill: C.error80 }}>
            <Icon name="alert-error" size={IconSize.Medium} />
        </div>
        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>Unable to load this metric</div>
        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, textAlign: 'center', lineHeight: 1.4 }}>
            The Raptor CDP API did not respond. Other metrics are unaffected.
        </div>
        {onRetry && (
            <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="arrows-reload" onClick={onRetry}>
                Retry
            </Button>
        )}
    </div>
);

// ─── Empty state ──────────────────────────────────────────────────────────────

const EmptyState = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320, gap: 12, padding: '48px 32px' }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: C.neutral30, border: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.neutral150, fill: C.neutral150 }}>
            <Icon name="chart-line" size={IconSize.Large} />
        </div>
        <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: C.neutral240 }}>No insights available</div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral170, textAlign: 'center', lineHeight: 1.6, maxWidth: 380 }}>
            This audience hasn't been synced to Raptor CDP yet, or Raptor has not computed metrics for it. Check back once the audience has been active for at least one processing cycle.
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="arrows-reload" onClick={() => undefined}>Check again</Button>
            <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} onClick={() => undefined}>Read documentation</Button>
        </div>
    </div>
);

// ─── Insights tab ─────────────────────────────────────────────────────────────

const InsightsTab = () => {
    const [viewState, setViewState] = useState<ViewState>('loaded');
    const [clvError, setClvError]   = useState(false);
    const retryTimer                = useRef<ReturnType<typeof setTimeout>>();

    // Error state: CLV card is broken, others load fine (non-blocking degradation)
    useEffect(() => {
        setClvError(viewState === 'error');
    }, [viewState]);

    const handleRetryClv = () => {
        clearTimeout(retryTimer.current);
        setClvError(false);
        // Simulate a successful retry — CLV card goes to loading then loaded
        setViewState('loading');
        retryTimer.current = setTimeout(() => setViewState('loaded'), 1800);
    };

    useEffect(() => () => { clearTimeout(retryTimer.current); }, []);

    const isLoading = viewState === 'loading';
    const isError   = viewState === 'error';
    const isEmpty   = viewState === 'empty';

    return (
        <div style={{ padding: '0 32px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* State toggle — design preview tool */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', background: C.neutral30, border: `1px solid ${C.neutral60}`, borderRadius: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: 4 }}>Preview state:</span>
                {(['loaded', 'loading', 'error', 'empty'] as ViewState[]).map(s => (
                    <button
                        key={s}
                        onClick={() => setViewState(s)}
                        style={{
                            padding: '4px 10px', borderRadius: 6, border: `1px solid ${viewState === s ? C.primary80 : C.neutral70}`,
                            background: viewState === s ? C.primary20 : 'transparent',
                            fontFamily: FONT, fontSize: 12, fontWeight: viewState === s ? 700 : 400,
                            color: viewState === s ? C.primary80 : C.neutral190, cursor: 'pointer',
                        }}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                        {s === 'error' && <span style={{ fontSize: 10, marginLeft: 4, color: C.neutral150 }}>(CLV card)</span>}
                    </button>
                ))}
            </div>

            {/* Insights header bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Raptor CDP source badge */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: C.info10, border: `1px solid ${C.info30}`, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.info100 }}>
                        <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: C.info100 }} />
                        Raptor CDP
                    </div>
                    {!isEmpty && !isLoading && (
                        <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>
                            Last updated: <span style={{ color: C.neutral190, fontWeight: 600 }}>Jun 20, 2026 · 10:42</span>
                        </span>
                    )}
                    {isLoading && (
                        <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>
                            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', border: `2px solid ${C.neutral150}`, borderTopColor: 'transparent', animation: 'ri-spin 0.7s linear infinite', marginRight: 5, verticalAlign: 'middle' }} />
                            Fetching metrics from Raptor CDP…
                        </span>
                    )}
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.primary80, padding: 0 }}>
                    <span>Read documentation</span>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor"><path d="M4.5 1.5H1.5v9h9V7.5M7.5 1.5h3v3M10.5 1.5 5 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
                </button>
            </div>

            {/* Empty state */}
            {isEmpty && <EmptyState />}

            {/* Metric cards */}
            {!isEmpty && (
                <>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <CustomersCard loading={isLoading} error={isError && false} />
                        <ClvCard loading={isLoading} error={clvError} onRetry={handleRetryClv} />
                        <RetentionCard loading={isLoading} error={isError && false} />
                    </div>
                    {/* General information card — open question row */}
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 0', minWidth: 260, maxWidth: 340 }}>
                            <GeneralInfoCard loading={isLoading} />
                        </div>
                        <div style={{ flex: '2 1 0', minWidth: 260, padding: '14px 16px', background: C.neutral30, border: `1px solid ${C.neutral60}`, borderRadius: 10, fontFamily: FONT, fontSize: 13, color: C.neutral170, lineHeight: 1.6 }}>
                            <strong style={{ color: C.neutral240 }}>About these metrics</strong>
                            <br />
                            All figures are computed by Raptor CDP and read directly via the existing integration. The CMS does not calculate or store these values — they update on Raptor's own schedule. Currency is configured in your Raptor account (shown: EUR).
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

// ─── Audience Builder tab (simplified, static) ────────────────────────────────

const AudienceBuilderTab = () => (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 10, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.neutral30 }}>
                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 700, color: C.neutral240 }}>Audience definition</span>
                <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, padding: '3px 8px', background: C.neutral40, border: `1px solid ${C.neutral70}`, borderRadius: 4 }}>Match: ALL conditions</span>
                </div>
            </div>
            <div style={{ padding: '16px' }}>
                {[
                    { label: 'Loyalty tier',    value: 'Gold, Platinum',    icon: 'tags'           },
                    { label: 'Last purchase',   value: 'within 90 days',    icon: 'calendar'       },
                    { label: 'Age range',       value: '25 – 54 years',     icon: 'form-check-list'},
                    { label: 'Location',        value: 'European Union',    icon: 'content-tree'   },
                    { label: 'Avg. order value',value: '> €150',            icon: 'chart-line'     },
                ].map((rule, i) => (
                    <div key={rule.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < 4 ? `1px solid ${C.neutral60}` : 'none' }}>
                        <div style={{ color: C.primary80, fill: C.primary80, flexShrink: 0 }}>
                            <Icon name={rule.icon} size={IconSize.Small} />
                        </div>
                        <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190, flex: 1 }}>{rule.label}</span>
                        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240, background: C.primary20, border: `1px solid ${C.primary30}`, borderRadius: 4, padding: '2px 8px' }}>{rule.value}</span>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150 }}>
                            <Icon name="remove" size={IconSize.Small} />
                        </button>
                    </div>
                ))}
            </div>
            <div style={{ padding: '10px 16px', borderTop: `1px solid ${C.neutral60}`, display: 'flex', gap: 8 }}>
                <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="add" onClick={() => undefined}>Add condition</Button>
                <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} onClick={() => undefined}>Add group</Button>
            </div>
        </div>

        <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 10, padding: '14px 16px', boxShadow: SHADOW.extraSmall }}>
            <div style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Audience size estimate</div>
            <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.neutral240 }}>~24,600</div>
            <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170 }}>estimated customers match these criteria</div>
        </div>
    </div>
);

// ─── Audience detail shell ────────────────────────────────────────────────────

const AudienceShell = () => {
    const [activeTab, setActiveTab] = useState<'builder' | 'insights'>('insights');

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.neutral30 }}>
            {/* Breadcrumb */}
            <div style={{ padding: '8px 32px', display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 13, color: C.neutral170, borderBottom: `1px solid ${C.neutral60}`, background: C.neutral10, flexShrink: 0 }}>
                <span style={{ cursor: 'pointer', color: C.primary80 }}>Audiences</span>
                <span style={{ display: 'inline-flex', transform: 'rotate(-90deg)', color: C.neutral100, fill: C.neutral100 }}><Icon name="arrow-caret-down" size={IconSize.Tiny} /></span>
                <span style={{ color: C.neutral240, fontWeight: 500 }}>Premium Shoppers — Q2 2026</span>
            </div>

            {/* Audience header */}
            <div style={{ background: C.neutral10, flexShrink: 0 }}>
                <div style={{ padding: '14px 32px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ color: C.primary80, fill: C.primary80 }}>
                                <Icon name="tags" size={IconSize.SmallMedium} />
                            </div>
                            <h1 style={{ margin: 0, fontFamily: FONT, fontSize: 20, fontWeight: 700, color: C.neutral240, letterSpacing: '-0.01em' }}>
                                Premium Shoppers — Q2 2026
                            </h1>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                            <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="edit-draft" onClick={() => undefined}>Edit audience</Button>
                            <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="trash" onClick={() => undefined} ariaLabel="Delete audience" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <Tag type={TagType.Info} size={TagSize.Small}>Raptor CDP</Tag>
                        <Tag type={TagType.Neutral} size={TagSize.Small}>5 conditions</Tag>
                        <Tag type={TagGhostType.SuccessGhost} size={TagSize.Small}>Active</Tag>
                    </div>
                </div>

                {/* Tab bar */}
                <div style={{ display: 'flex', paddingLeft: 32, borderBottom: `1px solid ${C.neutral60}`, marginTop: 10 }}>
                    {[
                        { key: 'builder' as const,  label: 'Audience Builder', icon: 'form-check-list' },
                        { key: 'insights' as const, label: 'Insights',         icon: 'chart-line' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: FONT, fontSize: 13,
                                color: activeTab === tab.key ? C.primary80 : C.neutral190,
                                fontWeight: activeTab === tab.key ? 600 : 400,
                                borderBottom: activeTab === tab.key ? `2px solid ${C.primary80}` : '2px solid transparent',
                                marginBottom: -1, whiteSpace: 'nowrap', fill: activeTab === tab.key ? C.primary80 : C.neutral190,
                            }}
                        >
                            <Icon name={tab.icon} size={IconSize.Small} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeTab === 'builder'  && <AudienceBuilderTab />}
                {activeTab === 'insights' && (
                    <div style={{ paddingTop: 20 }}>
                        <InsightsTab />
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Root ──────────────────────────────────────────────────────────────────────

const RaptorAudienceInsightsMockup = () => (
    <div style={{ display: 'flex', height: '100vh', fontFamily: FONT, overflow: 'hidden' }}>
        <style>{ANIM_CSS}</style>
        <LeftRail />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <TopBar />
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <SecondaryNav />
                <AudienceShell />
            </div>
        </div>
    </div>
);

// ─── Storybook ────────────────────────────────────────────────────────────────

const meta: Meta<typeof RaptorAudienceInsightsMockup> = {
    component: RaptorAudienceInsightsMockup,
    title: 'Mockups/Raptor Audience Insights',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof RaptorAudienceInsightsMockup>;

export const Default: Story = {
    name: 'Audience — Insights tab',
};
