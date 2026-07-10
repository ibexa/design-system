# Visual review guide

You are comparing a rendered Storybook capture against a design export. The goal is
**structural fidelity, not pixel identity** — the two images come from different renderers
and will never be byte-identical.

## Rubric (check in this order)

1. **Layout & spacing** — padding, gaps, alignment, overall proportions. Measure in the
   image (2× scale: 1 design px = 2 image px) and compare against the `calculateRem(<px>)`
   values in the SCSS.
2. **Shape** — border radius, border width, size of the element relative to its content.
3. **Color — by token, not by eye.** If the background looks off, check which `$color-*`
   token the SCSS uses vs what spec §5 says; verify the token, don't eyedrop pixels
   (macOS color profiles shift hues slightly between a Figma export and a headless-Chromium
   capture). Only escalate a color mismatch when the *token* is wrong or a ⚠ mapping looks
   clearly different in relationship (e.g. lighter than its border when the design shows darker).
4. **Typography** — size, weight, line-height, truncation/wrapping behavior.
5. **Sub-components** — icons present and sized right, badges/chips composed correctly.
6. **States** — hover/focus/disabled captures (via `--hover`/`--focus` or dedicated
   stories) against their design frames, if provided.

## Known false alarms — do not "fix" these

- Slight hue/saturation drift (color profile) when the token is correct.
- Font antialiasing and sub-pixel width differences.
- Storybook canvas padding/background differing from the Figma frame's surroundings.
- Placeholder content differing from design copy (unless the spec says otherwise).
- Fonts: if text metrics look wildly off, check the capture actually rendered Manrope —
  a fallback font at screenshot time means the wait failed, not that the CSS is wrong
  (the script awaits `document.fonts.ready`, but verify before touching SCSS).
- Missing icons usually mean the sprite wasn't regenerated
  (`node scripts/icons.js generate-all-icons`), not a component bug.

## Iteration protocol

- Fix the biggest structural mismatch first; one category per iteration; re-run the script
  (assets SCSS changes hot-reload through the Storybook dev build).
- **After 3 iterations, stop.** Present reference + latest captures side by side (file
  paths), list what still differs and why, and let the user decide. A human eyeballing two
  images resolves in seconds what pixel-chasing burns an hour on.
