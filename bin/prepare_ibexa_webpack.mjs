#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import minimist from 'minimist';

const getArgument = (argName, defaultValue = null) => {
    const args = minimist(process.argv.slice(2));

    return args[argName] || defaultValue;
}
const generateRandomString = () => {
    const randomString = (Math.random() + 1).toString(36).substring(2, 7);

    return randomString;
};
const getIbexaConfigFilename = () => {
    let filename;

    do {
        filename = `ibexa.webpack.config.${generateRandomString()}.js`;
    } while (fs.existsSync(path.resolve(filename)));

    return filename;
};
const getScripts = (commandName, webpackFilename) => {
    return {
        [`${commandName}:dev`]: `encore dev --config ./${webpackFilename}`,
        [`${commandName}:watch`]: `encore dev --watch --config ./${webpackFilename}`,
        [`${commandName}:build`]: `encore production --config ./${webpackFilename}`,
    }
}
const getSourceDir = (packageName) => {
    const currFileDir = path.dirname(fileURLToPath(import.meta.url));
    const dsDir = path.join(currFileDir, '..');

    return path.join(dsDir, 'packages', packageName, 'src');
}
const updatePackageJsonFile = (webpackFilename, commandName) => {
    const packageJsonFilePath = path.resolve('package.json');
    const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonFilePath, 'utf-8'));
    const newScripts = getScripts(commandName, webpackFilename);

    packageJsonContent.scripts = {
        ...packageJsonContent.scripts,
        ...newScripts,
    };

    fs.writeFileSync(packageJsonFilePath, JSON.stringify(packageJsonContent, null, 2));
};
const updateIbexaTSConfigFile = () => {
    const tsConfigFilePath = path.resolve('ibexa.tsconfig.json');
    const tsConfigContent = JSON.parse(fs.readFileSync(tsConfigFilePath, 'utf-8'));

    if (!tsConfigContent.compilerOptions) {
        tsConfigContent.compilerOptions = {};
    }
    if (!tsConfigContent.compilerOptions.paths) {
        tsConfigContent.compilerOptions.paths = {};
    }
    tsConfigContent.compilerOptions.paths['@ids-assets/*'] = [
        `${getSourceDir('assets')}/*`,
    ];
    tsConfigContent.compilerOptions.paths['@ids-components/*'] = [
        `${getSourceDir('components')}/*`,
    ];
    tsConfigContent.compilerOptions.paths['@ids-core/*'] = [
        `${getSourceDir('core')}/*`,
    ];

    fs.writeFileSync(tsConfigFilePath, JSON.stringify(tsConfigContent, null, 4));
}
const updateComposerJsonFile = (commandName) => {
    const composerJsonFilePath = path.resolve('composer.json');
    const composerJsonContent = JSON.parse(fs.readFileSync(composerJsonFilePath, 'utf-8'));
    const oldCommand = 'ibexa:encore:compile --frontend-configs-name ibexa,internals,libs,richtext';
    const newCommand = 'ibexa:encore:compile --frontend-configs-name internals,libs,richtext';
    const dsCommand = `yarn ${commandName}:dev`;

    delete composerJsonContent.scripts['auto-scripts'][oldCommand];

    composerJsonContent.scripts['auto-scripts'][newCommand] = 'symfony-cmd';
    composerJsonContent.scripts['auto-scripts'][dsCommand] = 'script';

    fs.writeFileSync(composerJsonFilePath, JSON.stringify(composerJsonContent, null, 4));
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
    const componentsSymlinkPath = path.join(assetsDirPath, 'ids-components/dist');
    const coreSymlinkPath = path.join(assetsDirPath, 'ids-core/dist');
    const assetsSymlinkPath = path.join(assetsDirPath, 'ids-assets/dist');

    createSymlink(assetsSourcePath, assetsSymlinkPath);
    createSymlink(componentsSourcePath, componentsSymlinkPath);
    createSymlink(coreSourcePath, coreSymlinkPath);

    // console.log(`mkdir -p ${componentsSymlinkPath} && ln -sf ${componentsSourcePath} ${componentsSymlinkPath}`);


    // execSync(`mkdir -p ${componentsSymlinkPath} && ln -sf ${componentsSourcePath} ${componentsSymlinkPath}`);
    // execSync(`mkdir -p ${coreSymlinkPath} && ln -sf ${coreSourcePath} ${coreSymlinkPath}`);
    // execSync(`mkdir -p ${assetsSymlinkPath} && ln -sf ${assetsSourcePath} ${assetsSymlinkPath}`);
}
const createWebpackConfigFile = (filePath) => {
    const webpackConfigFileContent = `
const path = require('path');
const allConfigs = require('@ibexa/frontend-config/webpack-config/all');
const ibexaConfig = allConfigs[0]();

allConfigs[0] = () => {
    ibexaConfig.resolve.alias['@ids-assets'] = '${getSourceDir('assets')}';
    ibexaConfig.resolve.alias['@ids-components'] = '${getSourceDir('components')}';
    ibexaConfig.resolve.alias['@ids-core'] = '${getSourceDir('core')}';

    return ibexaConfig;
};

module.exports = allConfigs;

`;

    fs.writeFileSync(filePath, webpackConfigFileContent, 'utf-8');
};

const commandDevName = getArgument('command', 'ibexa-ds');

const ibexaWebpackConfigFilename = getIbexaConfigFilename();
const ibexaWebpackConfigFilePath = path.resolve(ibexaWebpackConfigFilename);

updatePackageJsonFile(ibexaWebpackConfigFilename, commandDevName);
createWebpackConfigFile(ibexaWebpackConfigFilePath);
updateComposerJsonFile(commandDevName);
updateIbexaTSConfigFile();
createSymlinks();
