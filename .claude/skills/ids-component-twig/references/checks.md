# design-system-twig checks

Run from `IDS_TWIG_ROOT`. All of these must pass before the phase is done; report failures
verbatim.

```bash
composer test                                   # PHPUnit (bundle, integration, lib suites)
vendor/bin/phpunit tests/integration/Twig/Components/<Name>Test.php   # focused run while iterating
composer phpstan                                # level 8; do not add to the baseline
composer check-cs                               # php-cs-fixer dry-run (composer fix-cs to apply)
yarn test                                       # prettier + eslint for the TS assets
git diff --check                                # trailing whitespace / conflict markers
```

Notes:

- PHPUnit boots `tests/integration/IbexaTestKernel.php` (KERNEL_CLASS is set in
  `phpunit.xml.dist`) — no app needed; components render inside the test kernel.
- PHPStan findings in YOUR new files must be fixed, not baselined
  (`phpstan-baseline.neon` is for pre-existing debt only).
- If `composer test` fails on tests you didn't touch, check the branch/baseline state
  before assuming your change caused it — but never silently ignore a failure; report it.
- Translations: if the component has translated internal defaults, the
  `tests/integration/TranslationTest.php` suite will catch missing entries.
