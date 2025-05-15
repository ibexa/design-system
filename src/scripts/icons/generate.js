import fs from 'fs';

import SVGSymbol from './svg.symbol.js';
import SVGIcon from './svg.icon.js';
import SVGAllIcons from './svg.all.icons.js';
import config from './config.js';
import { getIconsList, changeFileExtension } from './helpers.js';

export const generateCleanIconsFiles = async () => {
    const iconsList = getIconsList();

    await iconsList.forEach(async (filepath) => {
        const svgIcon = new SVGIcon(filepath);

        svgIcon.removeAttributes();
        await svgIcon.generateHTML();
        svgIcon.saveFile();
    });

    console.log('\x1b[32m%s\x1b[0m', 'Clean SVG icons generated successfully'); // eslint-disable-line no-console
};

export const generateAllIconsFile = async () => {
    const showWarnings = config.get('showWarnings');
    const outputPathAllIcons = config.get('outputPathAllIcons');
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

    console.log('\x1b[32m%s\x1b[0m', `SVG with all icons generated successfully in ${outputPathAllIcons}`); // eslint-disable-line no-console
};

export const generateJSONIconsList = () => {
    const iconsList = getIconsList();
    const iconsNamesList = iconsList.map((filepath) => {
        const svgIcon = new SVGIcon(filepath);
        const id = svgIcon.getID();

        return id;
    });
    const iconsNamesListStringified = JSON.stringify(iconsNamesList, null, 2);
    const iconsJSONFile = changeFileExtension(config.get('outputPathAllIcons'), 'json');

    fs.writeFileSync(iconsJSONFile, iconsNamesListStringified);

    console.log('\x1b[32m%s\x1b[0m', `JSON with icons list generated successfully in ${iconsJSONFile}`); // eslint-disable-line no-console
};
