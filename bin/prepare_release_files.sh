#! /bin/sh
# Script to prepare design system module release files

check_command()
{
    $1 --version 2>&1 > /dev/null
    check_process "find '$1' in the PATH, is it installed?"
}

check_process()
{
    [ $? -ne 0 ] && echo "Fail to $1" && exit 3
}

check_command "yarn"

ASSETS_DIR="packages/assets"
COMPONENTS_DIR="packages/components"

echo "# Removing the assets"
yarn run packages:remove-dist

echo "# Removing yarn.lock"
rm -rf "yarn.lock"

echo "# Installing dependendencies"
yarn install
yarn run packages:build

echo "# Removing Storybook and dev files"
rm -rf ".storybook" "scripts" "src" "stories" "types" "eslint.config.js" "tsconfig.json"
check_process "clean storybook dev"

echo "# Removing components dev files"
rm -rf "$COMPONENTS_DIR/scripts" "$COMPONENTS_DIR/src" "$COMPONENTS_DIR/.babelrc" "$COMPONENTS_DIR/tsconfig.build.json" "$COMPONENTS_DIR/tsconfig.json"
check_process "clean components dev"

echo "# Removing assets dev files"
rm -rf "$ASSETS_DIR/src"
check_process "clean assets dev"

exit 0
