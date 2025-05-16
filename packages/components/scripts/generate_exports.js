const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const contextDistPath = path.resolve(__dirname, '../dist/context');
const packageJsonPath = path.resolve(__dirname, '../package.json');

const PATHS_TO_EXCLUDE = ['context', 'internal'];

const componentsPaths = fs.readdirSync(distPath);
const contextComponentsPaths = fs.readdirSync(contextDistPath);

const packageJsonExports = {};

componentsPaths
    .filter((name) => !PATHS_TO_EXCLUDE.includes(name))
    .forEach((name) => {
        packageJsonExports[`./${name}`] = `./dist/${name}/index.js`;
    });

contextComponentsPaths.forEach((name) => {
    packageJsonExports[`./context/${name}`] = `./dist/context/${name}/index.js`;
});

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

packageJson.exports = packageJsonExports;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Updated package.json with exports field.'); // eslint-disable-line no-console
