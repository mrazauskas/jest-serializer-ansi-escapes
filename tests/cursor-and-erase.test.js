const { describe, expect, test } = require("@jest/globals");
const { format } = require("pretty-format");
const ansiEscapesSerializer = require("../");

function prettyFormat(text) {
  return format(text, { plugins: [ansiEscapesSerializer] });
}

describe("cursor and erase sequences", () => {
  test.each([
    {
      caseName: "clearTerminal",
      expected: '"<clearTerminal>\n"',
      sequence: "\u001b[2J\u001b[3J\u001b[H",
    },
    {
      caseName: "clearTerminal (win)",
      expected: '"<clearTerminal>\n"',
      sequence: "\u001b[2J\u001b[0f",
    },
    {
      caseName: "moveCursorUpBy1Row",
      expected: '"<moveCursorUpBy1Row>\n"',
      sequence: "\u001b[A",
    },
    {
      caseName: "moveCursorUpBy1Row",
      expected: '"<moveCursorUpBy1Row>\n"',
      sequence: "\u001b[1A",
    },
    {
      caseName: "moveCursorUpBy3Rows",
      expected: '"<moveCursorUpBy3Rows>\n"',
      sequence: "\u001b[3A",
    },
    {
      caseName: "moveCursorDownBy1Row",
      expected: '"<moveCursorDownBy1Row>\n"',
      sequence: "\u001b[B",
    },
    {
      caseName: "moveCursorDownBy1Row",
      expected: '"<moveCursorDownBy1Row>\n"',
      sequence: "\u001b[1B",
    },
    {
      caseName: "moveCursorDownBy5Rows",
      expected: '"<moveCursorDownBy5Rows>\n"',
      sequence: "\u001b[5B",
    },
    {
      caseName: "moveCursorRightBy1Column",
      expected: '"<moveCursorRightBy1Column>\n"',
      sequence: "\u001b[C",
    },
    {
      caseName: "moveCursorRightBy1Column",
      expected: '"<moveCursorRightBy1Column>\n"',
      sequence: "\u001b[1C",
    },
    {
      caseName: "moveCursorRightBy12Columns",
      expected: '"<moveCursorRightBy12Columns>\n"',
      sequence: "\u001b[12C",
    },
    {
      caseName: "moveCursorLeftBy1Column",
      expected: '"<moveCursorLeftBy1Column>\n"',
      sequence: "\u001b[D",
    },
    {
      caseName: "moveCursorLeftBy1Column",
      expected: '"<moveCursorLeftBy1Column>\n"',
      sequence: "\u001b[1D",
    },
    {
      caseName: "moveCursorLeftBy8Columns",
      expected: '"<moveCursorLeftBy8Columns>\n"',
      sequence: "\u001b[8D",
    },
    {
      caseName: "moveCursorDownBy1RowToColumn1",
      expected: '"<moveCursorDownBy1RowToColumn1>\n"',
      sequence: "\u001b[E",
    },
    {
      caseName: "moveCursorDownBy1RowToColumn1",
      expected: '"<moveCursorDownBy1RowToColumn1>\n"',
      sequence: "\u001b[1E",
    },
    {
      caseName: "moveCursorDownBy5RowsToColumn1",
      expected: '"<moveCursorDownBy5RowsToColumn1>\n"',
      sequence: "\u001b[5E",
    },
    {
      caseName: "moveCursorUpBy1RowToColumn1",
      expected: '"<moveCursorUpBy1RowToColumn1>\n"',
      sequence: "\u001b[F",
    },
    {
      caseName: "moveCursorUpBy1RowToColumn1",
      expected: '"<moveCursorUpBy1RowToColumn1>\n"',
      sequence: "\u001b[1F",
    },
    {
      caseName: "moveCursorUpBy14RowsToColumn1",
      expected: '"<moveCursorUpBy14RowsToColumn1>\n"',
      sequence: "\u001b[14F",
    },
    {
      caseName: "moveCursorToColumn1",
      expected: '"<moveCursorToColumn1>\n"',
      sequence: "\u001b[G",
    },
    {
      caseName: "moveCursorToColumn1",
      expected: '"<moveCursorToColumn1>\n"',
      sequence: "\u001b[1G",
    },
    {
      caseName: "moveCursorToColumn26",
      expected: '"<moveCursorToColumn26>\n"',
      sequence: "\u001b[26G",
    },
    {
      caseName: "moveCursorToRow1Column1",
      expected: '"<moveCursorToRow1Column1>\n"',
      sequence: "\u001b[H",
    },
    {
      caseName: "moveCursorToRow8Column1",
      expected: '"<moveCursorToRow8Column1>\n"',
      sequence: "\u001b[8H",
    },
    {
      caseName: "moveCursorToRow5Column1",
      expected: '"<moveCursorToRow5Column1>\n"',
      sequence: "\u001b[5;H",
    },
    {
      caseName: "moveCursorToRow1Column9",
      expected: '"<moveCursorToRow1Column9>\n"',
      sequence: "\u001b[;9H",
    },
    {
      caseName: "moveCursorToRow2Column18",
      expected: '"<moveCursorToRow2Column18>\n"',
      sequence: "\u001b[2;18H",
    },
    {
      caseName: "moveCursorToRow1Column1",
      expected: '"<moveCursorToRow1Column1>\n"',
      sequence: "\u001b[f",
    },
    {
      caseName: "moveCursorToRow8Column1",
      expected: '"<moveCursorToRow8Column1>\n"',
      sequence: "\u001b[8f",
    },
    {
      caseName: "moveCursorToRow5Column1",
      expected: '"<moveCursorToRow5Column1>\n"',
      sequence: "\u001b[5;f",
    },
    {
      caseName: "moveCursorToRow1Column9",
      expected: '"<moveCursorToRow1Column9>\n"',
      sequence: "\u001b[;9f",
    },
    {
      caseName: "moveCursorToRow2Column18",
      expected: '"<moveCursorToRow2Column18>\n"',
      sequence: "\u001b[2;18f",
    },
    {
      caseName: "getCursorPosition",
      expected: '"<getCursorPosition>\n"',
      sequence: "\u001b[6n",
    },
    {
      caseName: "saveCursorPosition",
      expected: '"<saveCursorPosition>\n"',
      sequence: "\u001b[s",
    },
    {
      caseName: "restoreCursorPosition",
      expected: '"<restoreCursorPosition>\n"',
      sequence: "\u001b[u",
    },
    {
      caseName: "eraseLineEnd",
      expected: '"<eraseLineEnd>\n"',
      sequence: "\u001b[K",
    },
    {
      caseName: "eraseLineEnd",
      expected: '"<eraseLineEnd>\n"',
      sequence: "\u001b[0K",
    },
    {
      caseName: "eraseLineStart",
      expected: '"<eraseLineStart>\n"',
      sequence: "\u001b[1K",
    },
    {
      caseName: "eraseLine",
      expected: '"<eraseLine>\n"',
      sequence: "\u001b[2K",
    },
    {
      caseName: "eraseScreenDown",
      expected: '"<eraseScreenDown>\n"',
      sequence: "\u001b[J",
    },
    {
      caseName: "eraseScreenDown",
      expected: '"<eraseScreenDown>\n"',
      sequence: "\u001b[0J",
    },
    {
      caseName: "eraseScreenUp",
      expected: '"<eraseScreenUp>\n"',
      sequence: "\u001b[1J",
    },
    {
      caseName: "eraseScreen",
      expected: '"<eraseScreen>\n"',
      sequence: "\u001b[2J",
    },
    {
      caseName: "eraseScreenAndDeleteBuffer",
      expected: '"<eraseScreenAndDeleteBuffer>\n"',
      sequence: "\u001b[3J",
    },
    {
      caseName: "scrollUpBy1Row",
      expected: '"<scrollUpBy1Row>\n"',
      sequence: "\u001b[S",
    },
    {
      caseName: "scrollUpBy1Row",
      expected: '"<scrollUpBy1Row>\n"',
      sequence: "\u001b[1S",
    },
    {
      caseName: "scrollUpBy8Rows",
      expected: '"<scrollUpBy8Rows>\n"',
      sequence: "\u001b[8S",
    },
    {
      caseName: "scrollDownBy1Row",
      expected: '"<scrollDownBy1Row>\n"',
      sequence: "\u001b[T",
    },
    {
      caseName: "scrollDownBy1Row",
      expected: '"<scrollDownBy1Row>\n"',
      sequence: "\u001b[1T",
    },
    {
      caseName: "scrollDownBy21Rows",
      expected: '"<scrollDownBy21Rows>\n"',
      sequence: "\u001b[21T",
    },
    {
      caseName: "showCursor",
      expected: '"<showCursor>\n"',
      sequence: "\u001b[?25h",
    },
    {
      caseName: "hideCursor",
      expected: '"<hideCursor>\n"',
      sequence: "\u001b[?25l",
    },
  ])("$caseName", ({ sequence, expected }) => {
    expect(prettyFormat(sequence)).toEqual(expected);
  });

  test("handles unrecognized sequence", () => {
    expect(prettyFormat("\u001b[a1b2c3")).toEqual('"<ESC>[a1b2c3"');
    expect(prettyFormat("\u001bd4e5f6")).toEqual('"<ESC>d4e5f6"');
  });
});

describe("handles end of line characters", () => {
  test.each([
    {
      caseName: "clearTerminal",
      expected: "<clearTerminal>",
      sequence: "\u001b[2J\u001b[3J\u001b[H",
    },
    {
      caseName: "clearTerminal (win)",
      expected: "<clearTerminal>",
      sequence: "\u001b[2J\u001b[0f",
    },
    {
      caseName: "moveCursorUpBy",
      expected: "<moveCursorUpBy1Row>",
      sequence: "\u001b[A",
    },
    {
      caseName: "moveCursorDownBy",
      expected: "<moveCursorDownBy1Row>",
      sequence: "\u001b[B",
    },
    {
      caseName: "moveCursorRightBy",
      expected: "<moveCursorRightBy1Column>",
      sequence: "\u001b[C",
    },
    {
      caseName: "moveCursorLeftBy",
      expected: "<moveCursorLeftBy1Column>",
      sequence: "\u001b[D",
    },
    {
      caseName: "moveCursorDownBy1Row",
      expected: "<moveCursorDownBy1RowToColumn1>",
      sequence: "\u001b[E",
    },
    {
      caseName: "moveCursorUpBy/ToColumn1",
      expected: "<moveCursorUpBy1RowToColumn1>",
      sequence: "\u001b[F",
    },
    {
      caseName: "moveCursorToColumn",
      expected: "<moveCursorToColumn1>",
      sequence: "\u001b[G",
    },
    {
      caseName: "moveCursorToRow/Column",
      expected: "<moveCursorToRow1Column1>",
      sequence: "\u001b[H",
    },
    {
      caseName: "moveCursorToRow/Column",
      expected: "<moveCursorToRow1Column1>",
      sequence: "\u001b[f",
    },
    {
      caseName: "getCursorPosition",
      expected: "<getCursorPosition>",
      sequence: "\u001b[6n",
    },
    {
      caseName: "saveCursorPosition",
      expected: "<saveCursorPosition>",
      sequence: "\u001b[s",
    },
    {
      caseName: "restoreCursorPosition",
      expected: "<restoreCursorPosition>",
      sequence: "\u001b[u",
    },
    {
      caseName: "eraseLineEnd",
      expected: "<eraseLineEnd>",
      sequence: "\u001b[K",
    },
    {
      caseName: "eraseLineEnd",
      expected: "<eraseLineEnd>",
      sequence: "\u001b[0K",
    },
    {
      caseName: "eraseLineStart",
      expected: "<eraseLineStart>",
      sequence: "\u001b[1K",
    },
    {
      caseName: "eraseLine",
      expected: "<eraseLine>",
      sequence: "\u001b[2K",
    },
    {
      caseName: "eraseScreenDown",
      expected: "<eraseScreenDown>",
      sequence: "\u001b[J",
    },
    {
      caseName: "eraseScreenDown",
      expected: "<eraseScreenDown>",
      sequence: "\u001b[0J",
    },
    {
      caseName: "eraseScreenUp",
      expected: "<eraseScreenUp>",
      sequence: "\u001b[1J",
    },
    {
      caseName: "eraseScreen",
      expected: "<eraseScreen>",
      sequence: "\u001b[2J",
    },
    {
      caseName: "eraseScreenAndDeleteBuffer",
      expected: "<eraseScreenAndDeleteBuffer>",
      sequence: "\u001b[3J",
    },
    {
      caseName: "scrollUpBy",
      expected: "<scrollUpBy1Row>",
      sequence: "\u001b[S",
    },
    {
      caseName: "scrollDownBy",
      expected: "<scrollDownBy1Row>",
      sequence: "\u001b[T",
    },
    {
      caseName: "showCursor",
      expected: "<showCursor>",
      sequence: "\u001b[?25h",
    },
    {
      caseName: "hideCursor",
      expected: "<hideCursor>",
      sequence: "\u001b[?25l",
    },
  ])("$caseName", ({ sequence, expected }) => {
    expect(prettyFormat(sequence)).toEqual(`"${expected}\n"`);
    expect(prettyFormat(`${sequence}\n`)).toEqual(`"${expected}\n"`);
    expect(prettyFormat(`${sequence}\n\n`)).toEqual(`"${expected}\n\n"`);
    expect(prettyFormat(`${sequence}text`)).toEqual(`"${expected}\ntext"`);
    expect(prettyFormat(`text${sequence}`)).toEqual(`"text\n${expected}\n"`);
  });
});
