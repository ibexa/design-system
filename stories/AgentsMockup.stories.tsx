import React, { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Button, ButtonSize, ButtonType } from '@ids-components/Button';
import { Tag, TagGhostType, TagType, TagSize } from '@ids-components/Tag';
import { Icon, IconSize } from '@ids-components/Icon';
import { InputTextField } from '@ids-components/InputText';
import { ToggleButtonField } from '@ids-components/ToggleButton';
import { CheckboxField } from '@ids-components/Checkbox';
import { DropdownSingleInput } from '@ids-components/Dropdown';

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

// ─── Types ───────────────────────────────────────────────────────────────────

type AgentType = 'translation' | 'seo' | 'geo' | 'content-writer' | 'image-alt' | 'cat-content';
type AgentStatus = 'active' | 'inactive' | 'error';
type ContentNodeType = 'folder' | 'landing-page' | 'article' | 'blog-post' | 'media-folder';
type ScopeRuleKind = 'content-type' | 'location-prefix';

interface ContentNode {
    id: string;
    name: string;
    type: ContentNodeType;
    children?: ContentNode[];
}

interface ScopeRule {
    id: string;
    kind: ScopeRuleKind;
    value: string;
    label: string;
}

interface Agent {
    id: number;
    name: string;
    type: AgentType;
    typeLabel: string;
    status: AgentStatus;
    description: string;
    model: string;
    icon: string;
    sourceId: string;
    sourcePlatform: string;
    scopeNodes: string[];
    scopeRules: ScopeRule[];
    activityCount: number;
    lastActivityLabel: string;
}

interface AgentBlueprint {
    id: string;
    name: string;
    type: AgentType;
    typeLabel: string;
    description: string;
    model: string;
    icon: string;
    copies: number;
}

type ActivityKind = 'draft-created' | 'batch-draft' | 'overlap-detected' | 'review';

interface ChildItem {
    id: string;
    name: string;
    type: ContentNodeType;
    path: string;
    draftId: string;
    fieldsSummary?: string;
}

interface OverlapDetails {
    otherSource: string;
    yourDraftId?: string;
    theirDraftId?: string;
    conflictingFields: string[];
    yourLastEditLabel: string;
    theirLastEditLabel: string;
}

interface ActivityEntry {
    id: string;
    agentId: number;
    kind?: ActivityKind;
    contentItemName: string;
    contentItemType: ContentNodeType;
    contentItemPath: string;
    action: string;
    triggeredBy: string;
    triggeredByInitials: string;
    isCurrentUser: boolean;
    hasConflict: boolean;
    restricted?: boolean;
    relativeTime: string;
    dayGroup: string;
    preview?: string;
    affectedFields?: string[];
    draftId?: string;
    childItems?: ChildItem[];
    childrenTotal?: number;
    reviewScore?: number;
    reviewVerdict?: 'approved' | 'rejected';
    overlapDetails?: OverlapDetails;
}

// ─── Lookup maps ─────────────────────────────────────────────────────────────

const TYPE_TAG: Record<AgentType, TagType> = {
    translation:      TagType.PrimaryAlt,
    seo:              TagType.Info,
    geo:              TagType.Primary,
    'content-writer': TagType.Warning,
    'image-alt':      TagType.Neutral,
    'cat-content':    TagType.Success,
};

const STATUS_TAG: Record<AgentStatus, TagGhostType> = {
    active:   TagGhostType.SuccessGhost,
    inactive: TagGhostType.NeutralGhost,
    error:    TagGhostType.ErrorGhost,
};

const STATUS_LABEL: Record<AgentStatus, string> = {
    active:   'Active',
    inactive: 'Inactive',
    error:    'Error',
};

const CONTENT_NODE_ICON: Record<ContentNodeType, string> = {
    folder:         'list-content',
    'landing-page': 'notes-list',
    article:        'edit-draft',
    'blog-post':    'edit-draft',
    'media-folder': 'mountain',
};

// ─── Mock data ───────────────────────────────────────────────────────────────

const CONTENT_TREE: ContentNode[] = [
    {
        id: 'root', name: 'Ibexa Digital Experience Platform', type: 'landing-page',
        children: [
            {
                id: 'blog', name: 'Blog', type: 'folder',
                children: [
                    { id: 'blog-1', name: 'AI-Powered Content Discovery', type: 'article' },
                    { id: 'blog-2', name: 'Design System v2.0 Released', type: 'article' },
                    { id: 'blog-3', name: 'Getting Started with Ibexa DXP', type: 'blog-post' },
                ],
            },
            {
                id: 'products', name: 'Products', type: 'folder',
                children: [
                    { id: 'prod-1', name: 'Ibexa DXP', type: 'landing-page' },
                    { id: 'prod-2', name: 'Ibexa Commerce', type: 'landing-page' },
                ],
            },
            {
                id: 'media', name: 'Media Library', type: 'media-folder',
                children: [
                    { id: 'media-1', name: 'Hero Images', type: 'media-folder' },
                    { id: 'media-2', name: 'Product Screenshots', type: 'media-folder' },
                ],
            },
            {
                id: 'about', name: 'About', type: 'folder',
                children: [
                    { id: 'about-1', name: 'Company Overview', type: 'landing-page' },
                ],
            },
        ],
    },
];

const MOCK_ACTIVITY: ActivityEntry[] = [
    // ─── TODAY ─────────────────────────────────────────────────────────────
    // SEO Optimizer — batch draft creation across 3 articles
    {
        id: 'a1', agentId: 2, kind: 'batch-draft',
        contentItemName: '3 articles updated', contentItemType: 'article', contentItemPath: '/Blog',
        action: 'Created drafts with updated metadata',
        triggeredBy: 'Konrad Oboza', triggeredByInitials: 'KO', isCurrentUser: true, hasConflict: false,
        relativeTime: '2h ago', dayGroup: 'Today',
        affectedFields: ['Meta title', 'Meta description', 'Keywords'],
        childrenTotal: 3,
        childItems: [
            { id: 'a1.1', name: 'AI-Powered Content Discovery', type: 'article', path: '/Blog', draftId: 'draft-2026-06-02-001', fieldsSummary: '3 fields changed' },
            { id: 'a1.2', name: 'Design System v2.0 Released',  type: 'article', path: '/Blog', draftId: 'draft-2026-06-02-002', fieldsSummary: '3 fields changed' },
            { id: 'a1.3', name: 'What\'s new in Cohesivo',       type: 'article', path: '/Blog', draftId: 'draft-2026-06-02-003', fieldsSummary: '2 fields changed' },
        ],
        preview: 'Run summary: 3 articles processed in /Blog. Average meta description length: 156 chars. Keyword density verified against the target term base.',
    },
    // Translation Agent — French translation draft
    {
        id: 'a2', agentId: 1, kind: 'draft-created',
        contentItemName: 'Getting Started with Ibexa DXP', contentItemType: 'blog-post', contentItemPath: '/Blog',
        action: 'Created French translation draft',
        triggeredBy: 'Konrad Oboza', triggeredByInitials: 'KO', isCurrentUser: true, hasConflict: false,
        relativeTime: '4h ago', dayGroup: 'Today',
        affectedFields: ['Title (FR)', 'Body (FR)', 'Summary (FR)'],
        draftId: 'draft-2026-06-02-005',
        preview: 'Traduit vers le français. 1 240 mots traités. Formatage et contexte culturel préservés. Termes du glossaire alignés avec la base terminologique de l\'entreprise.',
    },
    // Cat Validator — approved
    {
        id: 'cat1', agentId: 6, kind: 'review',
        contentItemName: 'AI-Powered Content Discovery', contentItemType: 'article', contentItemPath: '/Blog',
        action: 'Reviewed and approved 🐾',
        triggeredBy: 'Konrad Oboza', triggeredByInitials: 'KO', isCurrentUser: true, hasConflict: false,
        relativeTime: '1h ago', dayGroup: 'Today',
        reviewScore: 94,
        reviewVerdict: 'approved',
        preview: 'Purrfection score: 94/100 🐱\nCat pun density: optimal (2.3 per 100 words)\nMissing: at least one mention of a warm lap or cardboard box\nVerdict: APPROVED — would knock off shelf with confidence',
    },
    // Cat Validator — rejected
    {
        id: 'cat2', agentId: 6, kind: 'review',
        contentItemName: 'Design System v2.0 Released', contentItemType: 'article', contentItemPath: '/Blog',
        action: 'Rejected — insufficient cat energy',
        triggeredBy: 'Konrad Oboza', triggeredByInitials: 'KO', isCurrentUser: true, hasConflict: true,
        relativeTime: '3h ago', dayGroup: 'Today',
        reviewScore: 12,
        reviewVerdict: 'rejected',
        preview: 'Purrfection score: 12/100 😾\nFatal issues detected:\n  • Zero mentions of cats, whiskers, or 3am zoomies\n  • "Component tokens" sounds like a treat but is not\n  • Hero image contains a dog (UNACCEPTABLE)\nVerdict: REJECTED — will sit on keyboard until fixed',
    },

    // ─── YESTERDAY ─────────────────────────────────────────────────────────
    // SEO Optimizer — overlap detected (rich expandable panel)
    {
        id: 'a3', agentId: 2, kind: 'overlap-detected',
        contentItemName: 'Ibexa DXP', contentItemType: 'landing-page', contentItemPath: '/Products',
        action: 'Created draft conflicting with your earlier edit',
        triggeredBy: 'Maria Kowalski', triggeredByInitials: 'MK', isCurrentUser: false, hasConflict: true,
        relativeTime: '1d ago', dayGroup: 'Yesterday',
        affectedFields: ['Meta title', 'Meta description'],
        draftId: 'draft-2026-06-01-014',
        overlapDetails: {
            otherSource: 'Your manual edit',
            yourDraftId: 'draft-2026-05-30-099',
            theirDraftId: 'draft-2026-06-01-014',
            conflictingFields: ['Meta title', 'Meta description'],
            yourLastEditLabel: '3 days ago',
            theirLastEditLabel: '1 day ago',
        },
    },
    // Translation Agent — German draft (also flagged conflict, no rich panel)
    {
        id: 'a4', agentId: 1, kind: 'draft-created',
        contentItemName: 'Ibexa DXP', contentItemType: 'landing-page', contentItemPath: '/Products',
        action: 'Created German translation draft',
        triggeredBy: 'Admin', triggeredByInitials: 'AD', isCurrentUser: false, hasConflict: true,
        relativeTime: '1d ago', dayGroup: 'Yesterday',
        affectedFields: ['Title (DE)', 'Body (DE)', 'CTA (DE)'],
        draftId: 'draft-2026-06-01-015',
        preview: 'Ins Deutsche übersetzt. 890 Wörter verarbeitet. Lokalisierung für DE/AT/CH berücksichtigt. Formelle Anrede beibehalten.',
    },
    // Cat Validator — approved (Maria)
    {
        id: 'cat3', agentId: 6, kind: 'review',
        contentItemName: 'Getting Started with Ibexa DXP', contentItemType: 'blog-post', contentItemPath: '/Blog',
        action: 'Reviewed and approved 🐾',
        triggeredBy: 'Maria Kowalski', triggeredByInitials: 'MK', isCurrentUser: false, hasConflict: false,
        relativeTime: '1d ago', dayGroup: 'Yesterday',
        reviewScore: 78,
        reviewVerdict: 'approved',
        preview: 'Purrfection score: 78/100 😸\nHighlights:\n  • "Step-by-step" resonates with cats stalking prey\n  • "Under 30 minutes" — exactly one nap cycle, very relatable\nSuggestion: rename "Quick Start" to "Quick Snack"\nVerdict: APPROVED — reluctantly, while ignoring the author',
    },

    // ─── 20 MAY ────────────────────────────────────────────────────────────
    // Image Alt Text — large batch (14 images, partial child list)
    {
        id: 'a7', agentId: 5, kind: 'batch-draft',
        contentItemName: '14 images in Hero Images', contentItemType: 'media-folder', contentItemPath: '/Media Library/Hero Images',
        action: 'Generated descriptive alt text',
        triggeredBy: 'Konrad Oboza', triggeredByInitials: 'KO', isCurrentUser: true, hasConflict: false,
        relativeTime: '2d ago', dayGroup: '20 May',
        affectedFields: ['Alt text'],
        childrenTotal: 14,
        childItems: [
            { id: 'a7.1', name: 'hero-enterprise.jpg',      type: 'media-folder', path: '/Media Library/Hero Images', draftId: 'draft-2026-05-31-101' },
            { id: 'a7.2', name: 'hero-smb.jpg',             type: 'media-folder', path: '/Media Library/Hero Images', draftId: 'draft-2026-05-31-102' },
            { id: 'a7.3', name: 'hero-mobile.jpg',          type: 'media-folder', path: '/Media Library/Hero Images', draftId: 'draft-2026-05-31-103' },
            { id: 'a7.4', name: 'hero-customer-acme.jpg',   type: 'media-folder', path: '/Media Library/Hero Images', draftId: 'draft-2026-05-31-104' },
            { id: 'a7.5', name: 'hero-customer-globex.jpg', type: 'media-folder', path: '/Media Library/Hero Images', draftId: 'draft-2026-05-31-105' },
        ],
        preview: 'Average alt-text length: 12 words. All images passed accessibility score ≥ 90. WCAG 2.1 AA compliance verified.',
    },

    // ─── 19 MAY ────────────────────────────────────────────────────────────
    // Content Writer — full article draft
    {
        id: 'a8', agentId: 4, kind: 'draft-created',
        contentItemName: 'AI-Powered Content Discovery', contentItemType: 'article', contentItemPath: '/Blog',
        action: 'Generated full article draft',
        triggeredBy: 'Konrad Oboza', triggeredByInitials: 'KO', isCurrentUser: true, hasConflict: false,
        relativeTime: '3d ago', dayGroup: '19 May',
        affectedFields: ['Title', 'Body', 'Summary', 'Hero image suggestion'],
        draftId: 'draft-2026-05-31-201',
        preview: '850-word draft created. Topics: AI recommendation engines, semantic search, content tagging automation. Brand voice: professional, accessible. Reading level: grade 9.',
    },
    // SEO — restricted entry
    {
        id: 'a9', agentId: 2, kind: 'draft-created',
        contentItemName: 'Internal Pricing Strategy 2026', contentItemType: 'article', contentItemPath: '/Restricted/Finance',
        action: 'Created draft',
        triggeredBy: 'Admin', triggeredByInitials: 'AD', isCurrentUser: false, hasConflict: false, restricted: true,
        relativeTime: '3d ago', dayGroup: '19 May',
    },

    // ─── 18 MAY ────────────────────────────────────────────────────────────
    // Translation — restricted
    {
        id: 'a10', agentId: 1, kind: 'draft-created',
        contentItemName: 'Partner NDA Template v3', contentItemType: 'landing-page', contentItemPath: '/Restricted/Legal',
        action: 'Created French translation draft',
        triggeredBy: 'Legal Bot', triggeredByInitials: 'LB', isCurrentUser: false, hasConflict: false, restricted: true,
        relativeTime: '4d ago', dayGroup: '18 May',
    },
];

const INITIAL_AGENTS: Agent[] = [
    {
        id: 1, name: 'Translation Agent', type: 'translation', typeLabel: 'Translation', status: 'active',
        description: 'Automatically translates content to configured target languages using AI, preserving formatting and context.',
        model: 'claude-sonnet-4-6', icon: 'arrows-right-and-left',
        sourceId: 'orch-trl-001', sourcePlatform: 'Ibexa Orchestration',
        scopeNodes: ['blog', 'prod-1'],
        scopeRules: [{ id: 'r1', kind: 'content-type', value: 'article', label: 'Article' }],
        activityCount: 24, lastActivityLabel: '4h ago',
    },
    {
        id: 2, name: 'SEO Optimizer', type: 'seo', typeLabel: 'SEO', status: 'active',
        description: 'Generates meta titles, descriptions and keyword suggestions to improve organic search rankings.',
        model: 'claude-sonnet-4-6', icon: 'chart-line',
        sourceId: 'orch-seo-002', sourcePlatform: 'Ibexa Orchestration',
        scopeNodes: ['blog', 'blog-1', 'blog-2', 'prod-1'],
        scopeRules: [],
        activityCount: 12, lastActivityLabel: '2h ago',
    },
    {
        id: 3, name: 'GEO Personalization Agent', type: 'geo', typeLabel: 'GEO', status: 'inactive',
        description: 'Tailors content based on visitor geolocation, adapting language, currency and regional references.',
        model: 'claude-sonnet-4-6', icon: 'world-settings',
        sourceId: 'orch-geo-003', sourcePlatform: 'Ibexa Orchestration',
        scopeNodes: [], scopeRules: [],
        activityCount: 0, lastActivityLabel: 'Never',
    },
    {
        id: 4, name: 'Content Writer', type: 'content-writer', typeLabel: 'Content', status: 'active',
        description: 'Drafts new content based on a brief, matching the brand voice and target audience profile.',
        model: 'claude-opus-4-7', icon: 'edit-draft',
        sourceId: 'orch-cw-004', sourcePlatform: 'Ibexa Orchestration',
        scopeNodes: ['blog'],
        scopeRules: [{ id: 'r2', kind: 'content-type', value: 'article', label: 'Article' }],
        activityCount: 8, lastActivityLabel: '3d ago',
    },
    {
        id: 5, name: 'Image Alt Text', type: 'image-alt', typeLabel: 'Accessibility', status: 'error',
        description: 'Generates descriptive, accessible alt text for images in the media library automatically on upload.',
        model: 'claude-haiku-4-5', icon: 'mountain',
        sourceId: 'orch-alt-005', sourcePlatform: 'Ibexa Orchestration',
        scopeNodes: ['media', 'media-1'],
        scopeRules: [{ id: 'r3', kind: 'content-type', value: 'media-folder', label: 'Media Folder' }],
        activityCount: 31, lastActivityLabel: '2d ago',
    },
    {
        id: 6, name: 'Purrfect Content Validator', type: 'cat-content', typeLabel: 'Cat QA', status: 'active',
        description: 'Rigorously validates all content for feline relevance, cat pun density, and absence of dogs. Rejects anything that wouldn\'t interest a cat at 3am.',
        model: 'claude-haiku-4-5', icon: 'form-check-list',
        sourceId: 'orch-cat-006', sourcePlatform: 'Ibexa Orchestration',
        scopeNodes: ['blog', 'blog-1', 'blog-2', 'blog-3'],
        scopeRules: [{ id: 'r4', kind: 'content-type', value: 'article', label: 'Article' }],
        activityCount: 3, lastActivityLabel: '1h ago',
    },
];

const AGENT_BLUEPRINTS: AgentBlueprint[] = [
    { id: 'bp-trl', name: 'Translation Agent', type: 'translation', typeLabel: 'Translation', model: 'claude-sonnet-4-6', icon: 'arrows-right-and-left', copies: 1, description: 'Translates content to configured target languages, preserving formatting and cultural context.' },
    { id: 'bp-seo', name: 'SEO Optimizer', type: 'seo', typeLabel: 'SEO', model: 'claude-sonnet-4-6', icon: 'chart-line', copies: 1, description: 'Generates optimised meta titles, descriptions and keyword suggestions for content items.' },
    { id: 'bp-geo', name: 'GEO Personalization', type: 'geo', typeLabel: 'GEO', model: 'claude-sonnet-4-6', icon: 'world-settings', copies: 1, description: 'Adapts content for visitor geolocation — language, currency, and regional references.' },
    { id: 'bp-cw',  name: 'Content Writer', type: 'content-writer', typeLabel: 'Content', model: 'claude-opus-4-7', icon: 'edit-draft', copies: 1, description: 'Generates content drafts from a brief, matching brand voice and audience profile.' },
    { id: 'bp-alt', name: 'Image Alt Text', type: 'image-alt', typeLabel: 'Accessibility', model: 'claude-haiku-4-5', icon: 'mountain', copies: 1, description: 'Generates WCAG-compliant alt text for media library images automatically on upload.' },
    { id: 'bp-cat', name: 'Purrfect Content Validator', type: 'cat-content', typeLabel: 'Cat QA', model: 'claude-haiku-4-5', icon: 'form-check-list', copies: 1, description: 'Validates content for feline relevance and cat pun density. Rejects anything a cat would knock off a desk.' },
];

const CONTENT_TYPE_OPTIONS = [
    { id: 'article',        label: 'Article' },
    { id: 'landing-page',   label: 'Landing Page' },
    { id: 'blog-post',      label: 'Blog Post' },
    { id: 'folder',         label: 'Folder' },
    { id: 'media-folder',   label: 'Media Folder' },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

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
    <nav
        style={{
            width: 52, minWidth: 52,
            background: C.neutral240,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            zIndex: 10,
        }}
    >
        <div
            style={{
                width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, borderBottom: `1px solid ${C.neutral220}`,
            }}
        >
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

        <button
            title="Settings"
            style={{
                width: '100%', height: 44, background: 'transparent', border: 'none',
                borderLeft: '3px solid transparent', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: C.neutral150, fill: C.neutral150, marginBottom: 8,
            }}
        >
            <Icon name="settings-cog" size={IconSize.SmallMedium} />
        </button>
    </nav>
);

// ─── Top bar ──────────────────────────────────────────────────────────────────

const TopBar = () => (
    <header
        style={{
            height: 52, background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`,
            display: 'flex', alignItems: 'center',
            paddingLeft: 16, paddingRight: 16, gap: 12, flexShrink: 0, zIndex: 5,
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
            <img src="./cohesivo-logo-purple.png" alt="Cohesivo" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: C.neutral240, letterSpacing: '-0.01em' }}>
                Cohesivo
            </span>
        </div>

        <div style={{ width: 1, height: 20, background: C.neutral70, marginRight: 4 }} />

        <div
            style={{
                flex: 1, maxWidth: 380, height: 32,
                background: C.neutral30, border: `1px solid ${C.neutral70}`, borderRadius: 8,
                display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 10, gap: 8,
                color: C.neutral150, fill: C.neutral150, fontFamily: FONT, fontSize: 14,
            }}
        >
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

// ─── Delete modal ─────────────────────────────────────────────────────────────

interface DeleteModalProps {
    agent: Agent;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteModal = ({ agent, onCancel, onConfirm }: DeleteModalProps) => (
    <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(19, 28, 38, 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(2px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
        <div style={{ background: C.neutral10, borderRadius: 12, width: 440, boxShadow: SHADOW.large, overflow: 'hidden' }}>
            <div style={{ background: C.error20, borderBottom: `1px solid ${C.error30}`, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: C.error30, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.error80, fill: C.error80, flexShrink: 0 }}>
                    <Icon name="alert-error" size={IconSize.SmallMedium} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontSize: 15, fontWeight: 700, color: C.neutral240 }}>Delete agent</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.error90, marginTop: 2 }}>This action is permanent and cannot be undone</div>
                </div>
                <img src="./cohesivo-logo-dark.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain', opacity: 0.35 }} />
            </div>

            <div style={{ padding: '20px 20px 8px' }}>
                <p style={{ fontFamily: FONT, fontSize: 14, color: C.neutral190, lineHeight: 1.6, margin: 0 }}>
                    You are about to permanently delete{' '}
                    <strong style={{ color: C.neutral240 }}>&ldquo;{agent.name}&rdquo;</strong>.
                    All scope configuration and activity history for this agent will be removed.
                </p>
                <div style={{ marginTop: 16, padding: '10px 14px', background: C.neutral30, borderRadius: 8, border: `1px solid ${C.neutral60}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ color: C.primary80, fill: C.primary80, flexShrink: 0 }}>
                        <Icon name={agent.icon} size={IconSize.SmallMedium} />
                    </div>
                    <div>
                        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>{agent.name}</div>
                        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170 }}>{agent.sourcePlatform} · {agent.model}</div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <Tag type={TYPE_TAG[agent.type]} size={TagSize.Small}>{agent.typeLabel}</Tag>
                    </div>
                </div>
            </div>

            <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'flex-end', gap: 8, borderTop: `1px solid ${C.neutral60}`, marginTop: 16 }}>
                <Button type={ButtonType.SecondaryAlt} onClick={onCancel}>Cancel</Button>
                <button
                    onClick={onConfirm}
                    style={{ height: 40, padding: '0 16px', background: C.error80, color: C.neutral10, border: 'none', borderRadius: 8, fontFamily: FONT, fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.error90; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = C.error80; }}
                >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.5 4h3a1.5 1.5 0 0 0-3 0ZM7 4a3 3 0 1 1 6 0h4a1 1 0 1 1 0 2h-.564l-1.205 9.638A3 3 0 0 1 12.243 18H7.757a3 3 0 0 1-2.988-2.362L3.564 6H3a1 1 0 0 1 0-2h4Zm1 4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Zm4 1a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V9Z" />
                    </svg>
                    Delete agent
                </button>
            </div>
        </div>
    </div>
);

// ─── Notification ─────────────────────────────────────────────────────────────

const Notification = ({ message, onDismiss }: { message: string; onDismiss: () => void }) => (
    <div
        style={{
            position: 'fixed', top: 16, right: 16, zIndex: 2000,
            background: C.neutral10, border: `1px solid ${C.success30}`, borderLeft: `4px solid ${C.success90}`,
            borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: SHADOW.medium, maxWidth: 360,
            animation: 'ids-slide-in 0.25s ease',
        }}
    >
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

// ─── Content tree picker ──────────────────────────────────────────────────────

interface TreeNodeProps {
    node: ContentNode;
    depth: number;
    selectedIds: Set<string>;
    onToggle: (id: string, checked: boolean) => void;
    expandedIds: Set<string>;
    onToggleExpand: (id: string) => void;
}

const ContentTreeNode = ({ node, depth, selectedIds, onToggle, expandedIds, onToggleExpand }: TreeNodeProps) => {
    const hasChildren = Boolean(node.children?.length);
    const isExpanded = expandedIds.has(node.id);

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, paddingLeft: depth * 16 + 4, height: 32 }}>
                <button
                    onClick={() => hasChildren && onToggleExpand(node.id)}
                    style={{ width: 16, height: 16, flexShrink: 0, background: 'none', border: 'none', cursor: hasChildren ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.neutral150, fill: C.neutral150, padding: 0 }}
                >
                    {hasChildren && (
                        <span style={{ transform: isExpanded ? 'none' : 'rotate(-90deg)', display: 'inline-flex', transition: 'transform 0.15s' }}>
                            <Icon name="arrow-caret-down" size={IconSize.Tiny} />
                        </span>
                    )}
                </button>
                <CheckboxField
                    id={`tree-${node.id}`}
                    name={`tree-${node.id}`}
                    value={node.id}
                    checked={selectedIds.has(node.id)}
                    onChange={(checked: boolean) => onToggle(node.id, checked)}
                    label={
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: FONT, fontSize: 13, color: C.neutral240 }}>
                            <span style={{ color: C.neutral170, fill: C.neutral170, display: 'flex' }}>
                                <Icon name={CONTENT_NODE_ICON[node.type]} size={IconSize.Small} />
                            </span>
                            {node.name}
                        </span>
                    }
                />
            </div>
            {hasChildren && isExpanded && node.children!.map(child => (
                <ContentTreeNode
                    key={child.id}
                    node={child}
                    depth={depth + 1}
                    selectedIds={selectedIds}
                    onToggle={onToggle}
                    expandedIds={expandedIds}
                    onToggleExpand={onToggleExpand}
                />
            ))}
        </div>
    );
};

const ContentTreePicker = ({ selectedIds, onChange }: { selectedIds: string[]; onChange: (ids: string[]) => void }) => {
    const selected = new Set(selectedIds);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(['root', 'blog', 'products', 'media']));

    const handleToggle = (id: string, checked: boolean) => {
        const next = new Set(selected);
        if (checked) next.add(id); else next.delete(id);
        onChange(Array.from(next));
    };

    const handleToggleExpand = (id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    return (
        <div style={{ border: `1px solid ${C.neutral70}`, borderRadius: 8, background: C.neutral10, maxHeight: 280, overflowY: 'auto', padding: '4px 0' }}>
            {CONTENT_TREE.map(node => (
                <ContentTreeNode
                    key={node.id}
                    node={node}
                    depth={0}
                    selectedIds={selected}
                    onToggle={handleToggle}
                    expandedIds={expandedIds}
                    onToggleExpand={handleToggleExpand}
                />
            ))}
        </div>
    );
};

// ─── Rule builder ─────────────────────────────────────────────────────────────

const RuleBuilder = ({ rules, onChange }: { rules: ScopeRule[]; onChange: (rules: ScopeRule[]) => void }) => {
    const [ruleKind, setRuleKind] = useState<ScopeRuleKind>('content-type');
    const [ctValue, setCtValue] = useState('');
    const [locValue, setLocValue] = useState('');

    const addRule = () => {
        if (ruleKind === 'content-type' && ctValue) {
            const opt = CONTENT_TYPE_OPTIONS.find(o => o.id === ctValue);
            if (!opt) return;
            onChange([...rules, { id: `r-${Date.now()}`, kind: 'content-type', value: ctValue, label: opt.label }]);
            setCtValue('');
        } else if (ruleKind === 'location-prefix' && locValue.trim()) {
            onChange([...rules, { id: `r-${Date.now()}`, kind: 'location-prefix', value: locValue.trim(), label: locValue.trim() }]);
            setLocValue('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 2, padding: 2, background: C.neutral40, borderRadius: 8, alignSelf: 'flex-start' }}>
                {([['content-type', 'By content type'], ['location-prefix', 'By location']] as [ScopeRuleKind, string][]).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setRuleKind(key)}
                        style={{ padding: '5px 12px', borderRadius: 6, border: 'none', background: ruleKind === key ? C.neutral10 : 'transparent', boxShadow: ruleKind === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', color: ruleKind === key ? C.neutral240 : C.neutral170, fontFamily: FONT, fontSize: 13, fontWeight: ruleKind === key ? 600 : 400, cursor: 'pointer' }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                {ruleKind === 'content-type' ? (
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240, marginBottom: 6 }}>Content type</div>
                        <DropdownSingleInput
                            name="rule-ct"
                            value={ctValue}
                            items={[{ id: '', label: 'Select content type…' }, ...CONTENT_TYPE_OPTIONS]}
                            onChange={setCtValue}
                        />
                    </div>
                ) : (
                    <div style={{ flex: 1 }}>
                        <InputTextField
                            id="rule-loc" name="rule-loc" label="Location prefix"
                            value={locValue}
                            helperText="e.g. /Blog or /Products/Ibexa DXP"
                            onChange={setLocValue}
                        />
                    </div>
                )}
                <div style={{ paddingBottom: ruleKind === 'location-prefix' ? 22 : 0 }}>
                    <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="add" onClick={addRule}>
                        Add rule
                    </Button>
                </div>
            </div>

            {rules.length > 0 && (
                <div>
                    <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
                        Active rules
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {rules.map(rule => (
                            <div
                                key={rule.id}
                                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px 4px 10px', background: rule.kind === 'content-type' ? C.primary20 : C.neutral40, border: `1px solid ${rule.kind === 'content-type' ? C.primary30 : C.neutral70}`, borderRadius: 16, fontFamily: FONT, fontSize: 12, color: rule.kind === 'content-type' ? C.primary80 : C.neutral190, fontWeight: 500 }}
                            >
                                <Icon name={rule.kind === 'content-type' ? 'notes-list' : 'list-content'} size={IconSize.Tiny} />
                                {rule.label}
                                <button
                                    onClick={() => onChange(rules.filter(r => r.id !== rule.id))}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'inherit', fill: 'currentColor', padding: 0, opacity: 0.7 }}
                                >
                                    <Icon name="remove" size={IconSize.Tiny} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Scope panel ──────────────────────────────────────────────────────────────

interface ScopePanelProps {
    scopeNodes: string[];
    scopeRules: ScopeRule[];
    onScopeNodesChange: (ids: string[]) => void;
    onScopeRulesChange: (rules: ScopeRule[]) => void;
}

const ScopePanel = ({ scopeNodes, scopeRules, onScopeNodesChange, onScopeRulesChange }: ScopePanelProps) => {
    const [mode, setMode] = useState<'nodes' | 'rules'>(scopeRules.length > 0 && scopeNodes.length === 0 ? 'rules' : 'nodes');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <SectionHeading icon="content-tree" title="Content scope" />
                <div style={{ display: 'flex', gap: 2, padding: 2, background: C.neutral40, borderRadius: 8 }}>
                    {([['nodes', 'Specific content'], ['rules', 'By rules']] as ['nodes' | 'rules', string][]).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setMode(key)}
                            style={{ padding: '5px 12px', borderRadius: 6, border: 'none', background: mode === key ? C.neutral10 : 'transparent', boxShadow: mode === key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', color: mode === key ? C.neutral240 : C.neutral170, fontFamily: FONT, fontSize: 13, fontWeight: mode === key ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {mode === 'nodes' ? (
                <div>
                    <ContentTreePicker selectedIds={scopeNodes} onChange={onScopeNodesChange} />
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 8 }}>
                        {scopeNodes.length > 0
                            ? `${scopeNodes.length} item${scopeNodes.length !== 1 ? 's' : ''} selected`
                            : 'No items selected — agent will not process any content'}
                    </div>
                </div>
            ) : (
                <RuleBuilder rules={scopeRules} onChange={onScopeRulesChange} />
            )}
        </div>
    );
};

// ─── Activity feed ────────────────────────────────────────────────────────────

const ActivityEntryCard = ({ entry, isExpanded, onToggleExpand }: { entry: ActivityEntry; isExpanded: boolean; onToggleExpand: () => void }) => {
    const isRestricted = Boolean(entry.restricted);
    const kind = entry.kind ?? 'draft-created';
    const isBatch = kind === 'batch-draft';
    const isOverlap = kind === 'overlap-detected';
    const isReview = kind === 'review';
    const isReviewRejected = isReview && entry.reviewVerdict === 'rejected';

    const borderLeftColor =
        isRestricted ? C.neutral100 :
        isOverlap ? C.warning100 :
        isReviewRejected ? C.warning100 :
        entry.hasConflict ? C.warning100 :
        isBatch ? C.primary80 :
        entry.isCurrentUser ? C.success90 :
        C.neutral100;

    const cardBackground =
        isRestricted ? C.neutral30 :
        isOverlap || isReviewRejected || entry.hasConflict ? C.warning10 :
        C.neutral10;

    const cardBorderColor =
        isRestricted ? C.neutral70 :
        isOverlap || isReviewRejected || entry.hasConflict ? C.warning30 :
        C.neutral60;

    const headerIcon =
        isRestricted ? 'form-check-list' :
        isOverlap ? 'alert-error' :
        isBatch ? 'list-content' :
        isReview ? 'form-check-list' :
        CONTENT_NODE_ICON[entry.contentItemType];

    const headerIconColor = isOverlap ? C.warning100 : C.neutral150;

    const hasDetailsRow = !isRestricted && Boolean(
        (entry.affectedFields && entry.affectedFields.length > 0) ||
        (entry.draftId && !isBatch) ||
        isReview
    );

    const canExpand = !isRestricted && Boolean(
        entry.preview ||
        (isBatch && entry.childItems && entry.childItems.length > 0) ||
        (isOverlap && entry.overlapDetails)
    );

    const linkStyle: React.CSSProperties = {
        display: 'inline-flex', alignItems: 'center', gap: 4,
        color: C.primary80, fill: C.primary80,
        fontFamily: FONT, fontSize: 12, fontWeight: 600,
        padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap',
        textDecoration: 'none', cursor: 'pointer', background: 'transparent',
    };

    const shortId = (id?: string) => (id ? id.split('-').slice(-1)[0] : '');

    return (
        <div
            style={{
                background: cardBackground,
                border: `1px solid ${cardBorderColor}`,
                borderLeft: `3px solid ${borderLeftColor}`,
                borderRadius: 8, overflow: 'hidden',
            }}
        >
            {/* HEADER */}
            <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ color: isRestricted ? C.neutral100 : headerIconColor, fill: isRestricted ? C.neutral100 : headerIconColor, flexShrink: 0, marginTop: 2 }}>
                    <Icon name={headerIcon} size={IconSize.SmallMedium} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: isRestricted ? C.neutral150 : C.neutral240, filter: isRestricted ? 'blur(4px)' : 'none', userSelect: isRestricted ? 'none' : 'auto' }}>
                            {entry.contentItemName}
                        </span>
                        {isRestricted ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontFamily: FONT, fontSize: 11, color: C.neutral150, fontWeight: 600, background: C.neutral40, border: `1px solid ${C.neutral70}`, borderRadius: 4, padding: '1px 6px' }}>
                                <Icon name="database-settings" size={IconSize.Tiny} />
                                Restricted
                            </span>
                        ) : (
                            <>
                                <Tag type={TagType.Neutral} size={TagSize.Small}>{entry.contentItemType.replace(/-/g, ' ')}</Tag>
                                {isBatch && (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: FONT, fontSize: 11, color: C.primary80, background: C.primary20, border: `1px solid ${C.primary30}`, borderRadius: 4, padding: '1px 6px', fontWeight: 600 }}>
                                        <Icon name="list-content" size={IconSize.Tiny} />
                                        Batch · {entry.childrenTotal ?? entry.childItems?.length ?? 0} items
                                    </span>
                                )}
                                {isOverlap && (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: FONT, fontSize: 11, color: C.warning100, fontWeight: 600 }}>
                                        <Icon name="alert-error" size={IconSize.Tiny} />
                                        Overlap detected
                                    </span>
                                )}
                                {!isOverlap && entry.hasConflict && (
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontFamily: FONT, fontSize: 11, color: C.warning100, fontWeight: 600 }}>
                                        <Icon name="alert-error" size={IconSize.Tiny} />
                                        Conflict
                                    </span>
                                )}
                                {isReview && typeof entry.reviewScore === 'number' && entry.reviewVerdict && (
                                    <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 4, overflow: 'hidden', border: `1px solid ${entry.reviewVerdict === 'approved' ? C.success30 : C.warning30}` }}>
                                        <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: entry.reviewVerdict === 'approved' ? C.success90 : C.warning100, background: entry.reviewVerdict === 'approved' ? C.success30 : C.warning10, padding: '2px 7px', letterSpacing: '0.04em' }}>
                                            {entry.reviewVerdict === 'approved' ? 'APPROVED' : 'REJECTED'}
                                        </span>
                                        <span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: C.neutral240, background: C.neutral10, padding: '2px 7px' }}>
                                            {entry.reviewScore}/100
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: isRestricted ? C.neutral150 : C.neutral190, marginTop: 3 }}>
                        {entry.action}
                        {' · '}
                        <span style={{ color: isRestricted ? C.neutral150 : entry.isCurrentUser ? C.neutral190 : C.primary80, fontWeight: isRestricted || entry.isCurrentUser ? 400 : 600 }}>
                            {entry.isCurrentUser ? 'You' : entry.triggeredBy}
                        </span>
                        {' · '}
                        <span style={{ color: C.neutral150 }}>{entry.relativeTime}</span>
                        {!isRestricted && <span style={{ color: C.neutral100 }}> · {entry.contentItemPath}</span>}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: isRestricted ? C.neutral80 : entry.isCurrentUser ? C.primary80 : C.neutral170, color: C.neutral10, fontFamily: FONT, fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, filter: isRestricted ? 'blur(3px)' : 'none' }}>
                        {entry.triggeredByInitials}
                    </div>
                    {canExpand && (
                        <button
                            onClick={onToggleExpand}
                            title={isExpanded ? 'Hide details' : 'Show details'}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: C.neutral150, fill: C.neutral150, borderRadius: 4 }}
                        >
                            <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', display: 'inline-flex', transition: 'transform 0.15s' }}>
                                <Icon name="arrow-caret-down" size={IconSize.Small} />
                            </span>
                        </button>
                    )}
                </div>
            </div>

            {/* DETAILS ROW — always visible (when applicable) */}
            {hasDetailsRow && (
                <div style={{ padding: '8px 14px', borderTop: `1px solid ${cardBorderColor}`, background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {entry.affectedFields && entry.affectedFields.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
                                <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, fontWeight: 500, marginRight: 2 }}>Updated:</span>
                                {entry.affectedFields.map((f, i) => (
                                    <span key={`${f}-${i}`} style={{ fontFamily: FONT, fontSize: 11, color: C.primary80, background: C.primary20, border: `1px solid ${C.primary30}`, borderRadius: 4, padding: '1px 6px', fontWeight: 500 }}>
                                        {f}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    {entry.draftId && !isBatch && (
                        <a href="#" onClick={(e) => e.preventDefault()} style={linkStyle}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = C.primary20; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                        >
                            <Icon name="edit" size={IconSize.Tiny} />
                            <span>Open draft #{shortId(entry.draftId)}</span>
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                                <path d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"/>
                            </svg>
                        </a>
                    )}
                    {isReview && (
                        <a href="#" onClick={(e) => e.preventDefault()} style={linkStyle}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = C.primary20; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                        >
                            <Icon name="notes-list" size={IconSize.Tiny} />
                            <span>Open content for review</span>
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                                <path d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"/>
                            </svg>
                        </a>
                    )}
                </div>
            )}

            {/* EXPANDED CONTENT */}
            {isExpanded && !isRestricted && (
                <div style={{ borderTop: `1px solid ${cardBorderColor}`, background: C.neutral30 }}>
                    {/* BATCH children list */}
                    {isBatch && entry.childItems && entry.childItems.length > 0 && (
                        <div style={{ padding: '12px 14px' }}>
                            <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
                                Items in this batch ({entry.childItems.length}{entry.childrenTotal && entry.childrenTotal > entry.childItems.length ? ` of ${entry.childrenTotal}` : ''})
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {entry.childItems.map(child => (
                                    <div key={child.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 6 }}>
                                        <div style={{ color: C.neutral170, fill: C.neutral170, flexShrink: 0 }}>
                                            <Icon name={CONTENT_NODE_ICON[child.type]} size={IconSize.Small} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 500, color: C.neutral240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {child.name}
                                            </div>
                                            <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, marginTop: 1 }}>
                                                {child.path}{child.fieldsSummary ? ` · ${child.fieldsSummary}` : ''}
                                            </div>
                                        </div>
                                        <a href="#" onClick={(e) => e.preventDefault()} style={linkStyle}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = C.primary20; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                                        >
                                            <Icon name="edit" size={IconSize.Tiny} />
                                            <span>Open draft #{shortId(child.draftId)}</span>
                                            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                                                <path d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z"/>
                                            </svg>
                                        </a>
                                    </div>
                                ))}
                                {entry.childrenTotal && entry.childrenTotal > entry.childItems.length && (
                                    <button onClick={() => undefined} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '8px 10px', background: 'transparent', border: `1px dashed ${C.neutral70}`, borderRadius: 6, color: C.primary80, fill: C.primary80, fontFamily: FONT, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                        <Icon name="add" size={IconSize.Tiny} />
                                        Show all {entry.childrenTotal} items
                                    </button>
                                )}
                            </div>
                            {entry.preview && (
                                <div style={{ marginTop: 12, padding: '10px 12px', background: C.neutral20, border: `1px solid ${C.neutral60}`, borderRadius: 6, fontFamily: FONT, fontSize: 12, color: C.neutral190, lineHeight: 1.5 }}>
                                    {entry.preview}
                                </div>
                            )}
                        </div>
                    )}

                    {/* OVERLAP rich detail */}
                    {isOverlap && entry.overlapDetails && (
                        <div style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', background: C.warning10, border: `1px solid ${C.warning30}`, borderRadius: 6, marginBottom: 12 }}>
                                <div style={{ color: C.warning100, fill: C.warning100, flexShrink: 0, marginTop: 1 }}>
                                    <Icon name="alert-error" size={IconSize.SmallMedium} />
                                </div>
                                <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral240, lineHeight: 1.5 }}>
                                    This agent run produced a draft that overwrites changes from <strong>{entry.overlapDetails.otherSource}</strong>. The two drafts touch the same fields and one will need to win.
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                                <div style={{ padding: '10px 12px', background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 6 }}>
                                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>This run</div>
                                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>{entry.triggeredBy}</div>
                                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral170, marginTop: 2 }}>
                                        {entry.overlapDetails.theirLastEditLabel}
                                        {entry.overlapDetails.theirDraftId ? ` · #${shortId(entry.overlapDetails.theirDraftId)}` : ''}
                                    </div>
                                </div>
                                <div style={{ padding: '10px 12px', background: C.neutral10, border: `1px solid ${C.success30}`, borderLeft: `3px solid ${C.success90}`, borderRadius: 6 }}>
                                    <div style={{ fontFamily: FONT, fontSize: 10, fontWeight: 700, color: C.success90, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Conflicts with</div>
                                    <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>{entry.overlapDetails.otherSource}</div>
                                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral170, marginTop: 2 }}>
                                        {entry.overlapDetails.yourLastEditLabel}
                                        {entry.overlapDetails.yourDraftId ? ` · #${shortId(entry.overlapDetails.yourDraftId)}` : ''}
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 12 }}>
                                <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                                    Conflicting fields
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                    {entry.overlapDetails.conflictingFields.map(f => (
                                        <span key={f} style={{ fontFamily: FONT, fontSize: 11, color: C.warning100, background: C.warning10, border: `1px solid ${C.warning30}`, borderRadius: 4, padding: '1px 6px', fontWeight: 500 }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <Button type={ButtonType.Primary} size={ButtonSize.Small} icon="form-check-list" onClick={() => undefined}>
                                    Compare drafts
                                </Button>
                                <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} onClick={() => undefined}>
                                    Keep mine
                                </Button>
                                <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} onClick={() => undefined}>
                                    Discard mine
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* DRAFT / REVIEW preview text */}
                    {!isBatch && !isOverlap && entry.preview && (
                        <div style={{ padding: '12px 14px' }}>
                            <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                                {isReview ? 'Review report' : 'Run summary'}
                            </div>
                            <div style={{ padding: '10px 12px', background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 6, fontFamily: 'monospace', fontSize: 12, color: C.neutral190, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                {entry.preview}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Restricted footer */}
            {isRestricted && (
                <div style={{ padding: '8px 14px', borderTop: `1px solid ${C.neutral70}`, background: C.neutral40, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ color: C.neutral150, fill: C.neutral150 }}>
                        <Icon name="database-settings" size={IconSize.Tiny} />
                    </div>
                    <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150 }}>
                        Output hidden — you don't have permission to view this content item
                    </span>
                </div>
            )}
        </div>
    );
};

const ActivityFeed = ({ agentId }: { agentId: number }) => {
    const entries = MOCK_ACTIVITY.filter(e => e.agentId === agentId);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    };

    const conflicts = entries.filter(e => e.hasConflict);

    if (entries.length === 0) {
        return (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
                No outputs recorded yet. Scope this agent to content items to begin.
            </div>
        );
    }

    const groups: { day: string; entries: ActivityEntry[] }[] = [];
    entries.forEach(entry => {
        const existing = groups.find(g => g.day === entry.dayGroup);
        if (existing) existing.entries.push(entry);
        else groups.push({ day: entry.dayGroup, entries: [entry] });
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', gap: 12 }}>
                {[
                    { value: entries.length, label: 'Outputs' },
                    { value: entries.filter(e => e.isCurrentUser).length, label: 'Triggered by you' },
                    { value: conflicts.length, label: 'Conflicts', highlight: conflicts.length > 0 },
                ].map(stat => (
                    <div
                        key={stat.label}
                        style={{ flex: 1, padding: '12px 16px', background: stat.highlight ? C.error10 : C.neutral30, border: `1px solid ${stat.highlight ? C.error30 : C.neutral60}`, borderRadius: 8, textAlign: 'center' }}
                    >
                        <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 700, color: stat.highlight ? C.error80 : C.neutral240 }}>{stat.value}</div>
                        <div style={{ fontFamily: FONT, fontSize: 12, color: stat.highlight ? C.error90 : C.neutral170 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {conflicts.length > 0 && (
                <div style={{ padding: '12px 16px', background: C.warning10, border: `1px solid ${C.warning30}`, borderLeft: `4px solid ${C.warning100}`, borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ color: C.warning100, fill: C.warning100, flexShrink: 0, marginTop: 1 }}>
                        <Icon name="alert-error" size={IconSize.SmallMedium} />
                    </div>
                    <div>
                        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>
                            {conflicts.length} conflict{conflicts.length !== 1 ? 's' : ''} need{conflicts.length === 1 ? 's' : ''} review
                        </div>
                        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190, marginTop: 2 }}>
                            Expand the affected entries below to compare drafts and pick a winning version.
                        </div>
                    </div>
                </div>
            )}

            {groups.map(group => (
                <div key={group.day}>
                    <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>
                        {group.day}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {group.entries.map(entry => (
                            <ActivityEntryCard
                                key={entry.id}
                                entry={entry}
                                isExpanded={expandedIds.has(entry.id)}
                                onToggleExpand={() => toggleExpand(entry.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Create view ─────────────────────────────────────────────────────────────

const STEPS = ['Choose blueprint', 'Configure scope', 'Review & create'];

const StepIndicator = ({ current }: { current: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
        {STEPS.map((label, i) => {
            const num = i + 1;
            const done = num < current;
            const active = num === current;
            return (
                <React.Fragment key={i}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? C.success90 : active ? C.primary80 : C.neutral60, color: C.neutral10, fontFamily: FONT, fontSize: 12, fontWeight: 700 }}>
                            {done ? <Icon name="check-circle" size={IconSize.Tiny} /> : num}
                        </div>
                        <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: active ? 600 : 400, color: active ? C.neutral240 : done ? C.neutral190 : C.neutral150, whiteSpace: 'nowrap' }}>
                            {label}
                        </span>
                    </div>
                    {i < STEPS.length - 1 && (
                        <div style={{ flex: 1, height: 2, background: done ? C.success90 : C.neutral60, margin: '0 12px', minWidth: 20 }} />
                    )}
                </React.Fragment>
            );
        })}
    </div>
);

const BlueprintCard = ({ blueprint, selected, onSelect }: { blueprint: AgentBlueprint; selected: boolean; onSelect: () => void }) => (
    <button
        onClick={onSelect}
        style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 8, cursor: 'pointer', textAlign: 'left', width: '100%', border: `2px solid ${selected ? C.primary80 : C.neutral60}`, background: selected ? C.primary10 : C.neutral10, boxShadow: selected ? `0 0 0 3px ${C.primary30}` : 'none', transition: 'border-color 0.15s, background 0.15s' }}
    >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ color: selected ? C.primary80 : C.neutral170, fill: selected ? C.primary80 : C.neutral170 }}>
                    <Icon name={blueprint.icon} size={IconSize.SmallMedium} />
                </div>
                <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240 }}>{blueprint.name}</span>
            </div>
            <Tag type={TYPE_TAG[blueprint.type]} size={TagSize.Small}>{blueprint.typeLabel}</Tag>
        </div>

        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral190, lineHeight: 1.5 }}>{blueprint.description}</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150 }}>{blueprint.model}</span>
            {blueprint.copies > 0 && (
                <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, background: C.neutral40, border: `1px solid ${C.neutral70}`, borderRadius: 4, padding: '1px 6px' }}>
                    {blueprint.copies} copy active
                </span>
            )}
        </div>
    </button>
);

interface CreateViewProps {
    onCancel: () => void;
    onCreate: (agent: Agent) => void;
    nextId: number;
}

const CreateView = ({ onCancel, onCreate, nextId }: CreateViewProps) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [blueprint, setBlueprint] = useState<AgentBlueprint | null>(null);
    const [agentName, setAgentName] = useState('');
    const [scopeNodes, setScopeNodes] = useState<string[]>([]);
    const [scopeRules, setScopeRules] = useState<ScopeRule[]>([]);

    const selectBlueprint = (bp: AgentBlueprint) => {
        setBlueprint(bp);
        setAgentName(`My ${bp.name}`);
    };

    const handleCreate = () => {
        if (!blueprint) return;
        const agent: Agent = {
            id: nextId,
            name: agentName || blueprint.name,
            type: blueprint.type,
            typeLabel: blueprint.typeLabel,
            status: 'inactive',
            description: blueprint.description,
            model: blueprint.model,
            icon: blueprint.icon,
            sourceId: `orch-${blueprint.type}-${nextId}`,
            sourcePlatform: 'Ibexa Orchestration',
            scopeNodes,
            scopeRules,
            activityCount: 0,
            lastActivityLabel: 'Never',
        };
        onCreate(agent);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Page header */}
            <div style={{ background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ color: C.primary80, fill: C.primary80 }}>
                        <Icon name="add" size={IconSize.Medium} />
                    </div>
                    <div>
                        <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.neutral240, lineHeight: 1.3 }}>Create agent</div>
                        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 2 }}>
                            Cohesivo Administration &rsaquo; AI Agents &rsaquo; Create
                        </div>
                    </div>
                </div>
                <Button type={ButtonType.SecondaryAlt} onClick={onCancel}>Cancel</Button>
            </div>

            {/* Content */}
            <div style={{ padding: 24 }}>
                <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 24, boxShadow: SHADOW.extraSmall }}>
                    <StepIndicator current={step} />

                    {/* Step 1 — choose blueprint */}
                    {step === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <SectionHeading icon="app-www" title="Available from Ibexa Orchestration" />
                            <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral170 }}>
                                Select a predefined agent blueprint. You will personalise its content scope in the next step.
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {AGENT_BLUEPRINTS.map(bp => (
                                    <BlueprintCard
                                        key={bp.id}
                                        blueprint={bp}
                                        selected={blueprint?.id === bp.id}
                                        onSelect={() => selectBlueprint(bp)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2 — name + scope */}
                    {step === 2 && blueprint && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {/* Selected blueprint recap */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: C.neutral30, border: `1px solid ${C.neutral60}`, borderRadius: 8 }}>
                                <div style={{ color: C.primary80, fill: C.primary80 }}>
                                    <Icon name={blueprint.icon} size={IconSize.SmallMedium} />
                                </div>
                                <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>{blueprint.name}</span>
                                <Tag type={TYPE_TAG[blueprint.type]} size={TagSize.Small}>{blueprint.typeLabel}</Tag>
                                <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150, marginLeft: 'auto' }}>{blueprint.model}</span>
                            </div>

                            <InputTextField
                                id="create-agent-name"
                                name="agent-name"
                                label="Agent name"
                                value={agentName}
                                required
                                helperText="Give this copy a name to distinguish it from others"
                                onChange={setAgentName}
                            />

                            <Divider />

                            <ScopePanel
                                scopeNodes={scopeNodes}
                                scopeRules={scopeRules}
                                onScopeNodesChange={setScopeNodes}
                                onScopeRulesChange={setScopeRules}
                            />
                        </div>
                    )}

                    {/* Step 3 — review */}
                    {step === 3 && blueprint && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <SectionHeading icon="form-check-list" title="Review before creating" />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {/* Agent card */}
                                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden' }}>
                                    <div style={{ padding: '8px 14px', background: C.neutral30, borderBottom: `1px solid ${C.neutral60}`, fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                        Agent
                                    </div>
                                    <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ color: C.primary80, fill: C.primary80 }}>
                                            <Icon name={blueprint.icon} size={IconSize.SmallMedium} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240 }}>{agentName || blueprint.name}</div>
                                            <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <img src="./orchestration.png" alt="" style={{ width: 12, height: 12, objectFit: 'contain' }} />
                                                Ibexa Orchestration · {blueprint.model}
                                            </div>
                                        </div>
                                        <Tag type={TYPE_TAG[blueprint.type]} size={TagSize.Small}>{blueprint.typeLabel}</Tag>
                                        <Tag type={TagGhostType.NeutralGhost} size={TagSize.Small}>Inactive</Tag>
                                    </div>
                                </div>

                                {/* Scope card */}
                                <div style={{ border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden' }}>
                                    <div style={{ padding: '8px 14px', background: C.neutral30, borderBottom: `1px solid ${C.neutral60}`, fontFamily: FONT, fontSize: 11, fontWeight: 600, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                        Content scope
                                    </div>
                                    <div style={{ padding: '12px 14px' }}>
                                        {scopeNodes.length === 0 && scopeRules.length === 0 ? (
                                            <span style={{ fontFamily: FONT, fontSize: 13, color: C.neutral150 }}>No scope defined — agent will not process any content until scope is added.</span>
                                        ) : (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                {scopeNodes.length > 0 && (
                                                    <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190 }}>
                                                        <span style={{ fontWeight: 600, color: C.neutral240 }}>{scopeNodes.length}</span> specific content item{scopeNodes.length !== 1 ? 's' : ''} selected
                                                    </div>
                                                )}
                                                {scopeRules.length > 0 && (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                                        {scopeRules.map(r => (
                                                            <span key={r.id} style={{ fontFamily: FONT, fontSize: 12, color: C.primary80, background: C.primary20, border: `1px solid ${C.primary30}`, borderRadius: 4, padding: '2px 8px' }}>
                                                                {r.label}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: `1px solid ${C.neutral60}` }}>
                        <div>
                            {step > 1 && (
                                <Button type={ButtonType.SecondaryAlt} icon="arrow-left" onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}>
                                    Back
                                </Button>
                            )}
                        </div>
                        <div>
                            {step < 3 ? (
                                <Button
                                    type={ButtonType.Primary}
                                    onClick={() => setStep((s) => (s + 1) as 2 | 3)}
                                    icon="arrow-caret-down"
                                >
                                    {step === 1 ? (blueprint ? 'Continue' : 'Select a blueprint first') : 'Review'}
                                </Button>
                            ) : (
                                <Button type={ButtonType.Primary} icon="check-circle" onClick={handleCreate}>
                                    Create agent
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── List view ────────────────────────────────────────────────────────────────

interface ListViewProps {
    agents: Agent[];
    onEdit: (agent: Agent) => void;
    onDelete: (agent: Agent) => void;
    onCreateStart: () => void;
}

const ListView = ({ agents, onEdit, onDelete, onCreateStart }: ListViewProps) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ color: C.primary80, fill: C.primary80 }}>
                    <Icon name="ai" size={IconSize.Medium} />
                </div>
                <div>
                    <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.neutral240, lineHeight: 1.3 }}>AI Agents</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 2 }}>
                        Cohesivo Administration &rsaquo; AI Agents
                    </div>
                </div>
            </div>
            <Button type={ButtonType.Primary} icon="add" onClick={onCreateStart}>Create agent</Button>
        </div>

        <div style={{ padding: 24 }}>
            <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, overflow: 'hidden', boxShadow: SHADOW.extraSmall }}>
                <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 140px 120px 2fr 100px', alignItems: 'center', padding: '0 16px', height: 40, borderBottom: `1px solid ${C.neutral60}`, background: C.neutral30 }}>
                    {['', 'Name', 'Type', 'Status', 'Description', 'Actions'].map(col => (
                        <div key={col} style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: C.neutral170, textTransform: 'uppercase', letterSpacing: '0.04em', padding: '0 8px' }}>
                            {col}
                        </div>
                    ))}
                </div>

                {agents.length === 0 && (
                    <div style={{ padding: '48px 24px', textAlign: 'center', color: C.neutral150, fontFamily: FONT, fontSize: 14 }}>
                        No agents configured yet.
                    </div>
                )}

                {agents.map((agent, idx) => (
                    <AgentRow
                        key={agent.id}
                        agent={agent}
                        isLast={idx === agents.length - 1}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    </div>
);

interface AgentRowProps {
    agent: Agent;
    isLast: boolean;
    onEdit: (agent: Agent) => void;
    onDelete: (agent: Agent) => void;
}

const AgentRow = ({ agent, isLast, onEdit, onDelete }: AgentRowProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            style={{ display: 'grid', gridTemplateColumns: '32px 1fr 140px 120px 2fr 100px', alignItems: 'center', padding: '12px 16px', borderBottom: isLast ? 'none' : `1px solid ${C.neutral60}`, background: hovered ? C.neutral20 : C.neutral10, transition: 'background 0.15s' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.primary80, fill: C.primary80 }}>
                <Icon name={agent.icon} size={IconSize.SmallMedium} />
            </div>

            <div style={{ padding: '0 8px' }}>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240 }}>{agent.name}</div>
                <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 1 }}>{agent.model}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                    <img src="./orchestration.png" alt="" style={{ width: 12, height: 12, objectFit: 'contain' }} />
                    <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150 }}>{agent.sourcePlatform}</span>
                </div>
            </div>

            <div style={{ padding: '0 8px' }}>
                <Tag type={TYPE_TAG[agent.type]} size={TagSize.Small}>{agent.typeLabel}</Tag>
            </div>

            <div style={{ padding: '0 8px' }}>
                <Tag type={STATUS_TAG[agent.status]} size={TagSize.Small}>{STATUS_LABEL[agent.status]}</Tag>
            </div>

            <div style={{ padding: '0 8px' }}>
                <div style={{ fontFamily: FONT, fontSize: 13, color: C.neutral190, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {agent.description}
                </div>
                {agent.activityCount > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                        <span style={{ color: C.neutral150, fill: C.neutral150, display: 'flex' }}>
                            <Icon name="chart-line" size={IconSize.Tiny} />
                        </span>
                        <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150 }}>
                            {agent.activityCount} items processed · {agent.lastActivityLabel}
                        </span>
                    </div>
                ) : (
                    <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral100, marginTop: 4 }}>No activity yet</div>
                )}
            </div>

            <div style={{ padding: '0 8px', display: 'flex', gap: 4 }}>
                <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="edit" onClick={() => onEdit(agent)} ariaLabel={`Edit ${agent.name}`} />
                <Button type={ButtonType.TertiaryAlt} size={ButtonSize.Small} icon="trash" onClick={() => onDelete(agent)} ariaLabel={`Delete ${agent.name}`} />
            </div>
        </div>
    );
};

// ─── Edit view ────────────────────────────────────────────────────────────────

interface EditViewProps {
    agent: Agent;
    onBack: () => void;
    onDelete: (agent: Agent) => void;
}

const EditView = ({ agent, onBack, onDelete }: EditViewProps) => {
    const [activeTab, setActiveTab] = useState<'config' | 'activity'>('config');
    const [scopeNodes, setScopeNodes] = useState<string[]>(agent.scopeNodes);
    const [scopeRules, setScopeRules] = useState<ScopeRule[]>(agent.scopeRules);
    const [isActive, setIsActive] = useState(agent.status === 'active');

    const conflictCount = MOCK_ACTIVITY.filter(e => e.agentId === agent.id && e.hasConflict).length;

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Page header */}
            <div style={{ background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                        onClick={onBack}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', borderRadius: 6, color: C.neutral190, fill: C.neutral190 }}
                        title="Back to agents list"
                    >
                        <Icon name="arrow-left" size={IconSize.SmallMedium} />
                    </button>
                    <div style={{ color: C.primary80, fill: C.primary80 }}>
                        <Icon name={agent.icon} size={IconSize.Medium} />
                    </div>
                    <div>
                        <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: C.neutral240, lineHeight: 1.3 }}>{agent.name}</div>
                        <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 2 }}>
                            Cohesivo Administration &rsaquo; AI Agents &rsaquo; {agent.name}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Button type={ButtonType.SecondaryAlt} onClick={onBack}>Discard</Button>
                    <Button type={ButtonType.Primary} icon="check-circle" onClick={() => undefined}>Save changes</Button>
                </div>
            </div>

            {/* Tab bar */}
            <div style={{ background: C.neutral10, borderBottom: `1px solid ${C.neutral60}`, padding: '0 24px', display: 'flex' }}>
                {[
                    { key: 'config' as const,   label: 'Configuration', icon: 'database-settings' },
                    { key: 'activity' as const, label: `Results · ${agent.activityCount}`, icon: 'chart-line', badge: conflictCount > 0 ? conflictCount : undefined },
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', background: 'none', border: 'none', borderBottom: activeTab === tab.key ? `2px solid ${C.primary80}` : '2px solid transparent', cursor: 'pointer', fontFamily: FONT, fontSize: 14, fontWeight: activeTab === tab.key ? 600 : 400, color: activeTab === tab.key ? C.primary80 : C.neutral190, fill: activeTab === tab.key ? C.primary80 : C.neutral190, marginBottom: -1 }}
                    >
                        <Icon name={tab.icon} size={IconSize.SmallMedium} />
                        {tab.label}
                        {tab.badge !== undefined && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 18, height: 18, borderRadius: 9, background: C.warning100, color: C.neutral10, fontFamily: FONT, fontSize: 10, fontWeight: 700, padding: '0 5px' }}>
                                {tab.badge}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div style={{ padding: 24, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                {activeTab === 'config' ? (
                    <>
                        {/* Main column */}
                        <div style={{ flex: 1, background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 24, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: SHADOW.extraSmall }}>
                            {/* Source platform banner */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: C.neutral30, borderRadius: 8, border: `1px solid ${C.neutral60}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <img src="./orchestration.png" alt="Ibexa Orchestration" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                                    <div>
                                        <div style={{ fontFamily: FONT, fontSize: 11, color: C.neutral150, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Synced from</div>
                                        <div style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: C.neutral240 }}>{agent.sourcePlatform}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Tag type={TYPE_TAG[agent.type]} size={TagSize.Small}>{agent.typeLabel}</Tag>
                                    <span style={{ fontFamily: FONT, fontSize: 12, color: C.neutral150 }}>{agent.model}</span>
                                    <span style={{ fontFamily: FONT, fontSize: 11, color: C.neutral100, background: C.neutral40, padding: '2px 6px', borderRadius: 4 }}>#{agent.sourceId}</span>
                                </div>
                            </div>

                            <Divider />

                            <ScopePanel
                                scopeNodes={scopeNodes}
                                scopeRules={scopeRules}
                                onScopeNodesChange={setScopeNodes}
                                onScopeRulesChange={setScopeRules}
                            />
                        </div>

                        {/* Sidebar */}
                        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 20, boxShadow: SHADOW.extraSmall }}>
                                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240, marginBottom: 16 }}>Agent status</div>
                                <ToggleButtonField
                                    id="agent-status" name="status"
                                    label={isActive ? 'Enabled' : 'Disabled'}
                                    checked={isActive}
                                    helperText="Enable or disable this agent globally"
                                    onChange={() => setIsActive(v => !v)}
                                />
                            </div>

                            <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 20, boxShadow: SHADOW.extraSmall }}>
                                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240, marginBottom: 12 }}>Agent details</div>
                                {[
                                    { label: 'Type',     value: agent.typeLabel },
                                    { label: 'Agent ID', value: `agent-${String(agent.id).padStart(4, '0')}` },
                                    { label: 'Source ID', value: agent.sourceId },
                                    { label: 'Created',  value: '14 May 2026' },
                                    { label: 'Modified', value: '18 May 2026' },
                                ].map(row => (
                                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: `1px solid ${C.neutral50}`, fontFamily: FONT, fontSize: 13 }}>
                                        <span style={{ color: C.neutral170 }}>{row.label}</span>
                                        <span style={{ color: C.neutral240, fontWeight: 600, fontSize: 12 }}>{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 20, boxShadow: SHADOW.extraSmall }}>
                                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: C.neutral240, marginBottom: 12 }}>Actions</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="arrows-reload" onClick={() => undefined}>
                                        Reset scope
                                    </Button>
                                    <Button type={ButtonType.SecondaryAlt} size={ButtonSize.Small} icon="trash" onClick={() => onDelete(agent)}>
                                        Delete agent
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div style={{ flex: 1, background: C.neutral10, border: `1px solid ${C.neutral60}`, borderRadius: 8, padding: 24, boxShadow: SHADOW.extraSmall }}>
                        <div style={{ marginBottom: 20 }}>
                            <SectionHeading icon="chart-line" title="Agent results" />
                            <div style={{ fontFamily: FONT, fontSize: 12, color: C.neutral170, marginTop: 4 }}>
                                Drafts, translations and reviews this agent produced on content within your scope
                            </div>
                        </div>
                        <ActivityFeed agentId={agent.id} />
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SectionHeading = ({ icon, title }: { icon: string; title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ color: C.primary80, fill: C.primary80 }}>
            <Icon name={icon} size={IconSize.SmallMedium} />
        </div>
        <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: C.neutral240 }}>{title}</div>
    </div>
);

const Divider = () => (
    <div style={{ height: 1, background: C.neutral60, margin: '4px 0' }} />
);

// ─── Shell ────────────────────────────────────────────────────────────────────

const AgentsMockup = () => {
    const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
    const [view, setView] = useState<'list' | 'edit' | 'create'>('list');
    const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
    const [deleteModal, setDeleteModal] = useState<Agent | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const handleEdit = (agent: Agent) => { setEditingAgent(agent); setView('edit'); };
    const handleBack = () => { setView('list'); setEditingAgent(null); };
    const handleCreateStart = () => setView('create');
    const handleCreate = (agent: Agent) => {
        setAgents(prev => [...prev, agent]);
        setView('list');
        setNotification(`"${agent.name}" has been successfully created.`);
    };
    const handleDeleteRequest = (agent: Agent) => setDeleteModal(agent);
    const handleDeleteCancel = () => setDeleteModal(null);

    const handleDeleteConfirm = () => {
        if (!deleteModal) return;
        const name = deleteModal.name;
        setAgents(prev => prev.filter(a => a.id !== deleteModal.id));
        setDeleteModal(null);
        if (view === 'edit') handleBack();
        setNotification(`"${name}" has been successfully deleted.`);
    };

    useEffect(() => {
        if (!notification) return;
        const timer = setTimeout(() => setNotification(null), 3800);
        return () => clearTimeout(timer);
    }, [notification]);

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: FONT, background: C.neutral20, overflow: 'hidden' }}>
            <LeftNav activeItem={0} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <TopBar />
                <main style={{ flex: 1, overflow: 'auto', background: C.neutral20 }}>
                    {view === 'list' && <ListView agents={agents} onEdit={handleEdit} onDelete={handleDeleteRequest} onCreateStart={handleCreateStart} />}
                    {view === 'edit' && editingAgent && <EditView agent={editingAgent} onBack={handleBack} onDelete={handleDeleteRequest} />}
                    {view === 'create' && <CreateView onCancel={() => setView('list')} onCreate={handleCreate} nextId={Math.max(...agents.map(a => a.id)) + 1} />}
                </main>
            </div>

            {deleteModal && <DeleteModal agent={deleteModal} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm} />}
            {notification && <Notification message={notification} onDismiss={() => setNotification(null)} />}
        </div>
    );
};

// ─── Storybook ────────────────────────────────────────────────────────────────

const meta: Meta<typeof AgentsMockup> = {
    component: AgentsMockup,
    title: 'Mockups/AI Agents',
    parameters: {
        layout: 'fullscreen',
        docs: { story: { height: '100vh' } },
    },
};

export default meta;

type Story = StoryObj<typeof AgentsMockup>;

export const Default: Story = {
    name: 'Agent list',
};
