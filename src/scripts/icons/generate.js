import SVGSymbol from './svg.symbol.js';
import SVGIcon from './svg.icon.js';
import SVGAllIcons from './svg.all.icons.js';
import config from './config.ts';
import { getIconsList } from './helpers.js';

export const generateAllIconsFile = async () => {
    const showWarnings = config.get('showWarnings');
    const iconsList = getIconsList();

    const svgAllIcons = new SVGAllIcons();

    iconsList.forEach((filepath) => {
        const svgIcon = new SVGIcon(filepath);
        const svgDOMElement = svgIcon.getSVGDOMElement();
        const id = svgIcon.getID();
        const symbolElement = new SVGSymbol();

        symbolElement.setId(id).fillSymbolAttributesFromSVG(svgDOMElement).fillContentFromSVG(svgDOMElement).removeAttributes();

        if (symbolElement.hasRemovedAttributes && showWarnings) {
            console.warn('\x1b[33m%s\x1b[0m', `Icon "${id}" has attributes that were set as forbidden!`);
        }

        svgAllIcons.addSymbol(symbolElement);
    });

    await svgAllIcons.generateHTML();
    svgAllIcons.saveFile();
};
