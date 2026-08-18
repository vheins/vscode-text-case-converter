# Change Log

All notable changes to the "text-case-converter" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.1] - 2026-08-18

### Added

- Extension icon (512x512) shown in VS Code Marketplace and extension view.

## [0.1.0] - Unreleased

### Fixed

- `snakeCase` produced wrong output for camelCase input (e.g. `helloWorld` now correctly becomes `hello_world`).
- `camelCase` now normalizes the first letter (e.g. `Hello` becomes `hello`, not `helloHello`).
- Inconsistent separator handling — any non-alphanumeric character is now treated as a word boundary by the unified tokenizer.
- `titleCase` now handles hyphenated words, digits, and accented characters (e.g. `e-mail` → `E Mail`, `version2` → `Version 2`, `à la carte` → `À La Carte`).
- The editor edit operation is now properly `await`ed and its success/failure is propagated.
- A warning is now shown instead of silently failing when no active editor is available.

### Added

- New case formats: PascalCase, CONSTANT_CASE, kebab-case, Train-Case, and Sentence case (10 formats in total).
- Unified Unicode-aware word tokenizer engine shared by all converters.
- Complete unit test suite for the converters (`test/unit/converters.test.js`).
- Command category "Text Case Converter" for all commands.
- Context menu entries shown only when there is a selection (`editorHasSelection`).