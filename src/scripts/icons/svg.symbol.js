import { JSDOM } from 'jsdom';

import config from './config.js';

export default class SVGSymbol {
    constructor() {
        const { window } = new JSDOM();

        this.domElement = window.document.createElementNS('http://www.w3.org/2000/svg', 'symbol');

        return this;
    }

    setId(id) {
        this.domElement.id = id;

        return this;
    }

    fillSymbolAttributesFromSVG(svgDOMElement) {
        Array.from(svgDOMElement.attributes).forEach(({ name, value }) => {
            if (name === 'width' || name === 'height') {
                return;
            }

            this.domElement.setAttribute(name, value);
        });

        return this;
    }

    fillContentFromSVG(svgDOMElement) {
        Array.from(svgDOMElement.children).forEach((node) => {
            this.domElement.append(node);
        });

        return this;
    }

    removeAttributes = () => {
        this.hasRemovedAttributes = false;

        const forbiddenAttributes = config.get('forbiddenAttributes');
        const selector = forbiddenAttributes.map((attribute) => `[${attribute}]`).join(',');
        const elementsToModify = Array.from(this.domElement.querySelectorAll(selector));

        if (forbiddenAttributes.find((attribute) => this.domElement.hasAttribute(attribute))) {
            elementsToModify.unshift(this.domElement);
        }

        elementsToModify.forEach((node) => {
            forbiddenAttributes.forEach((attribute) => {
                node.removeAttribute(attribute);

                this.hasRemovedAttributes = true;
            });
        });

        return this;
    };
}
