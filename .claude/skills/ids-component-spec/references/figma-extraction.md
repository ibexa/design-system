# Figma extraction

## One-time setup (per developer)

Install the official Figma plugin for Claude Code (remote MCP server, OAuth — needs a Figma
account with access to the design file; Dev Mode features need a Dev/Full seat):

```
claude plugin install figma@claude-plugins-official
```

Then in Claude Code run `/mcp`, select figma, and authenticate. Alternative (org setups
without the remote server): Figma **desktop** app → open the file → Dev Mode → enable the
local MCP server, then `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp`.

If neither is available, fall back to screenshots — the pipeline works identically, just
with more measuring.

## What to pull for a component spec

Input: a Figma frame/node URL from the user (contains the `node-id`).

1. **Structure** — the node tree of the frame: layer names, nesting, auto-layout direction,
   padding/gap values, corner radii. This drives spec §2 (anatomy) and spacing values.
2. **Variables/styles** — for every fill, stroke, text style: the **variable name**
   (e.g. `color/primary/100`), not just the resolved hex. Variable names map to SCSS tokens
   (`$color-primary-100`) far more reliably than nearest-value color matching. Record both
   name and resolved value in spec §5.
3. **Variants** — if the node is a component set, enumerate its variant properties and
   values; they usually map 1:1 to the spec §4 matrix and to the props enums.
4. **Image export** — a **2× PNG** of the frame, saved to the scratchpad as `_reference.png`
   (matches the screenshot script's default `--scale 2`). Export each distinct variant/state
   frame if available.
5. **Text content** — real strings used in the design (helps stories look right).

## Cautions

- Unpublished/local variables may come through as raw values — flag those rows ⚠ in §5.
- Figma spacing is in px at 1× — use the numbers directly with `calculateRem(<px>)`.
- Detached instances lie: check whether a sub-element is an existing IDS component
  (icon, badge, button) rather than new markup — compose, don't redraw (spec §1).
