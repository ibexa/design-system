---
name: ids-new-component
description: End-to-end pipeline for adding a NEW Ibexa Design System component from a design — screenshot(s) or Figma frame in, React component (design-system-60) + Twig component (design-system-twig) + stories + tests + visual verification out. Use whenever asked to create/implement/build a new DS/IDS component from a design, mockup, screenshot, or Figma link.
---

# New IDS component pipeline

You are implementing one design-system component twice — React and Twig — from a single
approved spec. The spec, not the design image and not the React source, is the contract.

## Before anything

1. Resolve the three workspace roots and run preflight per
   [references/repo-discovery.md](references/repo-discovery.md).
2. Confirm with the user: target ticket number (`IBX-…`) and whether feature branches should
   be created (from `ds-development`) or work goes on the current branches.

## Phases and gates

| # | Phase | Skill to follow | Gate |
|---|---|---|---|
| 1 | Spec from design input | `ids-component-spec` | **Gate 1 (mandatory):** user approves `docs/components/<name>.spec.md`, incl. every open question answered |
| 2 | React implementation | `ids-component-react` | — |
| 3 | Visual verification loop | `ids-component-verify` | **Gate 2:** side-by-side reference vs rendered stories; user signs off (skippable only if the user says "fast mode") |
| 4 | Twig implementation | `ids-component-twig` | — (checks + integration test suffice; the contract was locked at Gate 2) |
| 5 | Static checks both repos | `ids-component-verify` | — |
| 6 | (optional) Usage example in a DXP package | see [references/pipeline.md](references/pipeline.md) | **Gate 3:** confirm target package/view/branch before touching `vendor/ibexa/*` |

Details, the spec-drift rule, and phase-end reporting: [references/pipeline.md](references/pipeline.md).

## Hard rules

- **Spec drift reopens Gate 1.** Any change to the contract (props, `ids-*` classes, variants)
  discovered during phases 2–5 goes back into the spec and back to the user — in both
  implementations, never in just one.
- Never commit or push in any repo. End every phase with a per-repo list of changed files.
- The Twig phase implements the spec, not the React code — then diffs its emitted classes
  against both.
- If the design is a variant of an existing component (spec §1 collision check), stop and
  re-scope with the user instead of building a duplicate.
