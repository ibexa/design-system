import fs from 'fs';
import path from 'path';

import config from './config.ts';

export const getIconsList = () => {
    const inputPath = config.get('inputPath');
    const filesInDir = fs.readdirSync(inputPath);
    const svgFiles = filesInDir.filter((filename) => filename.endsWith('.svg'));
    const fullpathSvgFiles = svgFiles.map((filename) => path.resolve(inputPath, filename));

    return fullpathSvgFiles;
};

export const countArrayElements = (array) => {
    return array.reduce((output, current) => {
        output[current] ??= 0;
        output[current]++;

        return output;
    }, {});
};
