# Repo discovery — locating the three IDS workspaces

The component pipeline spans three checkouts. Never hardcode absolute user paths in code,
docs, or specs — resolve them at runtime with this procedure and refer to them by these names:

| Name | What it is | How to recognize it |
|---|---|---|
| `IDS_REACT_ROOT` | React design system (this repo — checkout folder name varies per developer) | root `package.json` with `"name": "@ibexa/design-system"` |
| `IDS_TWIG_ROOT` | Twig design system bundle | `composer.json` with `"name": "ibexa/design-system-twig"` |
| `IDS_DXP_ROOT` | Ibexa DXP project (composer root with `vendor/ibexa/*`) | has `vendor/ibexa/admin-ui` and `vendor/ibexa/design-system-twig` |

## Resolution order

1. **Env vars** (highest priority): `IDS_REACT_ROOT`, `IDS_TWIG_ROOT`, `IDS_DXP_ROOT`.
   Developers set them once in the gitignored `.claude/settings.local.json` of the repo they
   work from:

   ```json
   {
       "env": {
           "IDS_DXP_ROOT": "/Users/<me>/Sites/my-dxp-checkout"
       }
   }
   ```

2. **Identify the current repo** by its manifest (table above). The repo you were started in
   is usually one of the three.

3. **Derive the missing ones:**
   - `IDS_TWIG_ROOT` = `<IDS_DXP_ROOT>/vendor/ibexa/design-system-twig` (the standard layout;
     verify with its `composer.json` name).
   - From a DXP or Twig checkout → `IDS_REACT_ROOT`: follow the symlinks that
     `bin/prepare_ds_symlinks.mjs` creates —
     `readlink <IDS_DXP_ROOT>/vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/ids-components`
     resolves to `<IDS_REACT_ROOT>/packages/components` on any machine set up for DS development.
   - From the React repo → `IDS_DXP_ROOT`: there is no reliable breadcrumb (only a URL in
     `.storybook/.env.local`), so go to step 4.

4. **Ask once, persist.** If a root is still unknown, ask the user for the path, validate it
   against the manifest check above, and offer to append it to the `env` block of
   `.claude/settings.local.json` so it is never asked again.

Do **not** scan the filesystem (`find / …`) and do not commit machine-specific paths to any
tracked file.

## Fewer permission prompts (one-time, per developer)

Repo-independent commands (yarn/composer checks, the skill scripts) are pre-allowed in each
repo's committed `.claude/settings.json`. Cross-repo file access can't be committed (paths
are machine-specific) — add it to your `.claude/settings.local.json` `permissions.allow`
alongside the `env` block, e.g. working from the React repo:

```json
"Read(//<IDS_DXP_ROOT>/**)",
"Edit(//<IDS_TWIG_ROOT>/**)",
"Write(//<IDS_TWIG_ROOT>/**)"
```

(with the placeholders expanded to your real absolute paths).

## Preflight (before each pipeline phase)

For every repo the phase will touch:

- `git branch --show-current` — DS work happens on feature branches (`IBX-<ticket>-<slug>`)
  cut from `ds-development`. If the repo sits on an unexpected branch, stop and ask.
- `git status --porcelain` — report pre-existing dirty state before adding to it; never
  revert or clean up files you did not create.
- Never commit or push; end each phase with a per-repo summary of changed files.
