# Text Case Converter

Convert selected text between 10 case formats directly in the editor: camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, Train-Case, Title Case, Sentence case, lower case, and UPPER CASE.

## Features

- 10 one-click case conversions from the editor context menu
- Multi-cursor support — every non-empty selection is converted
- Unicode-aware tokenizer (handles camelCase input, uppercase runs, digits, hyphens, accents, and punctuation)
- Context menu entries appear only when there is a selection

| Format | Example output (input: `hello world`) |
| :--- | :--- |
| camelCase | `helloWorld` |
| PascalCase | `HelloWorld` |
| snake_case | `hello_world` |
| CONSTANT_CASE | `HELLO_WORLD` |
| kebab-case | `hello-world` |
| Train-Case | `Hello-World` |
| Title Case | `Hello World` |
| Sentence case | `Hello world` |
| lower case | `hello world` |
| UPPER CASE | `HELLO WORLD` |

## Requirements

This extension requires Visual Studio Code **1.79.0 or higher** (see `engines` in `package.json`).

## Installation

### From the Marketplace

1. Open the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
2. Search for "Text Case Converter".
3. Click **Install**.

### From a VSIX file

1. Build the extension package: `vsce package` (requires [vsce](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)).
2. Open the Extensions view, click **...** → **Install from VSIX...**, and select the generated `.vsix` file.

## Usage

1. Select the text you want to convert (multiple selections are supported).
2. Right-click on the selection to open the context menu — the **Text Case Converter** group appears only when there is a selection.
3. Choose the desired format, for example **To: camelCase**.

Alternatively, open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and type **Text Case Converter** to filter the available commands.

## Commands

All commands are registered under the **Text Case Converter** category.

| Command ID | Title | Output (input: `hello world`) |
| :--- | :--- | :--- |
| `text-case-converter.camelCase` | To: camelCase | `helloWorld` |
| `text-case-converter.pascalCase` | To: PascalCase | `HelloWorld` |
| `text-case-converter.snakeCase` | To: snake_case | `hello_world` |
| `text-case-converter.constantCase` | To: CONSTANT_CASE | `HELLO_WORLD` |
| `text-case-converter.kebabCase` | To: kebab-case | `hello-world` |
| `text-case-converter.trainCase` | To: Train-Case | `Hello-World` |
| `text-case-converter.titleCase` | To: Title Case | `Hello World` |
| `text-case-converter.sentenceCase` | To: Sentence case | `Hello world` |
| `text-case-converter.lowerCase` | To: lower case | `hello world` |
| `text-case-converter.upperCase` | To: UPPER CASE | `HELLO WORLD` |

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/vheins/vscode-text-case-converter).

## Release

Releases are published automatically to the VS Code Marketplace by GitHub Actions when a version tag is pushed.

### 1. Set up the publish token (once)

1. Go to the [Visual Studio Marketplace publisher management page](https://marketplace.visualstudio.com/manage) and select the `vheins` publisher.
2. Create a **Personal Access Token** with the **Marketplace** scope and **Manage** permission.
3. In the GitHub repository, go to **Settings → Secrets and variables → Actions** and add the token as a repository secret named `VSCE_PAT`.

### 2. Create a release

1. Bump the `version` field in `package.json` (the release workflow verifies it matches the tag).
2. Commit the change: `git commit -m "chore: bump version to X.Y.Z"`.
3. Tag and push: `git tag vX.Y.Z && git push origin vX.Y.Z`.

The `Release` workflow runs the checks (lint, unit tests, packaging) and then publishes the extension with `vsce publish`. For `workflow_dispatch` runs, the published version is the one in `package.json` (version-to-tag verification is only enforced on tag pushes).

## License

This extension is licensed under the [MIT License](LICENSE).