#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const getSourceDir = (packageName) => {
    const currFileDir = path.dirname(fileURLToPath(import.meta.url));
    const dsDir = path.join(currFileDir, '..');

    return path.join(dsDir, 'packages', packageName);
}
const createSymlink = (source, target) => {
    execSync(`mkdir -p ${target} && rm -rf ${target} && ln -s ${source} ${target}`);
}
const createSymlinks = () => {
    const composerJsonFilePath = path.resolve('composer.json');
    const composerJsonContent = JSON.parse(fs.readFileSync(composerJsonFilePath, 'utf-8'));
    const vendorDir = composerJsonContent.config?.['vendor-dir'] || 'vendor';
    const assetsDirPath = path.join(vendorDir, 'ibexa/admin-ui-assets/src/bundle/Resources/public/vendors');

    const componentsSourcePath = getSourceDir('components');
    const coreSourcePath = getSourceDir('core');
    const assetsSourcePath = getSourceDir('assets');
    const componentsSymlinkPath = path.join(assetsDirPath, 'ids-components');
    const coreSymlinkPath = path.join(assetsDirPath, 'ids-core');
    const assetsSymlinkPath = path.join(assetsDirPath, 'ids-assets');

    createSymlink(assetsSourcePath, assetsSymlinkPath);
    createSymlink(componentsSourcePath, componentsSymlinkPath);
    createSymlink(coreSourcePath, coreSymlinkPath);
}

createSymlinks();

/* eslint-disable no-console */
console.log(
    '\x1b[32m%s\x1b[0m',
    '+-----------------------------------------------------------------+',
);
console.log(
    '\x1b[32m%s\x1b[0m',
    '|                 Symlinks created successfully.                  |',
);
console.log(
    '\x1b[32m%s\x1b[0m',
    '|   Go to admin-ui-assets/src/bundle/Resources/public/vendors     |',
);
console.log(
    '\x1b[32m%s\x1b[0m',
    '|  and double check if directories ids-X are properly symlinked.  |',
);
console.log(
    '\x1b[32m%s\x1b[0m',
    '+-----------------------------------------------------------------+',
);
