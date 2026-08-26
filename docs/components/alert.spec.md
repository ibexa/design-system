# Alert — component spec

- **React name:** `Alert` (`packages/components/src/components/Alert/`)
- **Twig name:** `ibexa:alert` (`src/lib/Twig/Components/Alert.php`)
- **Source:** Figma `🟠 [i1] Design System` → page `🟠 Alert` → component set `Alert`
  (`node-id=1184-56113`, 12 variants: `Variant ∈ {Floating, Local, Toast} × Type ∈ {Success, Warning, Error, Info}`);
  reference image saved as `_reference.png` (1× export, 1320×464)
- **Ticket:** IBX-12188

## 1. Collision check

- Closest existing components:
  - `Tag` / `Badge` — status-coloured boxes, but inline-sized labels with no title/description/close.
  - `Chip` — the only dismissible component; its close button (`Button` tertiary-alt small, icon `discard`) and
    Twig TS "cancelable event → remove()" pattern are reused here.
  - `HelperText` — shows a per-type icon (`alert-error`) but is a field-level line, not a box.
  - Legacy (admin-ui, outside the DS): `ui/component/alert/alert.html.twig`, `modules/common/alert/alert.js`,
    `ui/notification.html.twig` — this component replaces all three (see §11).
- Verdict: **new component**

## 2. Anatomy & class plan

```
.ids-alert                          <div> root; role from the `role` prop (default: "alert" for error/warning, "status" for success/info)
├── .ids-alert__icon                <Icon size="small"> (20px) — default icon per type, overridable
├── .ids-alert__content             <div> flex column, gap 4px
│   ├── .ids-alert__title           <div> optional — title text (semibold)
│   ├── .ids-alert__description     <div> optional — React children / Twig block `content`
│   └── .ids-alert__actions         <div> optional — React `actions` / Twig block `actions`
└── .ids-alert__close-btn           <Button type="tertiary-alt" size="small" icon="discard"> optional (isDismissible)
Modifiers (root): .ids-alert--floating | .ids-alert--local | .ids-alert--toast
                  .ids-alert--success | .ids-alert--warning | .ids-alert--error | .ids-alert--info
```

- Root is `display: flex; align-items: flex-start; gap: 8px; padding: 11px; border: 1px solid; border-radius: 8px` —
  Figma draws the 1px stroke INSIDE the 45px/91px frames, so the CSS padding is the design's 12px minus the border
  (content sits 12px from the outer edge, total heights match the frames exactly).
- `--local`: `border-radius: 0 8px 8px 0`; the 2px accent bar is the 1px `border-left` in the accent colour plus
  `box-shadow: inset 1px 0 0 <accent>` on the root (no wrapper element), `padding-left: 13px` so the text sits 14px
  from the outer edge like the Figma inner frame.
- `--toast`: same box as floating; description/actions are not part of the design (single line, h 45) but are not
  forbidden — the modifier exists so consumers (the toast stack) can size it.
- Icon and close button are vertically centred on the first text line (Figma: wrappers `h-[21px] items-center`) —
  implemented with `line-height: 21px` on the wrappers / `align-self: flex-start` + matching height.
- Title-only: `__description` / `__actions` are **not rendered** when empty (no empty divs, no stray gap), so the box
  collapses to 12 + 21 + 12 = 45px like the Toast variant.

## 3. Props

| Prop (React) | TS type / enum | Twig prop | Allowed values / default | Required | Notes |
|---|---|---|---|---|---|
| `type` | `AlertType` enum | `type` | `success` \| `warning` \| `error` \| `info` | **yes** | drives colours, default icon and `role` |
| `variant` | `AlertVariant` enum | `variant` | `floating` (default) \| `local` \| `toast` | no | |
| `title` | `string` | `title` | `''` | no | the bold first line; `__title` is not rendered when empty (description-only alerts — 2 legacy sites carry markup with no title). React: `AlertProps` extends `Omit<BaseComponentAttributes, 'title'>` so the HTML `title` attribute is not exposed (conflicts with this prop) |
| `children` | `ReactNode` | block `content` | none | no | description under the title; rich content allowed (links, `<br>`, spans) |
| `actions` | `ReactNode` | block `actions` | none | no | buttons/links row rendered under the description inside `__content` |
| `icon` | `string` | `icon` | default per type: success → `check-circle`, warning → `alert-warning`, error → `alert-error`, info → `info-rounded` | no | icon **name** override |
| `iconPath` | `string` | `iconPath` | none | no | icon **path** override (sprite URL + `#id`); wins over `icon`. Mirrors `Icon`'s `path` |
| `isDismissible` | `boolean` | `isDismissible` | `false` | no | renders the close button (legacy default was also "no close button" — 34 of 47 sites) |
| `role` | `AlertRole` enum | `role` | `alert` \| `status`; default derived from `type`: `alert` for `error`/`warning`, `status` for `success`/`info` | no | live-region politeness |
| `onDismiss` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | — | — | no | React-only |
| `className` | `string` | `class` via `attributes` | `''` | no | |

- React-only props: `onDismiss`. The React component does not remove itself — the consumer owns state.
- Twig-only surface: `attributes` passthrough on the root (`class`, `id`, `data-*`, `role` override); blocks
  `content`, `actions`; `#[ExposeInTemplate]` computed values `icon_name` (resolved default/override), `role`;
  `data-ids-initialized` set by the TS behaviour; `data-ids-custom-init` opt-out of auto-init (framework convention).
- Close button `aria-label`: React via `TranslatorContext` key `ibexa.alert.close-btn.label` (`/*@Desc("Close")*/`),
  Twig `'ibexa.alert.close-btn.label'|trans|desc('Close')` in domain `ibexa_design_system_twig` (Chip precedent).
- `role` is a prop in both implementations (user decision, Gate 1) with the type-derived default above; Twig exposes the
  resolved value via `#[ExposeInTemplate]`.

## 4. Variants × sizes × states matrix

Only one size. States apply to the close button only (inherited from `Button`). The "title only", "+ actions" and
"non-dismissible" columns are layout variations independent of `type`, so they are drawn once on a representative row
(`floating` / success) instead of ×12.

| | default (title + description) | title only | + actions | non-dismissible |
|---|---|---|---|---|
| `floating` / success | ● | ● | ● | ● |
| `floating` / warning | ● | | | |
| `floating` / error | ● | | | |
| `floating` / info | ● | | | |
| `local` / success | ● | | | |
| `local` / warning | ● | | | |
| `local` / error | ● | | | |
| `local` / info | ● | | | |
| `toast` / success | ● (title only — per design) | | | |
| `toast` / warning | ● | | | |
| `toast` / error | ● | | | |
| `toast` / info | ● | | | |

Plus one "long content" story (multi-line title + description, floating/info) to check wrapping.
Dark surface (`--ids-mode: dark`): **not designed** — the component does not opt into the `on-dark` mixin.

## 5. Token mapping

Every hex read from Figma (`get_variable_defs` on the set) resolved EXACTLY to a Cohesivo token and is identical
across all brand modes (`resolve_color.py`, 2026-08-26).

| Element / property | Design value (Figma var → hex) | Token | Exact? |
|---|---|---|---|
| root background — success | `Background/background-success` `#F7FEF5` | `$color-success-5` | ✅ |
| root background — warning | `Background/background-warning` `#FDF5EB` | `$color-warning-5` | ✅ |
| root background — error | `Background/background-error` `#FFE8E5` | `$color-error-5` | ✅ |
| root background — info | `Background/background-info` `#EDF2F7` | `$color-info-5` | ✅ |
| root border 1px — success | `Border/border-alert-sucess` (sic) `#BAD9B2` | `$color-success-40` | ✅ |
| root border 1px — warning | `Border/border-alert-warning` `#F2BA6E` | `$color-warning-40` | ✅ |
| root border 1px — error | `Border/border-alert-error` `#EC837A` | `$color-error-40` | ✅ |
| root border 1px — info | `Border/border-alert-info` `#8CAEC7` | `$color-info-40` | ✅ |
| local accent 2px — success | `Border/border-alert-sucess_left` `#7DB76F` | `$color-success-60` | ✅ |
| local accent 2px — warning | `Border/border-alert-warning_left` `#EF9B2A` | `$color-warning-60` | ✅ |
| local accent 2px — error | `Border/border-alert-error_left` `#D54640` | `$color-error-60` | ✅ |
| local accent 2px — info | `Border/border-alert-info_left` `#4F87AE` | `$color-info-60` | ✅ |
| icon fill — success | `Icon/icon-alert-success` `#378F19` | `$color-success-80` | ✅ |
| icon fill — warning | `Icon/icon-alert-warning` `#DC8004` | `$color-warning-80` | ✅ |
| icon fill — error | `Icon/icon-alert-error` `#BA2124` | `$color-error-80` | ✅ |
| icon fill — info | `Icon/icon-alert-info` `#19628F` | `$color-info-80` | ✅ |
| title colour — success | `Text/text-alert-success` `#378F19` | `$color-success-80` | ✅ |
| title colour — warning | `Text/text-alert-warning` `#C26100` | `$color-warning-100` | ✅ (differs from the icon step — open question 6) |
| title colour — error | `Text/text-alert-error` `#BA2124` | `$color-error-80` | ✅ |
| title colour — info | `Text/text-alert-info` `#19628F` | `$color-info-80` | ✅ |
| description colour | `Text/text-secondary` `#3E4145` | `$color-neutral-200` | ✅ |
| title font | `Text/Paragraph/Semibold/m` Mulish 600 14/21 | `$font-family`, `$text-font-weight-semi`, `$text-font-size-m`, line-height `calculateRem(21px)` | ✅ |
| description font | `Text/Paragraph/Regular/m` Mulish 400 14/21 | `$font-family`, `$text-font-weight-normal`, `$text-font-size-m`, line-height `calculateRem(21px)` | ✅ |
| root radius | `Semantic/radius-alert-base` 8 | `$border-radius-medium` | ✅ |
| root padding | `Semantic/Spacing&Padding/medium` 12 (from the frame edge, stroke inside) | `calculateRem(11px)` + 1px border | ✅ (no spacing tokens by convention) |
| root gap (icon · content · close) | `Semantic/Spacing&Padding/small` / `Primitive/s` 8 | `calculateRem(8px)` | ✅ |
| content gap (title · description) | `Semantic/Spacing&Padding/very-small` 4 | `calculateRem(4px)` | ✅ |
| icon size | 20 | `Icon` size `small` (`$icons-sizes` 20px) | ✅ |
| close icon size | 16 | `Button` size `small` → `Icon` `tiny-small` (16px) | ✅ |
| local accent width | 2 | 1px `border-left` + `inset 1px` box-shadow in the accent colour | ✅ |
| border width | 1 | `calculateRem(1px)` | ✅ |

`Cohesivo/Primary/Purple #8A38F5` appears in the export only as the frame's selection outline — not part of the component.

## 6. Interactions & behavior

- Mouse / keyboard: the only interactive element is the close button (native `<button>`, focusable, Enter/Space).
  Clicking it: React → `onDismiss(event)`; the component is otherwise stateless (consumer unmounts it).
- Controlled vs uncontrolled: **stateless** in React.
- Needs vanilla-TS behavior in the Twig repo (auto-init via `init_components.ts`)? **yes** —
  `src/bundle/Resources/public/ts/components/alert.ts` (`class Alert extends Base`): on close-button click dispatches
  cancelable `ids:alert:dismiss:before` (`detail: { component }`) on the root; if not `defaultPrevented`, removes the
  root from the DOM and dispatches `ids:alert:dismissed` on it. Public `dismiss()` method so consumers (the admin-ui
  toast stack on timeout) can trigger the same path. Auto-init selector `.ids-alert:not([data-ids-custom-init])`.
- No auto-dismiss timer, no stacking/positioning — those belong to the consumer (admin-ui notifications).

## 7. Accessibility

- Root role / semantics: `role="alert"` for `error`/`warning` (assertive live region), `role="status"` for
  `success`/`info` (polite). Rendered at mount, so toasts inserted dynamically are announced.
- ARIA attributes: close button `aria-label` = translated "Close" (see §3). No `aria-labelledby` (title is plain text
  inside the live region).
- Focus behavior / tab order: only the close button is tabbable; DS `Button` focus ring applies. Removing the alert
  from the DOM on dismiss moves focus to `body` — acceptable for toasts; inline consumers that need focus management
  handle it in the `ids:alert:dismiss:before` listener / `onDismiss`.
- Contrast notes: title `$color-<type>-80` (warning: `-100`) on `$color-<type>-5`; description `$color-neutral-200`
  on `$color-<type>-5` — all designer-chosen pairs, no deviation.

## 8. Test plan

- Preview stories (`Alert.stories.tsx`, `tags: ['autodocs', 'foundation']`): `FloatingSuccess`, `FloatingWarning`,
  `FloatingError`, `FloatingInfo`, `LocalSuccess`, `LocalWarning`, `LocalError`, `LocalInfo`, `ToastSuccess`,
  `ToastWarning`, `ToastError`, `ToastInfo`, `TitleOnly`, `DescriptionOnly`, `WithActions`, `NonDismissible`,
  `LongContent`, `CustomIcon`.
- Play tests (`Alert.test.stories.tsx`, `tags: ['!dev']`): dismiss button click calls `onDismiss` once;
  `isDismissible: false` renders no button; `type` → expected `role`; `iconPath` overrides the icon `<use href>`.
- Twig integration test (`tests/integration/Twig/Components/AlertTest.php`): mount-level validation (invalid `type`,
  invalid `variant`, missing `type` throw); render assertions for the §2 class plan per type × variant, default icon
  per type, `icon`/`iconPath` overrides, close button present only with `isDismissible`, `content`/`actions` blocks
  rendered inside `__content`, `role` per type, `attributes` merged on the root.

## 9. New assets

- Icons: **none** — `check-circle`, `alert-warning`, `alert-error`, `info-rounded`, `discard` already exist in
  `packages/assets/src/img/icons`.
- Fonts/images: **none**

## 10. Open questions (Gate 1)

Resolved with the user on 2026-08-26 (Gate 1 passed):

1. **Title-only layout** — `__description` is not rendered when empty; the box collapses to 45px (same vertical
   padding as Toast). ✅
2. **Actions slot** — plain slot (`actions` prop / block), no alert-specific styling of its children. ✅
3. **Custom icon** — required (11 legacy sites override the icon) → `icon` / `iconPath`. ✅
4. **Close button optional** — `isDismissible` defaults to `false`; confirmed by legacy usage (34 of 47 sites have no
   close button). ✅
5. **`size: small`** — dropped. ✅
6. **Warning title colour** `$color-warning-100` vs icon `$color-warning-80` — treated as intentional. ✅
7. **`role`** — a prop (`alert` | `status`) with a type-derived default. ✅
8. **Toast with description / actions** — allowed (legacy toasts inject links into the message). ✅
10. Close button hover/focus = DS `Button` tertiary-alt small, no override. ✅
11. **`title` optional** (spec drift found in the admin-ui shim, 2026-08-26): reset-password success and the invitation-modal
    bad-file warning have no title and carry markup — description-only alerts are allowed, `__title` is skipped when empty. ✅

For the design team (not blocking):

- Rename the Figma variable `Border/border-alert-sucess` (typo).
- Title-only Floating/Local and the actions row are implemented without a design — a variant in Figma would be welcome.

## 11. Migration map (legacy admin-ui → `Alert`)

### `@ibexadesign/ui/component/alert/alert.html.twig` (47 call sites / 15 packages) → `<twig:ibexa:alert>`

| Legacy param / block | New | Notes |
|---|---|---|
| `type` | `type` | same values |
| `is_toast: true` | `variant="toast"` | default legacy (border-left) look → `variant="local"` |
| `title` | `title` | required now — the 1 site with no title (reset_password) moves its text into `title` |
| `subtitle`, `show_subtitle_below` | block `content` | description is always below the title |
| `extra_content` param / block | block `content` | rich HTML goes in the block, no `|raw` param |
| block `actions` | block `actions` | |
| block `title` / `content` overrides with hand-written markup | `title` prop / block `content` | the 2 admin-ui embeds are rewritten |
| `show_close_btn: true` | `isDismissible` | Bootstrap `data-bs-dismiss` no longer needed — DS TS handles it |
| `icon_path` | `iconPath` | or `icon="<name>"` when the icon exists in the DS sprite |
| `size` | — | dropped (1 site) |
| `class` | `class="…"` attribute | |
| `attr` | attributes passthrough | never used |
| root classes `alert ibexa-alert ibexa-alert--<type>` | `ids-alert ids-alert--<type> ids-alert--<variant>` | JS/Behat/SCSS hooks must be retargeted |

### `modules/common/alert/alert.js` (4 call sites) → `@ids-components/components/Alert`

`type→type`, `title→title`, `subtitle→children`, `iconName→icon`, `iconPath→iconPath`, `showCloseBtn→isDismissible`,
`onClose→onDismiss`, `extraClasses→className`, `children→children`; `size`, `showSubtitleBelow` dropped;
legacy look = `variant={AlertVariant.Local}`.

### `ui/notification.html.twig` + `admin.notifications.js` (toast stack, 243 dispatch sites)

`<twig:ibexa:alert variant="toast" type="<type>" title="{{ message }}" iconPath="{{ icon_path }}" isDismissible>` rendered
once per type into `data-template-<type>` (OptionsResolver validates `type` at render time, so the `{{ label }}`
placeholder cannot be used); the renderer selects `.ids-alert`, initialises the DS `Alert` TS instance on the appended
node and calls `dismiss()` on timeout instead of `bootstrap.Alert`. The `ibexa.helpers.notification.*` API is unchanged.

### Status (2026-08-26)

- admin-ui: `alert.html.twig` / `alert.js` / `notification.html.twig` are adapters over the DS Alert (deprecated; inline
  renders carry `ibexa-alert-adapter` for the legacy bottom margin). The 47 legacy call sites work unchanged.
- Migrated off hand-rolled markup / legacy hooks: share `versions/table_before`, workflow `workflow_version_lock`,
  image-editor `crop.js`, personalization `scenarios.preview.js`, connector-ai / product-catalog SCSS, Page Builder
  `Notification` (wraps the DS Alert, `actions` config), connector-qualifio CKEditor alert (own classes, DS design values).
- Not migrated: storefront notifications, developer docs, the 47 adapter call sites themselves.

