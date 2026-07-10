# Component spec template

Copy this skeleton to `docs/components/<name>.spec.md` in `IDS_REACT_ROOT` (on the feature
branch — the spec is the PR-reviewable contract both implementations are built from).
Replace every `<...>`; delete guidance blockquotes. Keep every section, even if the answer
is "none" — an explicit "none" is part of the contract.

---

```markdown
# <ComponentName> — component spec

- **React name:** `<PascalCase>` (`packages/components/src/components/<PascalCase>/`)
- **Twig name:** `ibexa:<snake_case>` (`src/lib/Twig/Components/<PascalCase>.php`)
- **Source:** <Figma frame URL + node-id | screenshot filename(s)> (reference image saved as `_reference.png`)
- **Ticket:** IBX-<nnnnn>

## 1. Collision check

> Compare against BOTH component lists: `packages/components/src/components/` (React) and
> `src/lib/Twig/Components/` (Twig). "New" designs are often variants of existing components.

- Closest existing components: <list with 1-line reason each>
- Verdict: **new component** | **variant of `<Existing>`** (→ extend it instead; stop here and re-scope)

## 2. Anatomy & class plan

> The `ids-*` BEM class plan IS the React↔Twig parity contract — both implementations must
> emit exactly these classes. DOM outline with block/elements/modifiers:

```
.ids-<name>                          <root element, tag: <div|button|...>>
├── .ids-<name>__<element>
│   └── ...
Modifiers: .ids-<name>--<variant>, .ids-<name>--<size>, ...
```

## 3. Props

| Prop (React) | TS type / enum | Twig prop | Allowed values / default | Required | Notes |
|---|---|---|---|---|---|
| `size` | `<Name>Size` enum | `size` | `small` \| `medium` (default) | no | |

> Rules: enums, not string unions, in `<Name>.types.ts`. Twig mirrors allowed values via
> OptionsResolver in `#[PreMount]`. React `children`/ReactNode props map to Twig blocks
> (the framework-selector serializes ReactNode args with `renderToString`). List separately:

- React-only props (event handlers, render props): <...>
- Twig-only surface (`data-ids-*` attributes, block names, `#[ExposeInTemplate]` computed values): <...>

## 4. Variants × sizes × states matrix

> Every cell marked ● becomes a preview story; interactive states get play-test coverage.

| | default | hover | focus | active | disabled | <state…> |
|---|---|---|---|---|---|---|
| `<variant>` / `<size>` | ● | | | | | |

## 5. Token mapping

> Every visual value maps to an existing token from `packages/assets/src/scss/variables/`
> (run `scripts/list-tokens.mjs` for the live table). Raw hex/px values are forbidden in the
> implementation. Prefer matching Figma **variable names** over resolved values; when only a
> nearest-match is possible, flag it — every ⚠ row is a Gate-1 open question.

| Element / property | Design value (Figma var or measured) | Token | Exact? |
|---|---|---|---|
| background | `color/primary/100` | `$color-primary-100` | ✅ |
| padding | 6px | — | ⚠ NEW TOKEN NEEDED / nearest is <…> |

## 6. Interactions & behavior

- Mouse / keyboard behavior: <...>
- Controlled vs uncontrolled: <...>
- Needs vanilla-TS behavior in the Twig repo (auto-init via `init_components.ts`)? **yes/no** — <what it does>

## 7. Accessibility

- Root role / semantics: <...>
- ARIA attributes and their prop sources: <...>
- Focus behavior / tab order: <...>
- Contrast notes (token pairs used on top of each other): <...>

## 8. Test plan

- Preview stories: <names, from the §4 matrix>
- Play tests (`<Name>.test.stories.tsx`) — only if interactive: <scenarios>
- Twig integration test (`tests/integration/Twig/Components/<Name>Test.php`): mount-level
  prop-validation cases + render assertions for the §2 class plan.

## 9. New assets

- Icons: **none** | <SVG names to add to `packages/assets/src/img/icons` + sprite regen>
- Fonts/images: **none** | <...>

## 10. Open questions (Gate 1)

> The approval gate is "answer these", not "LGTM". Include every ⚠ from §5.

1. <...>
```
