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
		if (startQuotes.includes(char) && !inQuote) {
			inQuote = startQuotes.indexOf(char);
		} else if (inQuote && endQuotes[inQuote] === char) {
			if (index > 0 && chars[index - 1] !== "\\") {
				inQuote = false;
			}
		} else if (char === splitter && out.length < count && !inQuote) {
			out.push("");
		} else {
			out[out.length - 1] += char;
		}
	});

	return out;
}

module.exports.split = split;
module.exports.quotes = defQuotes;
