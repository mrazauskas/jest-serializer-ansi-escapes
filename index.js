const prettyAnsi = require("pretty-ansi");

const ansiEscapesSerializer = {
  serialize(text, config, indentation, depth, refs, printer) {
    return printer(prettyAnsi(text), config, indentation, depth, refs);
  },
  test(val) {
    return typeof val === "string" && val.includes("\u001b");
  },
};

module.exports = ansiEscapesSerializer;
