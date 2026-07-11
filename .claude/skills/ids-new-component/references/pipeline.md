# Pipeline details

## Gate mechanics

- **Gate 1 — spec approval.** Present the spec file path plus a short summary: proposed
  names, prop table, token ⚠ flags, and the §10 open questions. The gate is passed when the
  user has answered every open question and said the spec is good. Changes here are free;
  changes later are rework in two repos.
- **Gate 2 — visual sign-off.** Show the reference image and the captured story screenshots
  side by side (file paths so the user can open them). State what intentionally differs
  (viewport padding, placeholder content). Approving locks the contract for the Twig phase.
  The user may skip this gate by asking for "fast mode" — note the skip in the final report.
  Optional but recommended: publish an HTML comparison page as an Artifact (reference vs
  React vs Twig captures embedded as data URIs, one row per story) — a far better review
  surface than a list of file paths.
- **Gate 3 — DXP usage example.** Only after explicit confirmation of: target package
  (e.g. `admin-ui`), the concrete view/template to touch, and the branch. Follow the
  conventions of that package; run its `yarn test` after. Translations happen HERE
  (`|trans|desc` in the consuming package) — never inside DS components.

## Spec-drift rule

Implementation always surfaces things the spec missed (a prop that needs a default, a state
the design didn't show). The procedure is always:

1. Stop; update `docs/components/<name>.spec.md`.
2. If the change touches the contract (props, allowed values, `ids-*` classes, DOM shape) —
   tell the user (mini Gate 1) before continuing.
3. Apply to BOTH implementations if the other one already exists.

## Phase-end report (every phase)

- Per repo: branch + list of created/modified files.
- Checks run and their results (verbatim failures — never paraphrase a failing test as "minor").
- Anything deferred, skipped, or flagged.
- Hygiene sweep: no stray artifacts in repo roots (`.playwright-mcp/`, logs, scratch
  scripts) — captures and temp files belong in the session scratchpad; anything mutated
  outside the two DS repos (e.g. DXP built assets) is called out explicitly.

## Branching

Standard flow: feature branch `IBX-<ticket>-<slug>` cut from `ds-development`, same name in
each touched repo (the React DS repo, design-system-twig, and the DXP package for Gate 3).
Create branches only with user confirmation (asked once in "Before anything").

## Director mode (future)

When a less-technical user drives the pipeline: same gates, but Gate 2's side-by-side images
become the primary review; summarize the spec in plain language at Gate 1; skip Gate 3 by
default. Nothing else changes.
