# React implementation checklist

Work through in order; exemplars beat prose — when unsure, open the named file.

## 1. `<Name>.types.ts`

- [ ] `export interface <Name>Props` — JSDoc only where a prop isn't self-explanatory.
- [ ] Closed value sets as **enums** (`export enum <Name>Size { Small = 'small', … }`) —
      values are the kebab/lower strings used in class names. Exemplar: `Button.types.ts`.
- [ ] Extend `BaseComponentAttributes` (`@ids-types/general`) for `className`/`title`/etc.
      pass-through components.

## 2. `<Name>.tsx`

- [ ] Functional component, typed props, defaults via destructuring.
- [ ] Classes via `createCssClassNames` (`@ids-core`) with a `{ 'ids-…': condition }` map —
      root block + one entry per modifier from spec §2. Exemplar: `Badge.tsx`.
- [ ] Compose existing IDS components (`@ids-components/<Name>`) instead of re-emitting
      their markup.
- [ ] Consumer-passed strings arrive translated via props; the component's own default
      user-facing strings use `TranslatorContext`:
      `Translator.trans(/*@Desc("Clear")*/ 'ids.<component>.<key>')` — never hardcoded
      English defaults. Exemplar: `ui/ClearBtn/ClearBtn.tsx`. Then run
      `yarn components:extract-translations`.
- [ ] No magic numbers (ESLint enforces; extract named constants).
- [ ] **Secondary surfaces (menus, popovers) need a full keyboard/ARIA plan**, not just
      mouse handlers: focus moves in on open, arrows traverse, Escape closes and restores
      focus, and child roles are valid for the container role (`role="menu"` accepts
      `menuitem*` children — never nest `role="radio"` in it). If the root role requires an
      accessible name, expose a prop for it (spec §7) — `title` is not an accessible name.
- [ ] No side effects during render: never write refs/state inside a render prop of a child
      (values arriving via render props become state via effects/handlers, or are computed
      at interaction time from the DOM).

## 3. Sub-components (only if spec §2 defines independent parts)

- Nested folders per part, each with the full 5-file set; parent `index.ts` re-exports.
  Exemplar: `Dropdown/DropdownSingleInput/`.

## 4. `index.ts` + barrel

- [ ] `export * from './<Name>'; export * from './<Name>.types';`
- [ ] Add `export * from './<Name>';` to `packages/components/src/components/index.ts`
      (components not listed there are not public).

## 5. SCSS partial

- [ ] `packages/assets/src/scss/_<name>.scss`; form inputs go in `inputs/_<name>.scss`.
- [ ] Header: `@use 'variables' as *;` and `@use 'functions' as *;` (relative depth for
      `inputs/`: `'../variables'`).
- [ ] `.ids-<name> { … }` with `&--modifier` / `&__element` nesting mirroring spec §2.
      Values: tokens from spec §5 + `calculateRem(<px>)`. Exemplar: `_expander.scss`.
- [ ] No declarations that restate inherited globals (`_root.scss` already sets
      font-family, letter-spacing, …) or CSS initial values. After the visual loop passes,
      run `node .claude/skills/ids-component-verify/scripts/audit-styles.mjs <Name>` and
      remove/narrow the confirmed-redundant declarations (re-run the visual check after).
- [ ] Register: `@use '<name>';` in `styles.scss` (alphabetical-ish placement with the rest).

## 6. Stories

- [ ] `<Name>.stories.tsx` — CSF3: `const meta: Meta<typeof <Name>>`, `export default meta`,
      `type Story = StoryObj<typeof <Name>>`. No explicit `title` (autotitled from path).
      `tags: ['autodocs', …]` matching neighbors. One named story per ● in spec §4;
      `argTypes` with enum options for the controls panel. Exemplar: `Badge.stories.tsx`.
- [ ] `<Name>.test.stories.tsx` — only for interactive components: `play` functions with
      `expect/fn/userEvent/within` from `storybook/test`, `tags: ['!dev']`, spies for
      callback props. Exemplar: `Accordion.test.stories.tsx`. Static components (like
      Badge) legitimately have none.
- [ ] Play tests must cover the spec §6 behaviors end-to-end — the intricate paths
      (multi-step interactions, keyboard wrapping, close-on-outside, state promotion), not
      just "the element becomes visible". If §6 describes it, a play test exercises it.

## 7. Path aliases

Only if a new alias is introduced (rare): update **both** `tsconfig.json` `paths` and
`.storybook/main.js` webpack `resolve.alias` — they must stay in sync.

## 8. Done means

All four check commands from SKILL.md pass, Storybook renders every story without the error
overlay, and the emitted DOM classes match spec §2 exactly (the Twig phase depends on it).
