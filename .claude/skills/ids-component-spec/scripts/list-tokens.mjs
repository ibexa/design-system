#!/usr/bin/env node
// Dumps the design-token tables from packages/assets/src/scss/variables/*.scss
// so token mapping in component specs is grounded in real names, not guesses.
//
// Usage (from anywhere):
//   node <IDS_REACT_ROOT>/.claude/skills/ids-component-spec/scripts/list-tokens.mjs [filter]
//
//   filter — optional case-insensitive substring, e.g. "primary" or "font-size"

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, '../../../..');
const VARIABLES_DIR = path.join(REPO_ROOT, 'packages/assets/src/scss/variables');

const filter = (process.argv[2] ?? '').toLowerCase();

if (!fs.existsSync(VARIABLES_DIR)) {
    console.error(`Token directory not found: ${VARIABLES_DIR}`);
    process.exit(1);
}

const parseTokens = (scss) => {
    const withoutComments = scss.replace(/\/\/[^\n]*/g, '');
    const tokens = [];
    const declarationRegex = /\$([\w-]+)\s*:\s*([\s\S]*?)\s*!default\s*;/g;
    let match;

    while ((match = declarationRegex.exec(withoutComments)) !== null) {
        const value = match[2].replace(/\s+/g, ' ').trim();

        tokens.push({ name: `$${match[1]}`, value });
    }

    return tokens;
};

const files = fs
    .readdirSync(VARIABLES_DIR)
    .filter((file) => file.endsWith('.scss'))
    .sort();

let total = 0;

for (const file of files) {
    const tokens = parseTokens(fs.readFileSync(path.join(VARIABLES_DIR, file), 'utf-8')).filter(
        ({ name, value }) => !filter || name.toLowerCase().includes(filter) || value.toLowerCase().includes(filter),
    );

    if (tokens.length === 0) {
        continue;
    }

    const nameWidth = Math.max(...tokens.map(({ name }) => name.length));

    console.log(`\n## ${file}\n`);

    for (const { name, value } of tokens) {
        console.log(`${name.padEnd(nameWidth)}  ${value}`);
    }

    total += tokens.length;
}

console.log(`\n${total} token(s)${filter ? ` matching "${filter}"` : ''}.`);
console.log('Note: there are no dedicated spacing tokens — spacing uses calculateRem(<px>) with px values from the design.');
