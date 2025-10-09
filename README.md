# Ibexa Design System

## Using dev version in Ibexa DXP

In Ibexa DXP root directory run command
```
yarn [path to design system root]/bin/prepare_ds_symlinks.mjs
```
This command replaces design system directories from admin-ui-assets with symlinks to this repository.
It also updates `ibexa.tsconfig.json` file with aliases to this repository.

### Using Ibexa DXP on different port than localhost:8000

By default Storybook tests if there's running instance on `http://localhost:8000`. In order to change it, create file `.env.local` in main storybook directory.
```
TWIG_COMPONENTS_BASE_URL=[url to your DXP instance]
```

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