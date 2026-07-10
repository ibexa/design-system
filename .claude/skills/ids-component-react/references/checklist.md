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
      their markup. Translations come in as props (see `TranslatorContext` usage in
      `Accordion.tsx` only for context-provided strings).
- [ ] No magic numbers (ESLint enforces; extract named constants).

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

## 7. Path aliases

Only if a new alias is introduced (rare): update **both** `tsconfig.json` `paths` and
`.storybook/main.js` webpack `resolve.alias` — they must stay in sync.

## 8. Done means

All four check commands from SKILL.md pass, Storybook renders every story without the error
overlay, and the emitted DOM classes match spec §2 exactly (the Twig phase depends on it).
