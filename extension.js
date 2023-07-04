// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(
		vscode.commands.registerCommand('text-case-converter.camelCase', () => {
			convertSelectedText(camelCase);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('text-case-converter.snakeCase', () => {
			convertSelectedText(snakeCase);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('text-case-converter.titleCase', () => {
			convertSelectedText(titleCase);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('text-case-converter.lowerCase', () => {
			convertSelectedText(lowerCase);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('text-case-converter.upperCase', () => {
			convertSelectedText(upperCase);
		})
	);
}

function convertSelectedText(converterFn) {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const { document, selections } = editor;
		editor.edit((editBuilder) => {
			selections.forEach((selection) => {
				const selectedText = document.getText(selection);
				const transformedText = converterFn(selectedText);
				editBuilder.replace(selection, transformedText);
			});
		});
	}
}

function camelCase(text) {
	return text
		.replace(/[-_\s]+(.?)/g, (_, c) => (c ? c.toUpperCase() : ''));
}



function snakeCase(text) {
	return text
		.toLowerCase()
		.replace(/[A-Z]/g, (match, index) => (index === 0 ? match.toLowerCase() : '_' + match.toLowerCase()))
		.replace(/\s+/g, '_')
		.replace(/_{2,}/g, '_');
}


function titleCase(text) {
	return text.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function lowerCase(text) {
	return text.toLowerCase();
}

function upperCase(text) {
	return text.toUpperCase();
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
