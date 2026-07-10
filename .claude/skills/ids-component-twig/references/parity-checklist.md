# Twig parity checklist

Parity means: **same `ids-*` classes on the same DOM shape** (spec §2) and **same prop
surface with the same allowed values** (spec §3). It does NOT mean identical attributes —
the Twig side legitimately adds `data-ids-*` hooks and server-side concerns.

## 1. PHP component class

- [ ] `final class <Name>` with `#[AsTwigComponent('ibexa:<snake>')]`. Multi-part
      components use `:` segments (`ibexa:dropdown_single:input`) and, when they share
      logic, an `Abstract*` base class — check `AbstractDropdown`, `AbstractField`,
      `AbstractChoiceInput`, `ListFieldTrait` before writing a new base.
- [ ] Public typed properties = the props, camelCase, defaults inline. Spec §3's Twig
      column is the source of names.
- [ ] `#[PreMount] public function validate(array $props): array` using `OptionsResolver`:
      `->define('<prop>')->allowedValues(...)` mirroring the React enum values exactly;
      return `$resolver->resolve($props) + $props`. Exemplar: `Tag.php`.
- [ ] Computed values for the template via `#[ExposeInTemplate('<snake_name>')]` methods.
- [ ] Services glob (`src/bundle/Resources/config/services/twig.yaml`) auto-registers the
      class — no config edits. Constructor-inject `TranslatorInterface` only for
      internal defaults (like Dropdown's placeholder), with `/** @Desc(...) */`.

## 2. Template

- [ ] Map variant props to modifiers with `html_cva` (base `ids-<name>`, variants per
      modifier) and/or `html_classes`; render `{{ attributes }}` on the root so callers can
      pass `class`/data attributes.
- [ ] `class=`, never `className=` (React-ism that has slipped in before).
- [ ] React `children` → `{% block content %}` (`{{ block('content') }}`); other ReactNode
      props → named blocks; record the mapping from spec §3.
- [ ] Compose other IDS components with `<twig:ibexa:icon …/>` syntax; dynamic prop values
      use the `:prop="expr"` colon prefix.
- [ ] Complex/multi-variant components: shared skeleton in
      `…/design_system/partials/base_<name>.html.twig`, variants `{% extends %}` it and
      override blocks. Exemplar: `base_dropdown.html.twig`.

## 3. Vanilla-TS behavior (only when spec §6 requires client behavior)

- [ ] `src/bundle/Resources/public/ts/components/<snake>/` extending `partials/base.ts`;
      shared logic under `partials/`.
- [ ] Auto-init in `init_components.ts`: query
      `.ids-<name>:not([data-ids-custom-init])`, instantiate, `.init()`.
- [ ] Config through `data-ids-*` attributes emitted by the template — document each in
      spec §3 (Twig-only surface).
- [ ] New standalone Encore entry (`src/bundle/Resources/encore/ibexa.config.js`) only if
      the behavior must load outside the main bundle — usually not.

## 4. Integration test

`tests/integration/Twig/Components/<Name>Test.php`, `extends KernelTestCase`,
`use InteractsWithTwigComponents;`. Exemplar: `TagTest.php`.

- [ ] Mount-level: `mountTwigComponent(<Name>::class, [...])` — valid props resolve;
      invalid enum values throw `InvalidOptionsException` (`expectException` per case).
- [ ] Render-level: `renderTwigComponent(...)->crawler()` — assert the **complete spec §2
      class plan**: root block, each modifier under its prop value, each element class,
      slot/block content placement. Every assertion carries a message.
- [ ] Behavior surface: assert the `data-ids-*` attributes the TS behavior reads.

## 5. No styles here

The bundle ships zero SCSS. If something doesn't look right, the fix is in the React repo's
`packages/assets` — never add CSS to design-system-twig.
