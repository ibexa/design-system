#! /bin/sh
# Script to prepare design system module release

[ ! -f "bin/prepare_release.sh" ] && echo "This script has to be run the root of the bundle" && exit 1

print_usage()
{
    echo "Create a new version of design system module by creating a local tag"
    echo "This script MUST be run from the bundle root directory. It will create"
    echo "a tag but this tag will NOT be pushed"
    echo ""
    echo "Usage: $1 -v <version> -b <branch>"
    echo "-v : where version will be used to create the tag"
    echo "-b : branch which will be used to create the tag"
}

VERSION=""
BRANCH=""
while getopts ":h:v:b:" opt ; do
    case $opt in
        v ) VERSION=$OPTARG ;;
        b ) BRANCH=$OPTARG ;;
        h ) print_usage "$0"
            exit 0 ;;
        * ) print_usage "$0"
            exit 2 ;;
    esac
done

[ -z "$BRANCH" ] && print_usage "$0" && exit 2
[ -z "$VERSION" ] && print_usage "$0" && exit 2

check_command()
{
    $1 --version 2>&1 > /dev/null
    check_process "find '$1' in the PATH, is it installed?"
}

check_process()
{
    [ $? -ne 0 ] && echo "Fail to $1" && exit 3
}

check_command "git"
check_command "yarn"

ASSETS_DIR="packages/assets"
COMPONENTS_DIR="packages/components"

CURRENT_BRANCH=`git branch | grep '*' | cut -d ' ' -f 2`
TMP_BRANCH="version_$VERSION"
TAG="v$VERSION"

echo "# Switching to $BRANCH and updating"
git checkout -q $BRANCH > /dev/null && git pull > /dev/null
check_process "switch to $BRANCH"

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

echo "# Creating the custom branch: $TMP_BRANCH"
git checkout -q -b "$TMP_BRANCH" > /dev/null
check_process "create the branch '$TMP_BRANCH'"

echo "# Commiting"
git add .storybook packages scripts src stories types tsconfig.json eslint.config.js > /dev/null
git add packages/**/dist -f > /dev/null
git commit -q -m "Version $VERSION"
check_process "commit the assets"

echo "# Tagging $TAG"
git tag "$TAG"
check_process "to tag the version '$TAG'"

echo "# Switching back to '$CURRENT_BRANCH'"
git checkout -q "$CURRENT_BRANCH" > /dev/null
check_process "to switch back to '$CURRENT_BRANCH'"

echo "# Removing the custom branch '$TMP_BRANCH'"
git branch -D "$TMP_BRANCH" > /dev/null
check_process "to remove the branch '$TMP_BRANCH'"

echo ""
echo "The tag '$TAG' has been created, please check that everything is correct"
echo "then you can run:"
echo "  git push origin $TAG"
echo "and create the corresponding release on Github"
echo "https://github.com/ibexa/design-system/releases"
