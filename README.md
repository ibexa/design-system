# Ibexa Design System

## Using dev version in Ibexa DXP

### Change aliases for TS configuration
In Ibexa DXP root directory edit `ibexa.tsconfig.json` and add two routes in TS config:
```
"paths": {
    "@ids-assets/*": [
        "[path to Ibexa Design System directory]/packages/assets/src/*"
    ],
    "@ids-components/*": [
        "[path to Ibexa Design System directory]/packages/components/src/*"
    ]
}
```
This will overwrite default TS aliases pointing to modules inside `ibexa/admin-ui-assets` bundle.

### Change aliases for webpack
In Ibexa DXP root directory edit `ibexa.webpack.config.js` and add import:
```
const createDevAliases = require('../bundles/design-system/scripts/symfony/create-dev-aliases.cjs'); 
```
and then add
```
createDevAliases(Encore);
```
after
```
configSetups.forEach((configSetupPath) => {
    const setupConfig = require(configSetupPath);

    setupConfig(Encore);
});
```
This will overwrite default webpack aliases defined in `ibexa/admin-ui-assets` bundle with paths pointing to this module packages.

## Preparing tag for release

To prepare a tag for release you have to run the following command from the root directory of the module:

```
sh bin/prepare_release.sh -v 1.0.0 -b main
```

Options:
1. -v : tag to be released
1. -b : branch used to create the tag

## COPYRIGHT

Copyright (C) 1999-2025 Ibexa AS (formerly eZ Systems AS). All rights reserved.

## LICENSE

This source code is available separately under the following licenses:

A - Ibexa Business Use License Agreement (Ibexa BUL),
version 2.4 or later versions (as license terms may be updated from time to time)
Ibexa BUL is granted by having a valid Ibexa DXP (formerly eZ Platform Enterprise) subscription,
as described at: https://www.ibexa.co/product
For the full Ibexa BUL license text, please see:
https://www.ibexa.co/software-information/licenses-and-agreements (latest version applies)

AND

B - GNU General Public License, version 2
Grants an copyleft open source license with ABSOLUTELY NO WARRANTY. For the full GPL license text, please see:
https://www.gnu.org/licenses/old-licenses/gpl-2.0.html