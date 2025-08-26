const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

if (!packageJson.exports) {
    console.error('No exports field found in package.json'); // eslint-disable-line no-console
    process.exit(1);
}

Object.entries(packageJson.exports).forEach(([key, value]) => {
    const distPath = value.replace('./src/', './dist/');

    packageJson.exports[key] = distPath;
});

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Updated package.json with exports field.'); // eslint-disable-line no-console
