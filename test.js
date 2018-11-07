const assert = require("chai").assert;
const smartSplitter = require(".");

const text = "Hello, world! This is an example.";

describe("smartSplitter.split", () => {
	it("is a function", () => {
		assert.isFunction(smartSplitter.split);
	});
	
	it("returns an array of strings", () => {
		split(text).forEach(item => {
			assert.isString(item);
		});
	});
	
	it("has as many items as dumb split by space", () => {
		assert.equal(split(text).length, text.split(" ").length);
	});

	it("doesn't split if count is 0", () => {
		assert.deepEqual(split(text, 0), [
			text,
		]);
	});
	
	it("doesn't split if whole string is quoted", () => {
		assert.deepEqual(split("'" + text + "'"), [
			text,
		]);
	});
});
	 
describe("smartSplitter.quotes", () => {
	it("is an array", () => {
		asset.isArray(smartSplitter.quotes);
	});
	
	it("each item is an object", () => {
		smartSplitter.quotes.forEach(quote => {
			assert.isObject(quote);
		});
	});
	
	it("each quote object has a 'start' string", () => {
		smartSplitter.quotes.forEach(quote => {
			assert.isString(quote.start);
		});
	});
	
	it("each quote object has an 'end' string", () => {
		smartSplitter.quotes.forEach(quote => {
			assert.isString(quote.end);
		});
	});
});
