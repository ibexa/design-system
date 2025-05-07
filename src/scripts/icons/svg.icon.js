import fs from 'fs';
import path from 'path';

import { JSDOM } from 'jsdom';

import { countArrayElements } from './helpers.js';
import config from './config.ts';

export default class SVGIcon {
    constructor(filepath) {
        const fileContent = fs.readFileSync(filepath, { encoding: 'utf-8' });

        this.filepath = filepath;
        this.domContent = new JSDOM(fileContent, { contentType: 'image/svg+xml' });
    }

    getSVGDOMElement() {
        return this.domContent.window.document.querySelector('svg');
    }

    getID() {
        return path.parse(this.filepath).name;
    }

    getForbiddenAttributesData = () => {
        const output = [];
        const forbiddenAttributes = config.get('forbiddenAttributes');

        forbiddenAttributes.forEach((attribute) => {
            const elementsWithForbiddenArguments = this.domContent.window.document.querySelectorAll(`[${attribute}]`);

            if (elementsWithForbiddenArguments.length === 0) {
                return;
            }

            const tagNames = Array.from(elementsWithForbiddenArguments).map((node) => node.tagName);
            const tagNamesCounted = countArrayElements(tagNames);

            output.push({
                attribute,
                elements: tagNamesCounted,
            });
        });

        return output;
    };
}
