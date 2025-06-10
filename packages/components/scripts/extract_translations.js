const fs = require('fs');
const { parse } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { jsToXliff12 } = require('xliff');

const files = fs.globSync('./src/**/*.{ts,tsx,js,jsx}');
const translations = {
    resources: {
        ibexa_react_components: {},
    },
    sourceLanguage: 'en',
    targetLanguage: 'en',
};

files.forEach((filepath) => {
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    const ast = parse(fileContent, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
        presets: ['@storybook/react-webpack5/preset'],
    });

    traverse(ast, {
        Identifier(path) {
            if (path.node.name !== 'trans') {
                return;
            }

            const { type, object } = path.container;

            if (type !== 'MemberExpression' || object.type !== 'Identifier' || object.name !== 'Translator') {
                return;
            }

            const parentCallExpresion = path.findParent((parentPath) => parentPath.isCallExpression());

            if (!parentCallExpresion) {
                return;
            }

            const translationKeyNode = parentCallExpresion.node.arguments[0];
            const translationEntry = {
                key: translationKeyNode.value,
                message: translationKeyNode.value,
            };

            if (translationKeyNode.leadingComments.length === 1) {
                const comment = translationKeyNode.leadingComments[0].value;
                const translationRegex = new RegExp('@Desc\\(\\"(.*?)\\"\\)');
                const regexMatch = translationRegex.exec(comment);

                if (regexMatch?.[1]) {
                    translationEntry.message = regexMatch[1];
                }
            }

            translations.resources.ibexa_react_components[translationEntry.key] = {
                source: translationEntry.message,
                target: translationEntry.message,
            };
        },
    });
});

jsToXliff12(translations).then((xliffFileContent) => {
    fs.writeFileSync('./assets/translations.xliff', xliffFileContent, 'utf-8');

    console.log('Updated translations.'); // eslint-disable-line no-console
});
