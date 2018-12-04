/**
 * @typedef Quotations
 * @type {Object}
 * @property {string} end The end character.
 * @property {string} start The start character.
 */

/**
 * Pairs of quotations.
 * @type {Quotations[]}
 */
const defQuotes = [
	// Double
	{
		end: "\"",
		start: "\"",
	},
	// Smart double
	{
		end: "”",
		start: "“",
	},
	// Single
	{
		end: "'",
		start: "'",
	},
	// Smart single
	{
		end: "’",
		start: "‘",
	},
	// Guillemets
	{
		end: "»",
		start: "«",
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
			// Don't start quote inside another
			!inQuote,
			// Must be a starting quote
			startQuotes.includes(char),
			// Must be at the start of a new split
			out[out.length - 1].length === 0,
		])) {
			inQuote = startQuotes.indexOf(char);
		} else if (all([
			// Don't end quote when not inside one
			inQuote,
			// End quote must match the start quote
			endQuotes[inQuote] === char,
			// Making sure we don't get an OoB character
			index > 0,
			// Quote shouldn't be escaped
			chars[index - 1] !== "\\",
			// Next character is a space or end of string (end of split)
			[" ", undefined].includes(chars[index + 1]),
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

	const emptyStrFix = out.map(item => item === "" ? undefined : item);

	const neededElems = count - emptyStrFix.length;
	const undefPadded = Number.isSafeInteger(neededElems) && neededElems >= 0 ? emptyStrFix.concat(new Array(neededElems).fill(undefined)) : emptyStrFix;

	return undefPadded;
}

module.exports.split = split;
module.exports.quotes = defQuotes;