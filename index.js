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

function split(text = "", count = Infinity, splitter = " ", quotes = defQuotes) {
	const out = [];

	const startQuotes = quotes.map(quote => quote.start);
	const endQuotes = quotes.map(quote => quote.end);

	let inQuote = false;
	console.log("starting with text: " + text)

	const chars = text.split("");
	out.push("");
	chars.forEach((char, index) => {
		if (startQuotes.includes(char) && !inQuote) {
			console.log(`now in quote (${char}) at index ${index}`)
			inQuote = startQuotes.indexOf(char);
		} else if (inQuote && endQuotes[inQuote] === char) {
			if (index > 0 && chars[index - 1] !== "\\") {
				console.log(`exited quote (${char}) at index ${index}`)
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

module.exports = {
	split,
	quotes: defQuotes,
};
