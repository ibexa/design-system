const path = require('path');

module.exports = (Encore) => {
    Encore.addAliases({
        '@ds-assets': path.resolve(__dirname, '../../packages/assets/src'),
        '@ds-components': path.resolve(__dirname, '../../packages/components/src'),
    });
};
