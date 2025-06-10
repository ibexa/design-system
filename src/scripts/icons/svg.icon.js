import fs from 'fs';
import path from 'path';

import { JSDOM } from 'jsdom';
import prettier from 'prettier';

import { countArrayElements } from './helpers.js';
import config from './config.js';

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

    removeAttributes = () => {
        this.hasRemovedAttributes = false;

        const forbiddenAttributes = config.get('forbiddenAttributes');
        const omitForbiddenIconsIcons = config.get('omitForbiddenIconsIcons');

        if (omitForbiddenIconsIcons.includes(this.getID())) {
            return this;
        }

        const selector = forbiddenAttributes.map((attribute) => `[${attribute}]`).join(',');
        const svgDOMElement = this.getSVGDOMElement();
        const elementsToModify = Array.from(svgDOMElement.querySelectorAll(selector));

        if (forbiddenAttributes.find((attribute) => svgDOMElement.hasAttribute(attribute))) {
            elementsToModify.unshift(svgDOMElement);
        }

        elementsToModify.forEach((node) => {
            forbiddenAttributes.forEach((attribute) => {
                node.removeAttribute(attribute);

                this.hasRemovedAttributes = true;
            });
        });

        svgDOMElement.removeAttribute('width');
        svgDOMElement.removeAttribute('height');

        return this;
    };

    prettiefyHTML(output) {
        return prettier.format(output, { parser: 'html' });
    }

    async generateHTML() {
        const svgDOMElement = this.getSVGDOMElement();
        let outputHTML = svgDOMElement.outerHTML;
        outputHTML = await this.prettiefyHTML(outputHTML);

        this.html = outputHTML;
    }

    saveFile() {
        fs.writeFileSync(this.filepath, this.html);
    }
}
