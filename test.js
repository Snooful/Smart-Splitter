const assert = require("chai").assert;
const { split } = require(".");

describe("normal strings", () => {
	const text = "smart or dumb splitting";
	it("has as many items as dumb split by space", () => {
		assert.equal(split(text).length, text.split(" ").length);
	});
});

describe("count", () => {
	it("doesn't split if count is 0", () => {
		assert.deepEqual(split("hello world", 0), [
			"hello world",
		]);
	});
});

describe("splitting with quotes", () => {
	it("doesn't split if whole string is quoted", () => {
		assert.deepEqual(split("'hello world'"), [
			"hello world",
		]);
	});
});
