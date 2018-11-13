/**
 * @typedef Quotations
 * @type {Object}
 * @property {string} start The start character.
 * @property {string} end The end character.
 */

/**
 * Pairs of quotations.
 * @type {Quotations[]}
 */
const defQuotes = [
	// Double
	{
		start: '"',
		end: '"',
	},
	// Smart double
	{
		start: "“",
		end: "”",
	},
	// Single
	{
		start: "'",
		end: "'",
	},
	// Smart single
	{
		start: "‘",
		end: "’",
	},
	// Guillemets
	{
		start: "«",
		end: "»",
	},
];

/**
 * Checks if every value in an array is truthy.
 * @param {boolean[]} conditions The conditions that should be fulfilled.
 * @returns {boolean}
 */
function all(conditions = []) {
	return conditions.every(value => value);
}

/**
 * Splits a string.
 * @param {string} text The text to split.
 * @param {number} count The number of elements to split the text into.
 * @param {string} splitter The thing to split by.
 * @param {Quotations[]} quotes The quote pairs to accept.
 * @returns {string[]}
 */
function split(text = "", count = Infinity, splitter = " ", quotes = defQuotes) {
	const out = [];

	const startQuotes = quotes.map(quote => quote.start);
	const endQuotes = quotes.map(quote => quote.end);

	let inQuote = false;

	const chars = text.split("");
	out.push("");
	chars.forEach((char, index) => {
		if (all([
			!inQuote, // Don't start quote inside another
			startQuotes.includes(char), // Must be a starting quote
			out[out.length - 1].length === 0, // At the start of a new split
		])) {
			inQuote = startQuotes.indexOf(char);
		} else if (all([
			inQuote, // Don't end quote when not inside one
			endQuotes[inQuote] === char, // Quote must match the start
			index > 0, // Making sure we don't get an OoB character
			chars[index - 1] !== "\\", // Is not escaped
			[" ", undefined].includes(chars[index + 1]) // Next character is a space or end of string (end of split)
		])) {
			inQuote = false;
		} else if (all([
			char === splitter,
			out.length < count && !inQuote,
		])) {
			out.push("");
		} else {
			out[out.length - 1] += char;
		}
	});

	return out;
}

module.exports.split = split;
module.exports.quotes = defQuotes;