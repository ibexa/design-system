#!/usr/bin/env node
// Finds SCSS declarations of a component that have no visual effect: for every CSS
// declaration targeting `.ids-<name>`, toggle it off in the live CSSOM, screenshot, and
// pixel-compare. A declaration that changes nothing in ANY preview story is a redundancy
// candidate (e.g. it restates a value already inherited from `_root.scss` globals).
//
// Usage (run from the React DS repo root, Storybook must be running or will be started
// by screenshot-stories.mjs first):
//   node .claude/skills/ids-component-verify/scripts/audit-styles.mjs <Component> [--url <base>]
//
// Output: per declaration — NEEDED (visual effect in ≥1 story), REDUNDANT? (no effect in
// any story), or UNCHECKED (pseudo-class/stateful rules a static screenshot can't exercise).
// Treat REDUNDANT? as candidates for removal, not verdicts: a declaration may matter for
// content/states no story covers.

import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../../../..');
const require = createRequire(path.join(REPO_ROOT, 'package.json'));
const { chromium } = require('playwright');

const RENDER_SETTLE_MS = 200;
const UNCHECKABLE_PSEUDO = /:hover|:focus|:active|:disabled|:focus-visible|:focus-within/;

const parseArgs = (argv) => {
    const args = { url: 'http://localhost:6006' };

    for (let index = 0; index < argv.length; index += 1) {
        if (argv[index] === '--url') {
            index += 1;
            args.url = argv[index];
        } else if (!args.component) {
            args.component = argv[index];
        }
    }

    if (!args.component) {
        throw new Error('Pass a component name, e.g. Switcher');
    }

    return args;
};

const main = async () => {
    const args = parseArgs(process.argv.slice(2));
    const blockSelector = `.ids-${args.component.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
    const indexResponse = await fetch(`${args.url}/index.json`);

    if (!indexResponse.ok) {
        throw new Error(`Storybook not reachable at ${args.url} — start it first (yarn storybook --ci).`);
    }

    const index = await indexResponse.json();
    const stories = Object.values(index.entries).filter(
        (entry) => entry.type === 'story' && !entry.importPath.includes('.test.stories') && entry.importPath.includes(`/components/${args.component}/`),
    );

    if (stories.length === 0) {
        throw new Error(`No preview stories found for ${args.component}`);
    }

    const browser = await chromium.launch();
    // declarationKey -> { neededIn: [storyId...], seen: true }
    const results = new Map();
    const unchecked = new Set();
    const shared = new Set();
    // Every comma-separated selector part must target this component; otherwise the rule
    // also serves other components (e.g. @extend output like `.ids-tag, .ids-chip`) and
    // "no effect in these stories" would NOT make it safe to remove.
    const isOwnRule = (selectorText) => selectorText.split(',').every((part) => part.includes(blockSelector));

    for (const story of stories) {
        const page = await browser.newPage({ viewport: { width: 900, height: 600 } });

        await page.goto(`${args.url}/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: 'load' });
        await page.waitForSelector('#storybook-root > *', { timeout: 30_000 });
        await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; caret-color: transparent !important; }' });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(RENDER_SETTLE_MS);

        const declarations = await page.evaluate((selector) => {
            const found = [];

            const walkRules = (rules, sheetIndex) => {
                for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex += 1) {
                    const rule = rules[ruleIndex];

                    if (rule.cssRules) {
                        walkRules(rule.cssRules, sheetIndex);
                    }

                    if (!rule.selectorText || !rule.selectorText.includes(selector)) {
                        continue;
                    }

                    for (const property of rule.style) {
                        found.push({ selector: rule.selectorText, property });
                    }
                }
            };

            for (let sheetIndex = 0; sheetIndex < document.styleSheets.length; sheetIndex += 1) {
                try {
                    walkRules(document.styleSheets[sheetIndex].cssRules, sheetIndex);
                } catch {
                    // cross-origin sheet — ignore
                }
            }

            return found;
        }, blockSelector);

        const root = await page.$('#storybook-root');
        const baseline = await root.screenshot();

        for (const declaration of declarations) {
            const key = `${declaration.selector} { ${declaration.property} }`;

            if (!isOwnRule(declaration.selector)) {
                shared.add(key);
                continue;
            }

            if (UNCHECKABLE_PSEUDO.test(declaration.selector)) {
                unchecked.add(key);
                continue;
            }

            if (!results.has(key)) {
                results.set(key, { neededIn: [] });
            }

            // Already proven needed elsewhere — skip the screenshot for speed.
            if (results.get(key).neededIn.length > 0) {
                continue;
            }

            const toggled = await page.evaluate(({ selector, property }) => {
                const walkAndToggle = (rules) => {
                    for (const rule of rules) {
                        if (rule.cssRules && walkAndToggle(rule.cssRules)) {
                            return true;
                        }

                        if (rule.selectorText === selector && rule.style.getPropertyValue(property)) {
                            const value = rule.style.getPropertyValue(property);
                            const priority = rule.style.getPropertyPriority(property);

                            rule.style.removeProperty(property);
                            window.__auditRestore = () => rule.style.setProperty(property, value, priority);

                            return true;
                        }
                    }

                    return false;
                };

                for (const sheet of document.styleSheets) {
                    try {
                        if (walkAndToggle(sheet.cssRules)) {
                            return true;
                        }
                    } catch {
                        // cross-origin sheet — ignore
                    }
                }

                return false;
            }, declaration);

            if (!toggled) {
                continue;
            }

            const shot = await root.screenshot();

            await page.evaluate(() => window.__auditRestore?.());

            if (!shot.equals(baseline)) {
                results.get(key).neededIn.push(story.id);
            }
        }

        await page.close();
    }

    await browser.close();

    const needed = [...results.entries()].filter(([, value]) => value.neededIn.length > 0);
    const redundant = [...results.entries()].filter(([, value]) => value.neededIn.length === 0);

    console.log(`\nAudited ${results.size} declarations across ${stories.length} stories.\n`);
    console.log(`REDUNDANT? (${redundant.length}) — no visual effect in any story; removal candidates:`);
    redundant.forEach(([key]) => console.log(`  ${key}`));
    console.log(`\nUNCHECKED (${unchecked.size}) — pseudo-class/state rules, verify manually with --hover/--focus captures:`);
    unchecked.forEach((key) => console.log(`  ${key}`));
    console.log(`\nSKIPPED as shared (${shared.size}) — selectors also serving other components (e.g. @extend output); not audited.`);
    console.log(`\nNEEDED: ${needed.length} declarations confirmed to have visual effect.`);
};

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
