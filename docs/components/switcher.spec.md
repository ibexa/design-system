# Switcher — component spec

- **React name:** `Switcher` (`packages/components/src/components/Switcher/`)
- **Twig name:** `ibexa:switcher` (`src/lib/Twig/Components/Switcher.php`)
- **Source:** Figma [🟢 Switcher](https://www.figma.com/design/4sbNQyNLhFFwxWDH89Rf9X/%F0%9F%9F%A2--Ibexa--Design-System?node-id=0-7376) — frame `Switcher Component` (node `2789:114418`), component sets `Switch element` (`2799:115121`) and `Switcher` (`2799:115151`). Reference image saved as `_reference.png`.
- **Ticket:** IBX-999999

## 1. Collision check

> Compared against both `packages/components/src/components/` (React) and `src/lib/Twig/Components/` (Twig).

- Closest existing components:
  - **`ToggleButton`** — a single binary on/off toggle. Switcher is an N-way, single-select segmented control; not the same widget.
  - **`RadioButton` / `AltRadio`** — single-select semantics, but rendered as classic radios, not a segmented pill bar.
  - **`OverflowList`** — relevant only to the *scroll/overflow* variant (see §10 Q4); not the core control.
- Verdict: **new component** (`Switcher`). It is a segmented single-select control (a row of mutually-exclusive "switch elements" inside a bordered track).

## 2. Anatomy & class plan

> This `ids-*` class plan IS the React↔Twig parity contract — both implementations emit exactly these classes.

```
.ids-switcher                                <div, role="radiogroup"> — the track/container
└── .ids-switcher__item                      <button type="button", role="radio"> — one switch element
    ├── .ids-switcher__item-label            <span> — the text label
    └── .ids-switcher__item-icon             <span> icon wrapper — only when an item has an icon
                                             (error → `alert-error`; "more" → `arrow-double-right`)

Root modifiers:
  .ids-switcher--large            (default size)
  .ids-switcher--small
  .ids-switcher--backoffice       (default type; accent = primary)
  .ids-switcher--builders         (accent = primary_alt)
  .ids-switcher--overflow         horizontally-collapsing track with a trailing "More »" trigger

Item modifiers:
  .ids-switcher__item--selected     selected/active option (grey pill + SemiBold)
  .ids-switcher__item--disabled     non-interactive (paired with native `disabled` attr)
  .ids-switcher__item--error        error styling (red label + error icon)
  .ids-switcher__item--more         the overflow "More »" trigger (white bg + accent border + arrow-double-right)
```

Interaction states **hover / focus-visible / active(pressed)** are pseudo-class driven in SCSS
(`:hover`, `:focus-visible`, `:active`) — **not** modifier classes. To avoid layout shift, the
item carries a 1px **transparent** border by default that becomes coloured on hover/focus/active.

> **Type (Backoffice vs Builders) — resolved: explicit prop.** The Figma `Type` variant only
> changes the accent colour (purple `primary` vs alt-purple `primary_alt`) used for the
> hover/focus/pressed borders and the focus ring. Per Gate 1 this is an explicit `type` prop that
> emits the `.ids-switcher--backoffice` / `.ids-switcher--builders` root modifiers; the SCSS scopes
> the accent colour under each modifier.

> **Overflow — resolved: in scope.** React reuses the existing `OverflowList` (`@ids-components/OverflowList`)
> internally: each switch element is a `renderItem`, and `renderMore({ hiddenCount })` renders the
> trailing `.ids-switcher__item--more` trigger. Items that do not fit collapse behind "More »",
> which opens a menu of the hidden items; selecting one selects it. Twig re-implements the same
> measure-and-collapse logic in vanilla-TS (§6). Only the `--overflow` root modifier + `--more`
> item are added to the contract; the plain (non-overflow) track is the default.

## 3. Props

| Prop (React) | TS type / enum | Twig prop | Allowed values / default | Required | Notes |
|---|---|---|---|---|---|
| `items` | `SwitcherItem[]` | `items` | array of item objects | **yes** | see item shape below |
| `selectedValue` | `string` | `selected_value` | any item `value` / — | no | controlled selection |
| `size` | `SwitcherSize` enum | `size` | `large` (default) \| `small` | no | |
| `type` | `SwitcherType` enum | `type` | `backoffice` (default) \| `builders` | no | accent colour theme |
| `overflow` | `boolean` | `overflow` | `false` | no | collapse overflowing items behind "More »" |
| `moreLabel` | `string` | `more_label` | `'More'` | no | label for the overflow "More »" trigger; consumer passes a translated string |
| `onChange` | `(value: string) => void` | — | — | no | React-only; fired on item select |
| `name` | `string` | `name` | auto-generated / — | no | radiogroup grouping name |
| `className` | `string` | `class` (attr) | `''` | no | extra root class |

**`SwitcherItem` shape** (React `SwitcherItem` type / Twig array keys):

| Key | Type | Default | Notes |
|---|---|---|---|
| `value` | `string` | — (required) | unique id, emitted to `onChange`, used for selection |
| `label` | `string` | — (required) | visible text (`ids-switcher__item-label`) |
| `disabled` | `boolean` | `false` | native `disabled` + `--disabled` modifier |
| `error` | `boolean` | `false` | `--error` modifier + `alert-error` icon |

- React-only props (event handlers, render props): `onChange`.
- Twig-only surface: `attributes` (Symfony UX `HasAttributesTrait` passthrough on the root). No
  `data-ids-*` attributes needed for the core control. Translations of labels happen in the
  **consuming** template, never inside the DS component.
- React `children`/ReactNode props → Twig blocks: **none** — labels are plain strings, so no
  ReactNode↔block mapping is required.

## 4. Variants × sizes × states matrix

Per-item states (each row = one item state within a `large` and a `small` Switcher):

| item state | default | hover | focus-visible | active/pressed | disabled | error |
|---|---|---|---|---|---|---|
| unselected | ● | ● | ● | ● | ● | ● |
| selected | ● | ● | ● | ● | ● | ● |

Sizes: `large` ●, `small` ●. Types: `backoffice` ● (default accent), `builders` ● (alt accent).
Overflow: `overflow=false` ● (default), `overflow=true` ● (trailing "More »"). Story coverage (§8)
renders the selected/unselected pair per size, both types, disabled/error examples, and the overflow
track. Hover/focus/active are exercised in the play test, not as static preview stories.

## 5. Token mapping

> Figma variable names matched to SCSS tokens from `packages/assets/src/scss/variables/`. Spacing
> has no tokens — `calculateRem(<px>)` from measured px. ⚠ rows are Gate-1 open questions.

| Element / property | Design value (Figma var / measured) | Token | Exact? |
|---|---|---|---|
| track background | `neutral/20` #fafafa | `$color-neutral-20` | ✅ |
| track border (1px) | `neutral/70` #dbdbdc | `$color-neutral-70` | ✅ |
| track radius | 12px | `calculateRem(12px)` | ✅ |
| track padding | 8px | `calculateRem(8px)` | ✅ |
| track gap | 4px | `calculateRem(4px)` | ✅ |
| item radius (large) | 10px | `calculateRem(10px)` | ✅ |
| item radius (small) | 8px (inferred) | `calculateRem(8px)` | ⚠ inferred; confirm at Gate 2 |
| item height (large) | 38px | `calculateRem(38px)` | ✅ |
| item height (small) | 30px | `calculateRem(30px)` | ✅ |
| item padding (large) | 12px 24px | `calculateRem(12px) calculateRem(24px)` | ✅ |
| item padding (small) | 6px 16px (inferred) | `calculateRem(6px) calculateRem(16px)` | ⚠ inferred; confirm at Gate 2 |
| item gap (label↔icon) | 4px (error) / 8px (more) | `calculateRem(4px)` / `calculateRem(8px)` | ✅ |
| label font size | 14px | `$text-font-size-m` | ✅ |
| label line-height | 18px | `calculateRem(18px)` | ✅ |
| label letter-spacing | 0.12px | `calculateRem(0.12px)` | ⚠ no token; measured value |
| label weight (unselected) | Regular 400 | `$text-font-weight-normal` | ✅ |
| label weight (selected) | SemiBold 600 | `$text-font-weight-semi` | ✅ |
| label colour | `neutral/240` #0e1216 | `$color-neutral-240` | ✅ |
| selected item bg | `neutral/50` #ececec | `$color-neutral-50` | ✅ |
| disabled label colour | `neutral/100` #b7b8b9 | `$color-neutral-100` | ⚠ nearest by value; confirm |
| accent border (hover/focus/active), `--backoffice` | `primary/80` #4e24a5 | `$color-primary-80` | ✅ |
| accent border (hover/focus/active), `--builders` | `primary_alt/80` #7742d5 | `$color-primary_alt-80` | ✅ |
| focus ring | `transparency/primary-25%` #4e24a540, spread 4 | `$box-shadow-focus-primary` (backoffice) / `$box-shadow-focus-primary_alt` (builders) — existing tokens, already `primary-80`/`primary_alt-80` @ 25% spread 4px | ✅ (no new token) |
| error label / icon | `error/90` #a71219 | `$color-error-90` | ✅ |
| "more" item bg | `neutral/10` white | `$color-neutral-10` | ✅ |

## 6. Interactions & behavior

- **Mouse:** click an item → it becomes selected; `onChange(value)` fires with that item's value.
  Disabled items are inert.
- **Keyboard (radiogroup pattern):** `Tab` moves focus into the group onto the selected item
  (or first item); `←/→` (and `↑/↓`) move selection between enabled items, wrapping; `Space/Enter`
  confirm. Disabled items are skipped.
- **Overflow (`overflow`):** the track wraps its items in `OverflowList`; items past the available
  width collapse behind a trailing `.ids-switcher__item--more` "More »" trigger. Activating it opens
  a menu (`.ids-switcher__menu`, rendered as a sibling of `OverflowList` so it is not clipped by that
  container's `overflow: hidden`) listing the hidden items; picking one selects it (fires `onChange`),
  closes the menu, and **promotes that item to the front of the track so it becomes visible**
  (Gate-2 decision). Promotion happens only when picking from the menu; switching between
  already-visible items keeps the order stable (no reflow). Non-overflow is the default.
- **Controlled vs uncontrolled:** **controlled only** (`selectedValue` + `onChange`); the consumer
  owns state. No stateful wrapper (Gate 1 decision).
- Needs vanilla-TS behavior in the Twig repo (auto-init via `init_components.ts`)? **yes** — the Twig
  version needs a small behavior to move the `--selected` class, keyboard arrow navigation, and emit
  a DOM `change`/custom event on click, since Twig renders static markup. Scope mirrors the React
  keyboard/selection logic.

## 7. Accessibility

- Root role / semantics: `role="radiogroup"` with `aria-label` (or `aria-labelledby` supplied by
  consumer). Items are `<button type="button" role="radio" aria-checked>`.
- ARIA attributes: `aria-checked` from selection; `aria-disabled`/native `disabled` from item
  `disabled`; error items get no special ARIA beyond the icon (error is presentational here — the
  consumer owns validation messaging). ⚠ confirm error semantics (Q6).
- Focus behavior / tab order: single tab stop (roving `tabindex`) — selected item is `tabindex=0`,
  the rest `tabindex=-1`; arrows move focus+selection.
- Contrast: label `neutral/240` on `neutral/20`/`neutral/50` — high contrast, OK. Disabled
  `neutral/100` on `neutral/20` is intentionally low (non-interactive). Error `error/90` on
  `neutral/50` — verify AA at Gate 2.

## 8. Test plan

- **Preview stories** (`Switcher.stories.tsx`), from the §4 matrix:
  - `Large` (default, 3 items, first selected)
  - `Small`
  - `Builders` (type accent)
  - `WithDisabledItem`
  - `WithErrorItem`
  - `Overflow` (many items in a constrained width → "More »")
- **Play tests** (`Switcher.test.stories.tsx`):
  - clicking an unselected item selects it and fires `onChange` with the right value;
  - a disabled item cannot be selected (no `onChange`);
  - keyboard: arrow keys move selection between enabled items and skip disabled ones;
  - `aria-checked` tracks the selected item;
  - overflow: with a constrained width the "More »" trigger appears and reveals hidden items.
- **Twig integration test** (`tests/integration/Twig/Components/SwitcherTest.php`):
  - `#[PreMount]` rejects an invalid `size`/`type`; accepts `large`/`small` and `backoffice`/`builders`;
  - renders `.ids-switcher`, `.ids-switcher--<size>`, `.ids-switcher--<type>`, one
    `.ids-switcher__item` per item, and `--selected` on the item whose `value === selected_value`;
  - error item renders `.ids-switcher__item--error` + the `alert-error` icon use;
  - `overflow=true` renders `.ids-switcher--overflow` and the `--more` trigger.

## 9. New assets

- Icons: **none new** — reuses `alert-error` (error item, as in `HelperText`) and
  `arrow-double-right` (the "more" affordance). Both already in the sprite.
- Fonts/images: **none**.

## 10. Decisions & remaining flags (Gate 1)

**Resolved at Gate 1:**

1. **Scope** — build the **core segmented control _and_ the overflow (`overflow`) variant** this
   pass. The "Content navigation switcher" usage composition is **deferred** to a follow-up.
2. **Type** — an **explicit `type` prop** (`backoffice` default / `builders`) emitting
   `.ids-switcher--backoffice` / `--builders`.
3. **Focus ring** — expressed via `color-mix`/`rgba` off the accent token (`$color-primary-80` /
   `$color-primary_alt-80`) at 25%; **no new token** added.
4. **State API** — **controlled only** (`selectedValue` + `onChange`); no stateful wrapper.

**Defaults I'm proceeding with unless you object:**

5. **Error semantics** — per-item `error` is **visual only** (label colour + `alert-error` icon);
   the consuming context owns any validation message/ARIA. (DS primitive stays presentational.)
6. **`small`-size padding/radius** — §5 rows marked ⚠ (`6px 16px`, radius `8px`) and the disabled
   label colour (`$color-neutral-100`) are inferred (Figma rate-limited before I could read the
   small element directly). I'll **confirm exact px at Gate 2** and correct the spec + SCSS if off.
   Flag now if you already know the values.
7. **Overflow "More »" interaction** — hidden items collapse behind "More »" which opens a **menu**
   of the hidden items (OverflowList-style), rather than free horizontal scroll. **Gate-2 decision:**
   selecting a hidden item **promotes it to the front of the track** (active item always visible).
   Twig's vanilla-TS behavior must replicate this reorder-on-select.
