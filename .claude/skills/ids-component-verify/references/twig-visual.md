# Twig visual check

**Works end-to-end** (verified 2026-07-10): `screenshot-stories.mjs --twig` captures the
component rendered by the real Twig implementation, server-side, through Storybook's
framework-selector addon → a DXP running the `ibexa/design-system-storybook` package.
React and Twig captures land side by side (`<id>.png` vs `<id>.twig.png`) for comparison.

The PHPUnit integration test asserting the spec §2 `ids-*` classes remains the hard parity
gate; the visual check catches what class parity can't (wrong markup nesting, missing
sub-elements, asset issues).

## One-time DXP setup

1. `composer require ibexa/design-system-storybook` in the DXP project (currently
   `dev-sixth-version` from github.com/ibexa/design-system-storybook); bundle lands in
   `config/bundles.php` automatically.
2. **The package has no Flex recipe — the route import must be created by hand** (a plain
   404 on `/storybook/status` means this is missing):

   ```yaml
   # <IDS_DXP_ROOT>/config/routes/ibexa_design_system_storybook.yaml
   ibexa.design_system_storybook:
       resource: '@IbexaDesignSystemStorybookBundle/Resources/config/routing.yaml'
   ```

   No siteaccess whitelist — the preview is self-contained (renders the bundle's own
   templates, no repository content) and must be reachable anonymously; putting it behind
   the admin siteaccess breaks the Storybook iframe (302 → login, and cross-origin iframes
   don't carry the admin session cookie).
3. `php bin/console cache:clear`, then verify:
   `curl -sk https://localhost:8060/storybook/status` → **204**.

## One-time design-system-60 setup

Set the DXP base URL in the **gitignored** `.env.local` (the tracked `.env` keeps the
default; don't commit machine URLs):

```
STORYBOOK_TWIG_COMPONENTS_BASE_URL=https://localhost:8060
```

Use **https** if the DXP redirects http (check with curl). **Restart Storybook after any
change** — the env var is baked into the preview bundle at dev-server start; a stale
instance keeps the old value. Self-signed certificates are fine (the script passes
`ignoreHTTPSErrors`).

## How it works

- `--twig` adds `globals=frameworkSelector:twig` to the story URL; the decorator replaces
  the React render with an iframe at
  `<base>/storybook/preview/<title-minus-"components/src/">?properties=<json>&customParameters=<json>`.
- Server side, `ComponentsResolver` maps that id to the `ibexa:*` component
  (`components/Tag` → `ibexa:tag`; compound names via its explicit map) and renders it with
  the passed props inside `.component-preview`; the script crops the capture to that element.
- ReactNode args arrive as `renderToString` HTML (`children` → the `content` block) — which
  is why spec §3 must map ReactNode props to Twig blocks.

## Failure checklist (in order)

`.env.local` set → Storybook restarted since → DXP responds
(`curl -sk <base>/storybook/status` = 204; 404 = route import missing; 302 = auth in the
way) → design-system-twig checked out on the branch containing the component → for brand-new
compound components (`ibexa:foo:bar`), `ComponentsResolver::CUSTOM_COMPONENTS_MAP` in the
design-system-storybook package may need a new entry (simple `PascalCase → snake_case` names
resolve automatically).
