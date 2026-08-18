# Change Log

All notable changes to the "text-case-converter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.1] - 2026-08-18

First release published to the VS Code Marketplace. This entry summarizes all significant changes since the initial 0.0.1 version.

### Added

- New case formats: PascalCase, CONSTANT_CASE, kebab-case, Train-Case, and Sentence case — 10 formats in total.
- Unified Unicode-aware word tokenizer (`splitToWords`) shared by all converters, with consistent word-boundary rules: lowercase-to-uppercase (`helloWorld`), acronym runs (`HTTPServer` → `HTTP Server`), letter-to-digit (`version2` → `Version 2`), and any non-alphanumeric separator.
- Complete unit test suite for the converters — 38 tests covering every format, the boundary rules, and Unicode input (`test/unit/converters.test.js`).
- Integration smoke tests verifying extension activation and registration of all 10 commands.
- CI workflow running lint, unit tests, and packaging on pushes to `master` and pull requests, plus an auto-publish workflow that releases to the VS Code Marketplace when a `v*` tag is pushed.
- Extension icon (512×512) shown in the VS Code Marketplace and the extension view.
- Command category "Text Case Converter" for all commands, with context menu entries shown only when there is a selection (`editorHasSelection`).

### Fixed

- `snakeCase` produced wrong output for camelCase input (`helloWorld` now correctly becomes `hello_world`).
- `camelCase` now normalizes the first letter (`Hello` becomes `hello`, not `helloHello`).
- Inconsistent separator handling — any non-alphanumeric character is now treated as a word boundary by the unified tokenizer.
- `titleCase` now handles hyphenated words, digits, and accented characters (`e-mail` → `E Mail`, `version2` → `Version 2`, `à la carte` → `À La Carte`).
- The editor edit operation is now properly `await`ed and its success/failure is propagated; failures now surface an error message.
- A warning is now shown instead of silently failing when no active editor is available.
- No test coverage since 0.0.1 — the converters and extension activation are now covered by automated tests.
- Dev dependencies bumped to patched versions, resolving 26 reported dependency advisories (`yarn audit` reports 0 remaining).

### Changed

- Refactored to registry-driven command registration so all 10 commands share a single conversion path.
- README updated to accurately document the requirements (VS Code ^1.79.0), all 10 commands, and the Marketplace release workflow.
- Cleaner VSIX packaging — `test/`, `.github/`, `yarn.lock`, and other development artifacts are excluded from the published package.

### Removed

- Committed repository artifacts: the `text-case-converter-0.0.1.vsix` package and `yarn-error.log`.
- The `vsc-extension-quickstart.md` template.
- The unused `typescript` dev dependency.
