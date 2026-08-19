# Spec: Input — dark mode variants

Extends the existing `.ids-input` / `.ids-input-text` (Input Basic) with scoped dark-mode
styling via the IBX-12056 mechanism (`on-dark` mixin, `--ids-mode` flag — design-system#126,
this branch's base). **No new component, no new props, no new `ids-*` classes.** Light output
must stay byte-identical.

Source: Figma component set `Input-cohesivo` (node `6259:33870`, page "🟠 Inputs"), variants
`State` (17) × `Theme=Light|Dark`. All 17 Dark variants extracted programmatically
(fills/strokes/effects per node). ⚠ The file binds **no variables** to these paints — every
hex was matched to a token by OKLab distance instead of by variable name; **all matches are
EXACT** (distance ≈ 0), so confidence is high despite the fallback method.

## 1. Design state → CSS state mapping

| Design state (×17) | CSS reality | New dark values needed |
|---|---|---|
| Enabled / Filled / Filled disabled-information variants | `.ids-input` default (value presence changes nothing visually) | default bg/border/text |
| Hover / Filled hover (X) | `:hover:not(--disabled)` | hover border |
| Typing | caret + hover-weight border | active border (caret inherits `color` — no rule needed) |
| Focus / Filled focus (X) | `:focus` | focus border + ring |
| Disabled / Filled disabled | `--disabled` | see ⚠ Q1 |
| Information (± filled) | input default + `.ids-helper-text` | helper-text dark color |
| Error / Filled error | `--error` | error border/bg/text |
| Error hover (± filled) | `--error:hover` | error hover border — see Q2 |
| Filled focus X / Filled hover X | clear button (`.ids-btn`) states | none here — #126 dark buttons territory (see Q4) |

## 2. Token table (all values from Dark variants; every hex = EXACT token)

| Property | Design value | Token | Seam |
|---|---|---|---|
| bg — ALL states (incl. focus, disabled, error) | `#262a2d` | `$color-neutral-220` | `--ids-input-default-bg-color` (+ disabled/error bg seams re-pointed to same) |
| border default | `#323639` | `$color-neutral-210` | `--ids-input-default-border-color` |
| text (typed value) | `#ffffff` | `$color-neutral-10` | `--ids-input-default-text-color` |
| placeholder | `#86888a` | `$color-neutral-140` | **no seam exists** → dark-only `&::placeholder` rule |
| border hover | `#626568` | `$color-neutral-170` | `--ids-input-hover-border-color` |
| border typing/active | `#626568` | `$color-neutral-170` | `--ids-input-active-border-color` |
| border focus | `#cfd0d0` | `$color-neutral-80` | `--ids-input-focus-border-color` |
| focus ring | 0 0 0 4px `#ffffff` @ .25 | `$box-shadow-focus-dark_surface` (exact incl. the #126 alpha bump) | `--ids-input-focus-box-shadow` |
| border error | `#ba2124` | `$color-error-80` (same as light) | `--ids-input-error-border-color` |
| border error hover | `#d54640` | `$color-error-60` | no seam — dark-only rule (Q2) |
| error bg | `#262a2d` (unchanged!) | `$color-neutral-220` | `--ids-input-error-bg-color` (light uses `$color-error-20`) |
| error text | `#ffffff` | `$color-neutral-10` | `--ids-input-error-text-color` |
| disabled text / bg / border | same as default (`#ffffff` / `#262a2d` / `#323639`) | see Q1 | `--ids-input-disabled-*` |
| field label | `#ffffff`, Mulish SemiBold 12 | `$color-neutral-10` | `--ids-label-default-text-color` (`_label.scss` gains `on-dark`) |
| helper text (default AND error rows) | `#86888a` | `$color-neutral-140` | `_helper-text.scss` — no var seam today (map colors used directly); dark rule or new seam. Error rows: see Q3 |
| radius / border width / font | 8px / 1px / Mulish 14 (text), 12 (label, helper) | unchanged from light | none |

## 3. Implementation shape (unchanged light output is the contract)

- `_input.scss` (`.ids-input`): one `@include theming.on-dark { … }` block re-pointing the
  `--ids-input-*` custom properties listed above + the dark-only `&::placeholder` rule.
  The light rules already consume `var(--ids-input-*, fallback)` — no rule duplication.
- `_label.scss`: `on-dark` re-point of `--ids-label-default-text-color` → `$color-neutral-10`.
- `_helper-text.scss`: `on-dark` dark color for the `default` type → `$color-neutral-140`
  (mechanism per Q3 answer).
- Storybook: `Dark mode / *` stories on `InputTextInput` (`globals: { theme: 'dark' }`),
  mirroring the Button precedent: Empty (Placeholder), Filled, Disabled, Error, Filled (Search Button).
- React/Twig APIs untouched.

## 4. Gate 1 decisions (user, 2026-08-19)

1. **Disabled: design-literal** — dark disabled re-points the `--ids-input-disabled-*` seams
   to the SAME values as default (text `neutral-10`, bg `neutral-220`, border `neutral-210`);
   no dimming, faithful to the variant set.
2. **Error hover: yes** — dark-only `--error:hover` rule, border `$color-error-60`.
3. **Helper text: per the Helper Text component set's own `Mode=Dark` variants**
   (node `1161:15434`): default type → `$color-neutral-140` (`#86888a`), error type →
   `$color-error-60` (`#d54640`) — text AND icon. (The gray-in-error look inside the Input
   set was indeed an artifact: it embeds only the default-type helper.)
4. **Icons: input-scoped override** — under `on-dark`, `.ids-input-text` sets the idle
   icon-button color (`--ids-default-text-color`) to `$color-neutral-140`; state colors
   stay with #126's dark button maps.

## 4a. Considered and REJECTED (2026-08-19): focus ring only on keyboard focus

Requested, implemented, then withdrawn by the user once it turned out to require JS:
browsers match `:focus-visible` on ANY focused text field (verified empirically —
`input.matches(':focus-visible')` is true after a mouse click), so the buttons' CSS-only
pattern cannot work for inputs; the only route is interaction-source tracking in JS
(pointerdown/keydown → class on focusin). Decision: **no JS for this — inputs keep the
standard ring on any focus.** Don't re-attempt via `:focus-visible`; it is a no-op here.

## 5. Verify

Reference: `_reference.png` (component set export, light column left / dark column right;
17 rows in the order of §1). Gate 2: Storybook dark stories side-by-side vs the dark column.
BO check happens in admin-ui (separate stacked branch) after this lands.
