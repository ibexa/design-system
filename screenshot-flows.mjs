import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const BASE = 'http://localhost:6006/iframe.html?id=mockups-ai-agents--default&viewMode=story';
const OUT  = './screenshots';

if (!existsSync(OUT)) await mkdir(OUT);

const browser = await chromium.launch({ channel: 'chrome' });
const page    = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

async function shot(name) {
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
    console.log(`  ✓ ${name}`);
}

async function waitReady() {
    await page.waitForSelector('text=AI Agents', { timeout: 15000 });
    await page.waitForTimeout(400);
}

// ── Load story ──────────────────────────────────────────────────────────────
console.log('Loading story…');
await page.goto(BASE);
await waitReady();

// 1. Agent list
await shot('01-list-view');

// ── Edit view ────────────────────────────────────────────────────────────────

// 2. Edit Translation Agent (config tab, scope nodes)
console.log('Opening Translation Agent…');
await page.locator('[aria-label="Edit Translation Agent"]').click();
await page.waitForSelector('text=Translation Agent', { timeout: 5000 });
await page.waitForTimeout(400);
await shot('02-edit-config-scope-nodes');

// 3. Switch scope to "By rules"
await page.locator('button', { hasText: 'By rules' }).click();
await page.waitForTimeout(300);
await shot('03-edit-config-scope-rules');

// 4. Results tab (Translation Agent has 2 entries incl. 1 conflict)
await page.locator('button', { hasText: /Results/ }).click();
await page.waitForTimeout(400);
await shot('04-edit-activity-log');

// 5. Expand a preview entry
const expandBtn = page.locator('[title]').filter({ has: page.locator('button') }).first();
// Find a caret button in the activity feed and click it to expand
const carets = page.locator('main button').filter({ has: page.locator('svg') });
// The expand buttons are after conflict/preview items — click the last caret-style button in the feed
const allButtons = await page.locator('main button').all();
// Find the expand chevron: it's a small button with no aria-label near an activity card
for (const btn of allButtons.reverse()) {
    const label = await btn.getAttribute('aria-label');
    if (!label) {
        const box = await btn.boundingBox();
        if (box && box.width < 40 && box.height < 40) {
            await btn.click();
            break;
        }
    }
}
await page.waitForTimeout(300);
await shot('05-edit-activity-entry-expanded');

// 6. Back to list, then open SEO Optimizer (has scope conflicts badge on activity tab)
await page.locator('[title="Back to agents list"]').click();
await page.waitForSelector('text=AI Agents', { timeout: 5000 });
await page.locator('[aria-label="Edit SEO Optimizer"]').click();
await page.waitForTimeout(400);
await shot('06-edit-seo-config');

// 7. SEO results tab (conflict badge visible)
await page.locator('button', { hasText: /Results/ }).click();
await page.waitForTimeout(400);
await shot('07-edit-seo-activity-with-conflicts');

// ── Delete flow ──────────────────────────────────────────────────────────────

// 8. Delete modal — triggered from Edit sidebar
await page.locator('button', { hasText: 'Configuration' }).click();
await page.waitForTimeout(300);
await page.locator('button', { hasText: 'Delete agent' }).last().click();
await page.waitForTimeout(400);
await shot('08-delete-modal');

// dismiss
await page.locator('button', { hasText: 'Cancel' }).click();
await page.waitForTimeout(300);

// Back to list (from SEO edit)
await page.locator('[title="Back to agents list"]').click();
await page.waitForSelector('text=AI Agents', { timeout: 5000 });
await page.waitForTimeout(300);

// 9. Delete modal from list row
await page.locator('[aria-label="Delete Image Alt Text"]').click();
await page.waitForTimeout(400);
await shot('09-delete-modal-error-agent');

await page.locator('button', { hasText: 'Cancel' }).click();
await page.waitForTimeout(300);

// ── Create flow ──────────────────────────────────────────────────────────────

await page.locator('button', { hasText: 'Create agent' }).click();
await page.waitForSelector('text=Create agent', { timeout: 5000 });
await page.waitForTimeout(400);

// 10. Create step 1 — no blueprint selected
await shot('10-create-step1-empty');

// 11. Create step 1 — blueprint selected
await page.locator('button', { hasText: 'SEO Optimizer' }).click();
await page.waitForTimeout(300);
await shot('11-create-step1-selected');

// 12. Create step 2 — configure scope
await page.locator('button', { hasText: 'Continue' }).click();
await page.waitForTimeout(400);
await shot('12-create-step2-scope');

// 13. Create step 2 — with some scope selections
await page.locator('label', { hasText: 'Blog' }).click();
await page.waitForTimeout(200);
await page.locator('label', { hasText: /^Products$/ }).click();
await page.waitForTimeout(200);
await shot('13-create-step2-scope-selected');

// 14. Create step 3 — review
await page.locator('button', { hasText: 'Review' }).click();
await page.waitForTimeout(400);
await shot('14-create-step3-review');

// 15. After creation — list with notification
await page.locator('button', { hasText: 'Create agent' }).last().click();
await page.waitForTimeout(600);
await shot('15-list-after-create-notification');

// ── Inactive / error agent edit ──────────────────────────────────────────────

// 16. GEO agent (inactive, no scope)
await page.locator('[aria-label="Edit GEO Personalization Agent"]').click();
await page.waitForTimeout(400);
await shot('16-edit-geo-inactive-empty-scope');

await browser.close();
console.log(`\nDone — ${OUT}/`);