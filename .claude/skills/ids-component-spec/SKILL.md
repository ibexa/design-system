---
name: ids-component-spec
description: Turn a design (screenshots or a Figma frame) into a reviewable Ibexa Design System component spec — anatomy, ids-* class plan, props for both React and Twig, token mapping, test plan. Use when asked to spec/analyze a new DS/IDS component design, or as phase 1 of ids-new-component.
---

# Component spec from a design

Produce `docs/components/<name>.spec.md` (in the React repo, on the feature branch) from
the design input. The spec is the single contract both the React and Twig implementations
are built from, and the artifact the user approves at Gate 1.

## Steps

1. **Capture the input.**
   - Screenshots: save/copy them to the session scratchpad; the primary one becomes
     `_reference.png` (used later by visual verification). Ask for the intended scale
     (1× or 2×) and any states not shown (hover, focus, disabled, empty, overflow).
   - Figma: follow [references/figma-extraction.md](references/figma-extraction.md) —
     pull structure, variable names, and a 2× PNG export as `_reference.png`.

2. **Collision check first.** List `packages/components/src/components/` here and
   `src/lib/Twig/Components/` in the Twig repo. If the design is plausibly a variant of an
   existing component, say so and stop for re-scoping — do not spec a duplicate.

3. **Ground the token mapping.** Run:
   ```bash
   node .claude/skills/ids-component-spec/scripts/list-tokens.mjs [filter]
   ```
   Map every color/font value in the design to a real token name. Match Figma **variable
   names** to token names first; fall back to nearest-value matching only with a ⚠ flag.
   There are no spacing tokens — spacing is `calculateRem(<px>)` from measured values.

4. **Write the spec** using [references/spec-template.md](references/spec-template.md) —
   every section, explicit "none" where empty. The §2 `ids-*` class plan must be complete
   enough that two independent implementations emit identical classes.

5. **Present for Gate 1**: file path + naming, prop table, ⚠ token flags, and the §10 open
   questions as a numbered list to answer.

## Rules

- Never invent props "for flexibility" — spec only what the design and stated requirements
  need. Extending later is cheap; removing shipped props is not.
- Enums for closed value sets (sizes, variants) — named in the spec, mirrored by Twig
  `OptionsResolver` allowed values.
- Raw hex/px in the implementation is forbidden; the spec's token table is where every
  visual value gets its name.
- React `children`/ReactNode props must map to Twig blocks — note each mapping in §3.
