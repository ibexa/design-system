#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const getConfigFileContent = () => {
    const configFilePath = path.resolve('tsconfig.json');

    if (!fs.existsSync(configFilePath)) {
        throw new Error('tsconfig.json not found.');
    }

    const content = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));

    return content;
};
const saveConfigFileContent = (content) => {
    const configFilePath = path.resolve('tsconfig.json');
    const contentJSON = JSON.stringify(content, null, 4);

    fs.writeFileSync(configFilePath, `${contentJSON}\n`, 'utf-8');
};

execSync('composer install', { stdio: 'inherit', cwd: process.cwd() });
execSync('yarn ibexa-generate-tsconfig --use-relative-paths', { stdio: 'inherit', cwd: process.cwd() });

const currDir = path.dirname(fileURLToPath(import.meta.url));
const componentsPath = path.resolve(currDir, '../packages/components/src');
const isDev = fs.existsSync(componentsPath);
const dirName = isDev ? 'src' : 'dist';
const packageJsonContent = getConfigFileContent();
const packagesToReplace = ['assets', 'components', 'core'];

packagesToReplace.forEach((packageName) => {
    packageJsonContent.compilerOptions.paths[`@ids-${packageName}/*`] = [
        `./node_modules/@ibexa/design-system/packages/${packageName}/${dirName}/*`,
    ];
});

saveConfigFileContent(packageJsonContent);

/* eslint-disable no-console */
console.log(
    '\x1b[32m%s\x1b[0m',
    '+------------------------------------------+',
);
console.log(
    '\x1b[32m%s\x1b[0m',
    '|  Dev environment prepared successfully.  |',
);
console.log(
    '\x1b[32m%s\x1b[0m',
    '+------------------------------------------+',
);
