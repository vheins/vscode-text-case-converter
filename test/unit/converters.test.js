// @ts-check
const assert = require('assert');
const {
	splitToWords,
	camelCase,
	pascalCase,
	snakeCase,
	constantCase,
	kebabCase,
	trainCase,
	titleCase,
	sentenceCase,
	lowerCase,
	upperCase
} = require('../../converters');

describe('converters.js unit tests', () => {
	describe('splitToWords', () => {
		it('returns empty array for empty or non-string input', () => {
			assert.deepStrictEqual(splitToWords(''), []);
			assert.deepStrictEqual(splitToWords('   '), []);
			// @ts-ignore
			assert.deepStrictEqual(splitToWords(null), []);
			// @ts-ignore
			assert.deepStrictEqual(splitToWords(undefined), []);
		});

		it('splits lower to upper boundary (camelCase)', () => {
			assert.deepStrictEqual(splitToWords('helloWorld'), ['hello', 'world']);
		});

		it('splits acronyms and consecutive uppercase before lowercase', () => {
			assert.deepStrictEqual(splitToWords('HTTPServer'), ['http', 'server']);
			assert.deepStrictEqual(splitToWords('FOOBar'), ['foo', 'bar']);
			assert.deepStrictEqual(splitToWords('XMLHTTPRequest'), ['xmlhttp', 'request']);
		});

		it('splits letter and digit boundaries', () => {
			assert.deepStrictEqual(splitToWords('version2'), ['version', '2']);
			assert.deepStrictEqual(splitToWords('hello1world'), ['hello', '1', 'world']);
			assert.deepStrictEqual(splitToWords('2fast2furious'), ['2', 'fast', '2', 'furious']);
		});

		it('splits non-alphanumeric separators', () => {
			assert.deepStrictEqual(splitToWords('hello_world-foo BAR'), ['hello', 'world', 'foo', 'bar']);
			assert.deepStrictEqual(splitToWords('path/to.file,name;here:now'), ['path', 'to', 'file', 'name', 'here', 'now']);
		});

		it('handles leading and trailing separators and multiple whitespace', () => {
			assert.deepStrictEqual(splitToWords('  __--hello   world--__  '), ['hello', 'world']);
		});

		it('handles single word', () => {
			assert.deepStrictEqual(splitToWords('hello'), ['hello']);
			assert.deepStrictEqual(splitToWords('HELLO'), ['hello']);
		});

		it('handles Unicode accents and casing', () => {
			assert.deepStrictEqual(splitToWords('été'), ['été']);
			assert.deepStrictEqual(splitToWords('CAFÉ'), ['café']);
			assert.deepStrictEqual(splitToWords('bonjourMonMonde'), ['bonjour', 'mon', 'monde']);
			assert.deepStrictEqual(splitToWords('überMensch'), ['über', 'mensch']);
		});
	});

	describe('camelCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(camelCase('hello world'), 'helloWorld');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(camelCase(''), '');
			assert.strictEqual(camelCase('   '), '');
		});

		it('handles edge cases: acronyms, numbers, separators, unicode', () => {
			assert.strictEqual(camelCase('HTTP_SERVER_CONFIG'), 'httpServerConfig');
			assert.strictEqual(camelCase('hello-world_123 test'), 'helloWorld123Test');
			assert.strictEqual(camelCase('été chaud'), 'étéChaud');
		});
	});

	describe('pascalCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(pascalCase('hello world'), 'HelloWorld');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(pascalCase(''), '');
			assert.strictEqual(pascalCase('   '), '');
		});

		it('handles edge cases: acronyms, numbers, separators, unicode', () => {
			assert.strictEqual(pascalCase('HTTPServer'), 'HttpServer');
			assert.strictEqual(pascalCase('version2_release'), 'Version2Release');
			assert.strictEqual(pascalCase('CAFÉ latte'), 'CaféLatte');
		});
	});

	describe('snakeCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(snakeCase('hello world'), 'hello_world');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(snakeCase(''), '');
			assert.strictEqual(snakeCase('   '), '');
		});

		it('handles edge cases: mixed separators, uppercase runs, unicode', () => {
			assert.strictEqual(snakeCase('helloWorld-foo BAR'), 'hello_world_foo_bar');
			assert.strictEqual(snakeCase('HTTPServer'), 'http_server');
			assert.strictEqual(snakeCase('été chaud'), 'été_chaud');
		});
	});

	describe('constantCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(constantCase('hello world'), 'HELLO_WORLD');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(constantCase(''), '');
			assert.strictEqual(constantCase('   '), '');
		});

		it('handles edge cases: mixed separators, numbers, unicode', () => {
			assert.strictEqual(constantCase('helloWorld-foo BAR'), 'HELLO_WORLD_FOO_BAR');
			assert.strictEqual(constantCase('version2'), 'VERSION_2');
			assert.strictEqual(constantCase('café crème'), 'CAFÉ_CRÈME');
		});
	});

	describe('kebabCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(kebabCase('hello world'), 'hello-world');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(kebabCase(''), '');
			assert.strictEqual(kebabCase('   '), '');
		});

		it('handles edge cases: mixed separators, uppercase runs, unicode', () => {
			assert.strictEqual(kebabCase('hello_world-foo BAR'), 'hello-world-foo-bar');
			assert.strictEqual(kebabCase('HTTPServer'), 'http-server');
			assert.strictEqual(kebabCase('été chaud'), 'été-chaud');
		});
	});

	describe('trainCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(trainCase('hello world'), 'Hello-World');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(trainCase(''), '');
			assert.strictEqual(trainCase('   '), '');
		});

		it('handles edge cases: mixed separators, numbers, unicode', () => {
			assert.strictEqual(trainCase('hello_world-foo BAR'), 'Hello-World-Foo-Bar');
			assert.strictEqual(trainCase('hello1world'), 'Hello-1-World');
			assert.strictEqual(trainCase('CAFÉ latte'), 'Café-Latte');
		});
	});

	describe('titleCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(titleCase('hello world'), 'Hello World');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(titleCase(''), '');
			assert.strictEqual(titleCase('   '), '');
		});

		it('handles edge cases: mixed separators, acronyms, unicode', () => {
			assert.strictEqual(titleCase('hello_world-foo BAR'), 'Hello World Foo Bar');
			assert.strictEqual(titleCase('HTTPServer'), 'Http Server');
			assert.strictEqual(titleCase('été chaud'), 'Été Chaud');
		});
	});

	describe('sentenceCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(sentenceCase('hello world'), 'Hello world');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(sentenceCase(''), '');
			assert.strictEqual(sentenceCase('   '), '');
		});

		it('handles edge cases: mixed separators, numbers, unicode', () => {
			assert.strictEqual(sentenceCase('hello_world-foo BAR'), 'Hello world foo bar');
			assert.strictEqual(sentenceCase('version2 update'), 'Version 2 update');
			assert.strictEqual(sentenceCase('CAFÉ noir'), 'Café noir');
		});
	});

	describe('lowerCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(lowerCase('hello world'), 'hello world');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(lowerCase(''), '');
			assert.strictEqual(lowerCase('   '), '');
		});

		it('handles edge cases: mixed separators, uppercase, unicode', () => {
			assert.strictEqual(lowerCase('HELLO_WORLD-FOO'), 'hello world foo');
			assert.strictEqual(lowerCase('HTTPServer'), 'http server');
			assert.strictEqual(lowerCase('CAFÉ'), 'café');
		});
	});

	describe('upperCase', () => {
		it('transforms standard words', () => {
			assert.strictEqual(upperCase('hello world'), 'HELLO WORLD');
		});

		it('handles negative / empty input', () => {
			assert.strictEqual(upperCase(''), '');
			assert.strictEqual(upperCase('   '), '');
		});

		it('handles edge cases: mixed separators, lowercase, unicode', () => {
			assert.strictEqual(upperCase('hello_world-foo bar'), 'HELLO WORLD FOO BAR');
			assert.strictEqual(upperCase('version2'), 'VERSION 2');
			assert.strictEqual(upperCase('été chaud'), 'ÉTÉ CHAUD');
		});
	});
});
