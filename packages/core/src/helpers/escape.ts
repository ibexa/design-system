export const escapeHTML = (string: string) => {
    const stringTempNode = document.createElement('div');

    stringTempNode.appendChild(document.createTextNode(string));

    return stringTempNode.innerHTML;
};
