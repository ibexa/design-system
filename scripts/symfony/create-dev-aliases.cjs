const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@ids-assets': path.resolve(__dirname, '../../packages/assets/src'),
        '@ids-components': path.resolve(__dirname, '../../packages/components/src'),
        '@ids-core': path.resolve(__dirname, '../../packages/core/src'),
    });
};
