---
name: extract-component
description: Step-by-step guide for extracting a reusable component from a mockup story into the design system component library. Invoke only when explicitly asked to create a new component.
---

# Extract Component from Mockup

Use this skill when asked to pull a UI pattern from a mockup story (`stories/*.stories.tsx`) into a proper design system component.

## 1. Identify the Candidate

Before writing code, answer these questions:

- **Does it appear in more than one mockup, or will it?** Single-use UI is not a component.
- **Is it self-contained?** It should not need business logic or API calls baked in.
- **What are its props?** List them. If you can't, it isn't ready to be a component yet.
- **Does something close already exist?** Check `packages/components/src/components/`. Extend before creating.

Assumption checkpoint: state the component name, its props, and its variants before writing any file. Ask if unsure.

---

## 2. File Structure

Every component lives in its own directory:

```
packages/components/src/components/ComponentName/
├── index.ts
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.stories.tsx
└── ComponentName.test.stories.tsx
```

SCSS lives separately:

```
packages/assets/src/scss/_component-name.scss   ← kebab-case
```

---

## 3. Types File (`ComponentName.types.ts`)

```ts
import { BaseComponentAttributes } from '@ids-types/general';

export enum ComponentNameSize {
    Medium = 'medium',
    Small = 'small',
}

export enum ComponentNameVariant {
    Primary = 'primary',
    Secondary = 'secondary',
}

export interface ComponentNameProps extends BaseComponentAttributes {
    // required props first, optional last
    label: string;
    size?: ComponentNameSize;
    variant?: ComponentNameVariant;
    onClick: () => void;   // onClick is NOT optional on interactive components
}
```

Rules:
- Always extend `BaseComponentAttributes` (provides `className`, `aria-*`, etc.)
- Use **enums** for any variant/size option — no raw string literals in props
- Use discriminated unions when a prop combination is mutually exclusive
- Export every enum and interface — consumers need them

---

## 4. Component (`ComponentName.tsx`)

```tsx
import React from 'react';

import { createCssClassNames } from '@ids-core';

import { ComponentNameProps, ComponentNameSize, ComponentNameVariant } from './ComponentName.types';

export const ComponentName = ({
    className = '',
    label,
    size = ComponentNameSize.Medium,
    variant = ComponentNameVariant.Primary,
    onClick,
}: ComponentNameProps) => {
    const componentClassName = createCssClassNames({
        'ids-component-name': true,
        [`ids-component-name--${size}`]: true,
        [`ids-component-name--${variant}`]: true,
        [className]: !!className,
    });

    return (
        <div className={componentClassName} onClick={onClick} role="button" tabIndex={0}>
            {label}
        </div>
    );
};
```

Rules:
- **Named export only** — no `export default`
- Sub-element rendering → private `renderXxx()` functions inside the component
- Use `createCssClassNames` for all class assembly — never string concatenation
- CSS classes: `ids-` prefix + BEM (`ids-block__element--modifier`)
- Import other DS components via `@ids-components/ComponentName` (not relative paths)

---

## 5. SCSS (`packages/assets/src/scss/_component-name.scss`)

```scss
@use 'variables' as *;
@use 'functions' as *;

.ids-component-name {
    // base styles

    &--small {
        // size modifier
    }

    &--primary {
        // variant modifier
    }

    // PR #100 baseline: use attribute selectors, NOT .ids-*--disabled class selectors
    &[disabled],
    &[aria-disabled='true'] {
        opacity: 0.4;
        pointer-events: none;
        cursor: not-allowed;
    }
}
```

Then register it in `packages/assets/src/scss/styles.scss`:

```scss
@use 'component-name';   // add in alphabetical order
```

---

## 6. `index.ts`

```ts
export * from './ComponentName';
export * from './ComponentName.types';
```

Then add one line to `packages/components/src/components/index.ts` (alphabetical order):

```ts
export * from './ComponentName';
```

---

## 7. Stories (`ComponentName.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from '@storybook/addon-actions';

import { ComponentName, ComponentNameSize, ComponentNameVariant } from '.';

const meta: Meta<typeof ComponentName> = {
    component: ComponentName,
    tags: ['autodocs', 'foundation'],
    argTypes: {
        onClick: { action: 'clicked' },
    },
};

export default meta;

type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
    name: 'Default',
    args: {
        label: 'Label',
        onClick: action('onClick'),
    },
};

export const Small: Story = {
    name: 'Small',
    args: {
        label: 'Label',
        size: ComponentNameSize.Small,
        onClick: action('onClick'),
    },
};
```

---

## 8. Test Stories (`ComponentName.test.stories.tsx`)

```tsx
import { expect, fn, userEvent, within } from '@storybook/test';
import type { StoryObj } from '@storybook/react-webpack5';

import { ComponentName } from '.';

type Story = StoryObj<typeof ComponentName>;

export const ClickTest: Story = {
    name: 'Click interaction',
    args: {
        label: 'Click me',
        onClick: fn(),
    },
    play: async ({ args, canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Click the component', async () => {
            await userEvent.click(canvas.getByRole('button'));
        });

        await step('onClick was called', async () => {
            expect(args.onClick).toHaveBeenCalledOnce();
        });
    },
};
```

Rules:
- Use `fn()` not `action()` in test stories
- Each `play` function groups assertions with named `step()` calls
- Test the actual behavior, not internal implementation
- make sure there are endlines at the end of every file (TS, SCSS, Storybook)

---

## 9. Pre-PR Checklist

- [ ] Component renders without errors in Storybook (`yarn storybook`)
- [ ] TypeScript compiles clean (`npx tsc --noEmit`)
- [ ] All variants have a story
- [ ] Test story has at least one `play` function covering the main interaction
- [ ] SCSS follows `[disabled]` / `[aria-disabled='true']` attribute selectors (not `.ids-*--disabled`)
- [ ] Both `ComponentName.types.ts` exports and `index.ts` re-export are in place
- [ ] Root `packages/components/src/components/index.ts` updated
- [ ] `packages/assets/src/scss/styles.scss` updated
- [ ] No inline styles — all styling goes through SCSS and `createCssClassNames`
