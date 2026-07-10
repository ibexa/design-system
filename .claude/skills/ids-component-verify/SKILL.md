---
name: ids-component-verify
description: Verify an Ibexa Design System component — static checks in both repos plus a visual loop that screenshots Storybook stories and compares them against the design reference image. Use after implementing/changing a DS component, or as phases 3/5 of ids-new-component.
---

# DS component verification

Two halves: the **visual loop** (React side, against the design reference) and **static
checks** (both repos). Run the visual loop during/after the React phase; run the full check
set at the end.

## Visual loop

One-time setup per machine: `npx playwright install chromium` (from the React repo root;
needed again after Playwright version bumps).

```bash
cd <IDS_REACT_ROOT>
node .claude/skills/ids-component-verify/scripts/screenshot-stories.mjs <Name> \
    --out <scratchpad>/ids-visual/<Name>
```

The script reuses a running Storybook or starts one (`--ci`, background, left running —
kill the printed PID when fully done). It enumerates the component's preview stories from
`/index.json` (never guess story IDs), fails loudly on broken stories or the Storybook error
overlay, and captures `#storybook-root` per story at `--scale 2` (matching 2× Figma
exports). `--hover <sel>` / `--focus <sel>` capture state variants; `--viewport WxH`
overrides the default 1200x800.

Then: Read `_reference.png` and each capture, compare using the rubric in
[references/visual-review-guide.md](references/visual-review-guide.md), fix SCSS/markup,
re-run. **Hard cap: 3 iterations**, then present both images side by side to the user and
let them call it — do not chase pixel noise.

## Static checks

React repo root:

```bash
yarn components:test && yarn core:test
yarn prettier --check packages/assets/src/scss/_<name>.scss
yarn components:build && yarn assets:build
yarn test-storybook <Name>        # play tests; needs Storybook running
git diff --check
```

(If a full `yarn packages:test` fails in files you didn't touch, check whether the failure
pre-dates your change before reacting — never "fix" unrelated files as a drive-by.)

Twig repo: run `ids-component-twig/references/checks.md` in full.

## Twig visual check

Add `--twig` to the script to capture the same stories rendered by the real Twig
components (via a DXP running `ibexa/design-system-storybook`) — captures land as
`<id>.twig.png` next to the React ones for direct comparison. Setup preconditions and the
failure checklist: [references/twig-visual.md](references/twig-visual.md). The Twig
integration test asserting the spec's `ids-*` classes remains the hard parity gate.
