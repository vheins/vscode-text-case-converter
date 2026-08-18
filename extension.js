// @ts-check
const vscode = require('vscode');
const converters = require('./converters');

/**
 * Registry of all supported case converter commands.
 */
const COMMAND_REGISTRY = [
	{ id: 'camelCase', title: 'To: camelCase', convert: converters.camelCase },
	{ id: 'pascalCase', title: 'To: PascalCase', convert: converters.pascalCase },
	{ id: 'snakeCase', title: 'To: snake_case', convert: converters.snakeCase },
	{ id: 'constantCase', title: 'To: CONSTANT_CASE', convert: converters.constantCase },
	{ id: 'kebabCase', title: 'To: kebab-case', convert: converters.kebabCase },
	{ id: 'trainCase', title: 'To: Train-Case', convert: converters.trainCase },
	{ id: 'titleCase', title: 'To: Title Case', convert: converters.titleCase },
	{ id: 'sentenceCase', title: 'To: Sentence case', convert: converters.sentenceCase },
	{ id: 'lowerCase', title: 'To: lower case', convert: converters.lowerCase },
	{ id: 'upperCase', title: 'To: UPPER CASE', convert: converters.upperCase }
];

/**
 * Converts selected text in active editor using provided converter function.
 *
 * @param {(text: string) => string} converterFn
 * @returns {Promise<boolean>}
 */
async function convertSelectedText(converterFn) {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showWarningMessage('No active editor found to convert text case.');
		return false;
	}

	const { document, selections } = editor;
	const nonEmptySelections = selections.filter((selection) => !selection.isEmpty);

	if (nonEmptySelections.length === 0) {
		return false;
	}

	try {
		const success = await editor.edit((editBuilder) => {
			nonEmptySelections.forEach((selection) => {
				const selectedText = document.getText(selection);
				const transformedText = converterFn(selectedText);
				editBuilder.replace(selection, transformedText);
			});
		});

		return Boolean(success);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		vscode.window.showErrorMessage(`Failed to convert text case: ${message}`);
		return false;
	}
}

/**
 * Called when extension is activated.
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	COMMAND_REGISTRY.forEach(({ id, convert }) => {
		const disposable = vscode.commands.registerCommand(`text-case-converter.${id}`, () => {
			return convertSelectedText(convert);
		});
		context.subscriptions.push(disposable);
	});
}

/**
 * Called when extension is deactivated.
 */
function deactivate() {}

module.exports = {
	activate,
	deactivate,
	convertSelectedText,
	COMMAND_REGISTRY
};
