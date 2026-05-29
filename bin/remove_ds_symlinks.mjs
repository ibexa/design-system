#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const getTargetPaths = () => {
    const composerJsonFilePath = path.resolve('composer.json');
    const composerJsonContent = JSON.parse(fs.readFileSync(composerJsonFilePath, 'utf-8'));
    const vendorDir = composerJsonContent.config?.['vendor-dir'] || 'vendor';
    const assetsDirPath = path.join(vendorDir, 'ibexa/admin-ui-assets/src/bundle/Resources/public/vendors');

    return [
        path.join(assetsDirPath, 'ids-assets'),
        path.join(assetsDirPath, 'ids-components'),
        path.join(assetsDirPath, 'ids-core'),
    ];
};

const removeSymlink = (targetPath) => {
    if (!fs.existsSync(targetPath)) {
        return { targetPath, status: 'missing' };
    }

    const targetStats = fs.lstatSync(targetPath);

    if (!targetStats.isSymbolicLink()) {
        return { targetPath, status: 'not-a-symlink' };
    }

    fs.unlinkSync(targetPath);

    return { targetPath, status: 'removed' };
};

const results = getTargetPaths().map(removeSymlink);

/* eslint-disable no-console */
console.log(
    '\x1b[32m%s\x1b[0m',
    '+-----------------------------------------------------------------+',
);
results.forEach(({ targetPath, status }) => {
    const message = {
        removed: `Removed symlink: ${targetPath}`,
        missing: `Skipped missing path: ${targetPath}`,
        'not-a-symlink': `Skipped non-symlink path: ${targetPath}`,
    }[status];

    console.log('\x1b[32m%s\x1b[0m', message);
});
console.log(
    '\x1b[32m%s\x1b[0m',
    '+-----------------------------------------------------------------+',
);
