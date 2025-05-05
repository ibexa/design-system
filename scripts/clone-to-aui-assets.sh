#!/bin/bash

rm -rf $1/vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-assets;
rm -rf $1/vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-components;

cp -r packages/assets $1/vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-assets;
cp -r packages/components $1/vendor/ibexa/admin-ui-assets/src/bundle/Resources/public/vendors/design-system-components;
