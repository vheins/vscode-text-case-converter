// @ts-check

/**
 * Splits input text into an array of lowercase word tokens using Unicode-aware boundary rules.
 *
 * Word boundaries:
 * 1. lower -> upper: `helloWorld` -> `['hello', 'world']`
 * 2. uppercase run -> upper followed by lower: `HTTPServer` -> `['http', 'server']`, `FOOBar` -> `['foo', 'bar']`
 * 3. letter <-> digit: `version2` -> `['version', '2']`, `hello1world` -> `['hello', '1', 'world']`
 * 4. any non-alphanumeric char (space, -, _, ., /, ,, etc.) = separator boundary
 *
 * @param {string} input
 * @returns {string[]}
 */
function splitToWords(input) {
	if (!input || typeof input !== 'string') {
		return [];
	}

	// 1. Boundary between lowercase/digit and uppercase: 'helloWorld' -> 'hello World', '2A' -> '2 A'
	let text = input.replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, '$1 $2');

	// 2. Boundary at end of uppercase sequence before a capitalized word: 'HTTPServer' -> 'HTTP Server', 'FOOBar' -> 'FOO Bar'
	text = text.replace(/(\p{Lu}+)(\p{Lu}\p{Ll})/gu, '$1 $2');

	// 3. Boundary between letter and digit: 'version2' -> 'version 2', '2version' -> '2 version'
	text = text.replace(/(\p{L})(\p{N})/gu, '$1 $2');
	text = text.replace(/(\p{N})(\p{L})/gu, '$1 $2');

	// 4. Any non-alphanumeric character is treated as a separator
	text = text.replace(/[^\p{L}\p{N}]+/gu, ' ');

	const rawTokens = text.trim().split(/\s+/u);
	const tokens = [];

	for (const token of rawTokens) {
		if (token.length > 0) {
			tokens.push(token.toLowerCase());
		}
	}

	return tokens;
}

/**
 * Capitalizes a word token: first character to upper case, remainder to lower case.
 *
 * @param {string} word
 * @returns {string}
 */
function capitalizeWord(word) {
	if (!word) {
		return '';
	}
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Converts text to camelCase format (`helloWorld`).
 *
 * @param {string} text
 * @returns {string}
 */
function camelCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words
		.map((word, index) => (index === 0 ? word.toLowerCase() : capitalizeWord(word)))
		.join('');
}

/**
 * Converts text to PascalCase format (`HelloWorld`).
 *
 * @param {string} text
 * @returns {string}
 */
function pascalCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => capitalizeWord(word)).join('');
}

/**
 * Converts text to snake_case format (`hello_world`).
 *
 * @param {string} text
 * @returns {string}
 */
function snakeCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => word.toLowerCase()).join('_');
}

/**
 * Converts text to CONSTANT_CASE format (`HELLO_WORLD`).
 *
 * @param {string} text
 * @returns {string}
 */
function constantCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => word.toUpperCase()).join('_');
}

/**
 * Converts text to kebab-case format (`hello-world`).
 *
 * @param {string} text
 * @returns {string}
 */
function kebabCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => word.toLowerCase()).join('-');
}

/**
 * Converts text to Train-Case format (`Hello-World`).
 *
 * @param {string} text
 * @returns {string}
 */
function trainCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => capitalizeWord(word)).join('-');
}

/**
 * Converts text to Title Case format (`Hello World`).
 *
 * @param {string} text
 * @returns {string}
 */
function titleCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => capitalizeWord(word)).join(' ');
}

/**
 * Converts text to Sentence case format (`Hello world`).
 *
 * @param {string} text
 * @returns {string}
 */
function sentenceCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words
		.map((word, index) => (index === 0 ? capitalizeWord(word) : word.toLowerCase()))
		.join(' ');
}

/**
 * Converts text to lower case format (`hello world`).
 *
 * @param {string} text
 * @returns {string}
 */
function lowerCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => word.toLowerCase()).join(' ');
}

/**
 * Converts text to UPPER CASE format (`HELLO WORLD`).
 *
 * @param {string} text
 * @returns {string}
 */
function upperCase(text) {
	const words = splitToWords(text);
	if (words.length === 0) {
		return '';
	}

	return words.map((word) => word.toUpperCase()).join(' ');
}

module.exports = {
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
};
