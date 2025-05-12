import path from 'path';

import { generateAllIconsFile, generateJSONIconsList } from '../src/scripts/icons/generate.js';
import { testForForbiddenAttributes } from '../src/scripts/icons/test.js';
import config from '../src/scripts/icons/config.js';

config.setConfig('showWarnings', true);
config.setConfig('inputPath', path.resolve('./packages/assets/src/img/icons'));
config.setConfig('outputPathAllIcons', path.resolve('./packages/assets/src/img/all-icons.svg'));
config.setConfig('forbiddenAttributes', ['fill', 'fill-rule', 'clip-rule']);

const type = process.argv[2];

switch (type) {
    case 'test-icons':
        testForForbiddenAttributes();

        break;
    case 'generate-all-icons':
        generateAllIconsFile();
        generateJSONIconsList();

        break;
    default:
        console.error('Invalid argument. Use "test" or "generate".');

        break;
}