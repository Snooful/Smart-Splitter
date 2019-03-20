# Smart Splitter

[![GitHub release](https://img.shields.io/github/release/Snooful/Smart-Splitter.svg?style=popout&label=github)](https://github.com/Snooful/Smart-Splitter/releases/latest)
[![npm](https://img.shields.io/npm/v/smart-splitter.svg?style=popout&colorB=red)](https://www.npmjs.com/package/smart-splitter)
[![Travis (.com)](https://img.shields.io/travis/com/Snooful/Smart-Splitter.svg?style=popout)](https://travis-ci.com/Snooful/Smart-Splitter)

Split strings the smarter way.

## Why?

A developer might parse arguments using `String#split`, but this falls apart as soon as multi-word arguments need to be parsed:

```js
"--force -m hey!".split(" "); // It works...
"--force -m 'hello world'".split(" "); // Nope: [..., "'hello", "world'"]
```

Smart Splitter aims to solve this problem. Quoted text remains as one string and does not contain quotes:

```js
smartSplit("--force -m 'hello world'"); // Nice: ["--force", "-m", "hello world"]
```
