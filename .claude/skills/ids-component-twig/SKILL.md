---
name: ids-component-twig
description: Implement the Twig counterpart of an Ibexa Design System component in design-system-twig (Symfony UX Twig Component) from an approved spec — PHP component class, template emitting the same ids-* classes, optional vanilla-TS behavior, PHPUnit integration test. Use when implementing/changing Twig DS components, or as phase 4 of ids-new-component.
---

# Twig DS component implementation

Input: the approved spec `docs/components/<name>.spec.md` in the React repo. Implement the
**spec**, not the React source — then diff your emitted classes against both. Resolve
`IDS_TWIG_ROOT` per `ids-new-component/references/repo-discovery.md`; all paths below are
relative to it. The repo's `CLAUDE.md` holds the bundle conventions.

Exemplars to read first: `Tag` (simple: `src/lib/Twig/Components/Tag.php` +
`…/design_system/components/tag.html.twig` + `tests/integration/Twig/Components/TagTest.php`),
`DropdownSingle/Input` (complex: abstract base + partial template + TS behavior).

## Files

1. PHP class `src/lib/Twig/Components/<Name>.php` — `#[AsTwigComponent('ibexa:<snake>')]`;
   picked up automatically by the services glob, no registration needed.
2. Template `src/bundle/Resources/views/themes/standard/design_system/components/<snake>.html.twig`
   (`:` segments in the component name map to subdirectories).
3. (spec §6 says so) TS behavior `src/bundle/Resources/public/ts/components/<snake>/…` +
   auto-init registration in `src/bundle/Resources/public/ts/init_components.ts`.
4. Integration test `tests/integration/Twig/Components/<Name>Test.php`.

Parity rules and per-file conventions: [references/parity-checklist.md](references/parity-checklist.md).

## Checks

Run everything in [references/checks.md](references/checks.md) — PHPUnit, PHPStan (level 8),
php-cs-fixer, prettier/eslint. The integration test asserting the spec §2 `ids-*` classes is
the **primary React↔Twig parity guarantee**; additionally capture the Twig renders with
`screenshot-stories.mjs --twig` and compare against the React captures
(setup: `ids-component-verify/references/twig-visual.md`).
