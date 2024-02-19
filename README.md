# jest-serializer-ansi-escapes

[![version][version-badge]][version-url]
[![license][license-badge]][license-url]
[![packagephobia][packagephobia-badge]][packagephobia-url]
[![coverage][coverage-badge]][coverage-url]

Jest snapshot serializer for ANSI escape sequences.

---

This snapshot serializer converts [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code) into human readable text. It supports color, style and cursor control escapes and works with vanilla sequences as well as the output from libraries like `chalk`, `colors`, `ansi-escapes`, `ansi-styles` or `terminal-kit`.

For example, the following test:

```js
// ansiEscapes.test.js
import ansiEscapesSerializer from "jest-serializer-ansi-escapes";

expect.addSnapshotSerializer(ansiEscapesSerializer);

const output = [];

jest
  .spyOn(process.stdout, "write")
  .mockImplementation((chunk) => output.push(chunk));

test("ansi escapes", () => {
  process.stdout.write("\u001b[1;2mLoading...\u001b[0m");
  process.stdout.write("\u001b[2K\u001b[G");
  process.stdout.write("\u001b[3;32mSuccess!\u001b[0m");

  expect(output.join("")).toMatchSnapshot();
});
```

would output this snapshot:

```js
exports[`ansi escapes 1`] = `
"<bold, dim>Loading...</>
<eraseLine>
<moveCursorToColumn1>
<italic, green>Success!</>"
`;
```

## Install

```bash
npm add -D jest-serializer-ansi-escapes
```

## Usage with Jest

You can use [`expect.addSnapshotSerializer()`](https://jestjs.io/docs/expect#expectaddsnapshotserializerserializer) to enable the serializer for a particular test file:

```js
import ansiEscapesSerializer from "jest-serializer-ansi-escapes";

expect.addSnapshotSerializer(ansiEscapesSerializer);
```

If you prefer to use it for all tests in a project, add it to the [`snapshotSerializers`](https://jestjs.io/docs/configuration#snapshotserializers-arraystring) list of your Jest configuration:

```js
module.exports = {
  snapshotSerializers: ["jest-serializer-ansi-escapes"],
};
```

## Usage with Pretty Format

A Jest snapshot serializer is a plugin of Pretty Format, hence this serializer can be also used directly with [`pretty-format`](https://github.com/jestjs/jest/tree/main/packages/pretty-format) library:

```js
import { format as prettyFormat } from "pretty-format";
import ansiEscapesSerializer from "jest-serializer-ansi-escapes";

const sequence = "\u001b[26G";

const formattedSequence = prettyFormat(sequence, {
  plugins: [ansiEscapesSerializer],
});

console.log(formattedSequence); // <moveCursorToColumn26>
```

## Notes

Currently only 16 colors are all supported.

Keep in mind that the escape sequences are not validated. Unrecognized sequence will print as `<ESC>[a1b2c3`, or as `<?>` in case this is a color or style sequence.

## Contributing

Something is missing for your project? Just open an issue or send a PR.

## License

[MIT][license-url]

[version-badge]: https://badgen.net/npm/v/jest-serializer-ansi-escapes
[version-url]: https://npmjs.com/package/jest-serializer-ansi-escapes
[license-badge]: https://badgen.net/github/license/mrazauskas/jest-serializer-ansi-escapes
[license-url]: https://github.com/mrazauskas/jest-serializer-ansi-escapes/blob/main/LICENSE.md
[packagephobia-badge]: https://badgen.net/packagephobia/install/jest-serializer-ansi-escapes
[packagephobia-url]: https://packagephobia.com/result?p=jest-serializer-ansi-escapes
[coverage-badge]: https://badgen.net/codacy/coverage/af1dd8dbbb384a3abb7371ac75b5ac85
[coverage-url]: https://app.codacy.com/gh/mrazauskas/jest-serializer-ansi-escapes/coverage/dashboard
