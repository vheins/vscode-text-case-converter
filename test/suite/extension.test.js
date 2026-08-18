const assert = require('assert');
const vscode = require('vscode');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Extension is present and activates', async () => {
		const extension = vscode.extensions.getExtension('vheins.text-case-converter');
		assert.ok(extension, 'Extension should be found');
		if (!extension.isActive) {
			await extension.activate();
		}
		assert.strictEqual(extension.isActive, true, 'Extension should be active');
	});

	test('All 10 text-case-converter commands are registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		const expectedCommands = [
			'text-case-converter.camelCase',
			'text-case-converter.pascalCase',
			'text-case-converter.snakeCase',
			'text-case-converter.constantCase',
			'text-case-converter.kebabCase',
			'text-case-converter.trainCase',
			'text-case-converter.titleCase',
			'text-case-converter.sentenceCase',
			'text-case-converter.lowerCase',
			'text-case-converter.upperCase'
		];

		expectedCommands.forEach((cmd) => {
			assert.ok(commands.includes(cmd), `Command ${cmd} should be registered`);
		});
	});
});
