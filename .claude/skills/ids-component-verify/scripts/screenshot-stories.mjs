#!/usr/bin/env node
// Screenshots every preview story of a component from a running (or auto-started)
// Storybook, for visual comparison against a design reference image.
//
// Usage (run from IDS_REACT_ROOT so node_modules/playwright resolves):
//   node .claude/skills/ids-component-verify/scripts/screenshot-stories.mjs <Component> [options]
//
//   <Component>          component folder name, e.g. Badge (matches importPath)
//   --out <dir>          output dir (default: <os-tmpdir>/ids-visual/<Component>)
//   --url <base>         Storybook base URL (default: http://localhost:6006)
//   --viewport <WxH>     viewport size (default: 1200x800)
//   --scale <n>          deviceScaleFactor; use 2 to match 2x Figma exports (default: 2)
//   --hover <selector>   also capture a variant with this element hovered
//   --focus <selector>   also capture a variant with this element focused
//   --twig               render the Twig counterpart via the framework-selector addon
//                        (requires STORYBOOK_TWIG_COMPONENTS_BASE_URL + a running DXP)
//   --story <id>         only this story id (repeatable)
//
// If Storybook is not reachable, the script starts `yarn storybook --ci` in the
// background, waits for readiness, and LEAVES IT RUNNING for further iterations
// (PID + log path are printed — kill it yourself when done).

import { spawn } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../../../..');
const require = createRequire(path.join(REPO_ROOT, 'package.json'));
const { chromium } = require('playwright');

const STORYBOOK_START_TIMEOUT_MS = 180_000;
const POLL_INTERVAL_MS = 2_000;
const RENDER_SETTLE_MS = 300;

const parseArgs = (argv) => {
    const args = { component: undefined, stories: [], viewport: '1200x800', scale: '2', url: 'http://localhost:6006' };
    const valueFlags = ['out', 'url', 'viewport', 'scale', 'hover', 'focus', 'story'];

    for (let index = 0; index < argv.length; index += 1) {
        const arg = argv[index];

        if (arg === '--twig') {
            args.twig = true;
        } else if (arg.startsWith('--')) {
            const flag = arg.slice(2);

            if (!valueFlags.includes(flag)) {
                throw new Error(`Unknown option: ${arg}`);
            }

            index += 1;

            if (flag === 'story') {
                args.stories.push(argv[index]);
            } else {
                args[flag] = argv[index];
            }
        } else if (!args.component) {
            args.component = arg;
        } else {
            throw new Error(`Unexpected argument: ${arg}`);
        }
    }

    if (!args.component && args.stories.length === 0) {
        throw new Error('Pass a component name (e.g. Badge) or --story <id>.');
    }

    return args;
};

const fetchIndex = async (baseUrl) => {
    try {
        const response = await fetch(`${baseUrl}/index.json`);

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch {
        return null;
    }
};

const startStorybook = async (baseUrl, outDir) => {
    const logPath = path.join(outDir, 'storybook.log');
    const logFd = fs.openSync(logPath, 'a');
    const child = spawn('yarn', ['storybook', '--ci'], {
        cwd: REPO_ROOT,
        detached: true,
        stdio: ['ignore', logFd, logFd],
    });

    child.unref();
    console.log(`Storybook not running — started it (pid ${child.pid}, log: ${logPath}).`);
    console.log('It stays up for further iterations; kill it when done.');

    const deadline = Date.now() + STORYBOOK_START_TIMEOUT_MS;

    while (Date.now() < deadline) {
        const index = await fetchIndex(baseUrl);

        if (index) {
            return index;
        }

        await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    }

    throw new Error(`Storybook did not become ready within ${STORYBOOK_START_TIMEOUT_MS / 1000}s — check ${logPath}`);
};

const main = async () => {
    const args = parseArgs(process.argv.slice(2));
    const outDir = path.resolve(args.out ?? path.join(os.tmpdir(), 'ids-visual', args.component ?? 'stories'));

    fs.mkdirSync(outDir, { recursive: true });

    let index = await fetchIndex(args.url);

    if (!index) {
        index = await startStorybook(args.url, outDir);
    }

    const entries = Object.values(index.entries).filter((entry) => {
        if (entry.type !== 'story' || entry.importPath.includes('.test.stories')) {
            return false;
        }

        if (args.stories.length > 0) {
            return args.stories.includes(entry.id);
        }

        return entry.importPath.includes(`/components/${args.component}/`);
    });

    if (entries.length === 0) {
        const available = [...new Set(Object.values(index.entries).map((entry) => entry.importPath))].sort().join('\n  ');

        throw new Error(`No stories matched. Available importPaths:\n  ${available}`);
    }

    const [width, height] = args.viewport.split('x').map(Number);
    const browser = await chromium.launch();
    const failures = [];

    for (const entry of entries) {
        // Fresh page per story: Storybook's SPA remembers the last story and can interrupt
        // a same-page navigation with a redirect back to it (races the goto).
        // ignoreHTTPSErrors: the Twig preview DXP typically runs on https with a self-signed cert.
        const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: Number(args.scale), ignoreHTTPSErrors: true });
        const storyUrl = new URL(`${args.url}/iframe.html`);

        storyUrl.searchParams.set('id', entry.id);
        storyUrl.searchParams.set('viewMode', 'story');

        if (args.twig) {
            storyUrl.searchParams.set('globals', 'frameworkSelector:twig');
        }

        // NOT 'networkidle' — the dev server's HMR websocket keeps the network busy forever.
        await page.goto(storyUrl.toString(), { waitUntil: 'load' });
        await page.addStyleTag({ content: '* { animation: none !important; transition: none !important; caret-color: transparent !important; }' });

        try {
            await page.waitForSelector('#storybook-root > *', { timeout: 30_000 });
        } catch {
            failures.push(`${entry.id}: #storybook-root stayed empty (broken story or wrong id)`);
            await page.close();
            continue;
        }

        const errorText = await page.evaluate(() => {
            const isErrorShown = document.body.classList.contains('sb-show-errordisplay');
            const message = document.querySelector('#error-message')?.textContent?.trim();

            return isErrorShown ? (message ?? 'unknown Storybook error') : null;
        });

        if (errorText) {
            failures.push(`${entry.id}: Storybook error overlay — ${errorText.split('\n')[0]}`);
            await page.close();
            continue;
        }

        let twigFrame = null;

        if (args.twig) {
            const twigFrameElement = await page.waitForSelector('iframe.twig-preview', { timeout: 15_000 }).catch(() => null);

            twigFrame = await twigFrameElement?.contentFrame();

            const twigContent = twigFrame ? await twigFrame.waitForSelector('.component-preview', { timeout: 15_000 }).catch(() => null) : null;

            if (!twigContent) {
                failures.push(`${entry.id}: Twig preview iframe empty — is the DXP running and the preview route available?`);
                await page.close();
                continue;
            }
        }

        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(RENDER_SETTLE_MS);

        const capture = async (suffix, interact) => {
            if (interact) {
                await interact();
                await page.waitForTimeout(RENDER_SETTLE_MS);
            }

            // Twig mode: crop to the component inside the nested DXP iframe, not the full-width iframe.
            const target = twigFrame ? await twigFrame.$('.component-preview') : await page.$('#storybook-root');
            const filePath = path.join(outDir, `${entry.id}${suffix}${args.twig ? '.twig' : ''}.png`);

            await target.screenshot({ path: filePath });
            console.log(filePath);
        };

        await capture('');

        if (args.hover) {
            await capture('.hover', () => page.hover(args.hover));
        }

        if (args.focus) {
            await capture('.focus', () => page.focus(args.focus));
        }

        await page.close();
    }

    await browser.close();

    if (failures.length > 0) {
        console.error(`\n${failures.length} story(ies) FAILED to render:\n  ${failures.join('\n  ')}`);
        process.exit(1);
    }

    console.log(`\nDone — ${entries.length} story(ies) captured to ${outDir}`);
};

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
