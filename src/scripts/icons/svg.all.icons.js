import fs from 'fs';

import { JSDOM } from 'jsdom';
import prettier from 'prettier';

import config from './config.ts';

export default class SVGAllIcons {
    constructor() {
        const { window } = new JSDOM();

        this.domElement = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        this.domElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.domElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

        return this;
    }

    addSymbol(symbol) {
        this.domElement.append(symbol.domElement);
    }

    addXMLTag(output) {
        return `<?xml version="1.0" encoding="utf-8"?>${output}`;
    }

    prettiefyHTML(output) {
        return prettier.format(output, { parser: 'html' });
    }

    async generateHTML() {
        let outputHTML = this.domElement.outerHTML;
        outputHTML = this.addXMLTag(outputHTML);
        outputHTML = await this.prettiefyHTML(outputHTML);

        this.html = outputHTML;
    }

    saveFile() {
        const outputPathAllIcons = config.get('outputPathAllIcons');

        fs.writeFileSync(outputPathAllIcons, this.html);
    }
}
