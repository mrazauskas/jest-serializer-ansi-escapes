const ansiStyle = require("ansi-styles");
const { format } = require("pretty-format");
const ansiEscapesSerializer = require("../");

function prettyFormat(text) {
  return format(text, { plugins: [ansiEscapesSerializer] });
}

describe("supports ansi-styles", () => {
  test("supports style.red", async () => {
    expect(
      prettyFormat(`${ansiStyle.red.open} foo content ${ansiStyle.red.close}`),
    ).toEqual('"<red> foo content </color>"');
  });

  test("supports style.green", () => {
    expect(
      prettyFormat(
        `${ansiStyle.green.open} foo content ${ansiStyle.green.close}`,
      ),
    ).toEqual('"<green> foo content </color>"');
  });

  test("supports style.reset", () => {
    expect(
      prettyFormat(
        `${ansiStyle.reset.open} foo content ${ansiStyle.reset.close}`,
      ),
    ).toEqual('"</> foo content </>"');
  });

  test("supports style.bold", () => {
    expect(prettyFormat(`${ansiStyle.bold.open} foo content`)).toEqual(
      '"<bold> foo content"',
    );
  });

  test("supports style.dim", () => {
    expect(prettyFormat(`${ansiStyle.dim.open} foo content`)).toEqual(
      '"<dim> foo content"',
    );
  });

  test("does not support other colors", () => {
    expect(
      prettyFormat(
        `${ansiStyle.blue.open} foo content ${ansiStyle.reset.close}`,
      ),
    ).toEqual('"<blue> foo content </>"');
  });
});
