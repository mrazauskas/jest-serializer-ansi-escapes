const ansiEscapes = require("ansi-escapes");
const { format } = require("pretty-format");
const ansiEscapesSerializer = require("../");

function prettyFormat(text) {
  return format(text, { plugins: [ansiEscapesSerializer] });
}

describe("supports ansi-escapes", () => {
  test.each([
    { expected: '"<clearTerminal>\n"', key: "clearTerminal" },
    {
      expected: '"<moveCursorDownBy1RowToColumn1>\n"',
      key: "cursorNextLine",
    },
    { expected: '"<moveCursorUpBy1RowToColumn1>\n"', key: "cursorPrevLine" },
    { expected: '"<moveCursorToColumn1>\n"', key: "cursorLeft" },
    { expected: '"<getCursorPosition>\n"', key: "cursorGetPosition" },
    { expected: '"<saveCursorPosition>\n"', key: "cursorSavePosition" },
    { expected: '"<restoreCursorPosition>\n"', key: "cursorRestorePosition" },
    { expected: '"<showCursor>\n"', key: "cursorShow" },
    { expected: '"<hideCursor>\n"', key: "cursorHide" },
    { expected: '"<eraseScreenDown>\n"', key: "eraseDown" },
    { expected: '"<eraseScreenUp>\n"', key: "eraseUp" },
    { expected: '"<eraseScreen>\n"', key: "eraseScreen" },
    { expected: '"<eraseLineEnd>\n"', key: "eraseEndLine" },
    { expected: '"<eraseLineStart>\n"', key: "eraseStartLine" },
    { expected: '"<eraseLine>\n"', key: "eraseLine" },
    { expected: '"<scrollUpBy1Row>\n"', key: "scrollUp" },
    { expected: '"<scrollDownBy1Row>\n"', key: "scrollDown" },
  ])("$key()", ({ key, expected }) => {
    expect(prettyFormat(`${ansiEscapes[key]}`)).toEqual(expected);
  });

  test.each([
    { expected: '"<moveCursorUpBy1Row>\n"', key: "cursorUp" },
    { arg: 9, expected: '"<moveCursorUpBy9Rows>\n"', key: "cursorUp" },
    { expected: '"<moveCursorDownBy1Row>\n"', key: "cursorDown" },
    { arg: 15, expected: '"<moveCursorDownBy15Rows>\n"', key: "cursorDown" },
    { expected: '"<moveCursorRightBy1Column>\n"', key: "cursorForward" },
    {
      arg: 4,
      expected: '"<moveCursorRightBy4Columns>\n"',
      key: "cursorForward",
    },
    { expected: '"<moveCursorLeftBy1Column>\n"', key: "cursorBackward" },
    {
      arg: 7,
      expected: '"<moveCursorLeftBy7Columns>\n"',
      key: "cursorBackward",
    },
  ])("$key($arg)", ({ arg, key, expected }) => {
    expect(prettyFormat(ansiEscapes[key](arg))).toEqual(expected);
  });

  test("cursorTo(14)", () => {
    expect(prettyFormat(ansiEscapes.cursorTo(14))).toEqual(
      '"<moveCursorToColumn15>\n"',
    );
  });

  test("cursorTo(6, 18)", () => {
    expect(prettyFormat(ansiEscapes.cursorTo(6, 18))).toEqual(
      '"<moveCursorToRow19Column7>\n"',
    );
  });

  test("cursorMove(5)", () => {
    expect(prettyFormat(ansiEscapes.cursorMove(5))).toEqual(
      '"<moveCursorRightBy5Columns>\n"',
    );
  });

  test("cursorMove(-2)", () => {
    expect(prettyFormat(ansiEscapes.cursorMove(-2))).toEqual(
      '"<moveCursorLeftBy2Columns>\n"',
    );
  });

  test("cursorMove(12, 3)", () => {
    expect(prettyFormat(ansiEscapes.cursorMove(12, 3))).toEqual(
      '"<moveCursorRightBy12Columns>\n<moveCursorDownBy3Rows>\n"',
    );
  });

  test("cursorMove(10, -8)", () => {
    expect(prettyFormat(ansiEscapes.cursorMove(10, -8))).toEqual(
      '"<moveCursorRightBy10Columns>\n<moveCursorUpBy8Rows>\n"',
    );
  });

  test("cursorMove(-5, 18)", () => {
    expect(prettyFormat(ansiEscapes.cursorMove(-5, 18))).toEqual(
      '"<moveCursorLeftBy5Columns>\n<moveCursorDownBy18Rows>\n"',
    );
  });

  test("cursorMove(-17, -2)", () => {
    expect(prettyFormat(ansiEscapes.cursorMove(-21, -9))).toEqual(
      '"<moveCursorLeftBy21Columns>\n<moveCursorUpBy9Rows>\n"',
    );
  });
});
