const { format } = require("pretty-format");
const ansiEscapesSerializer = require("../");

function prettyFormat(text) {
  return format(text, { plugins: [ansiEscapesSerializer] });
}

describe("color and style sequences", () => {
  test("supports reset (omitted 0)", async () => {
    expect(prettyFormat("\u001b[31mSample text\u001b[m")).toEqual(
      '"<red>Sample text</>"'
    );
  });

  test("supports red", async () => {
    expect(prettyFormat("\u001b[31mSample text\u001b[0m")).toEqual(
      '"<red>Sample text</>"'
    );
  });

  test("supports red bold", async () => {
    expect(prettyFormat("\u001b[1;31mSample text\u001b[0m")).toEqual(
      '"<boldRed>Sample text</>"'
    );
  });

  test("handles unrecognized sequence", () => {
    expect(prettyFormat("\u001b[11mSample text\u001b[00m")).toEqual(
      '"<?>Sample text<?>"'
    );
  });
});
