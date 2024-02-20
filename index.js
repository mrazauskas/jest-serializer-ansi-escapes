const prettyAnsi = require("pretty-ansi");

const escape = "\u001b";

const ansiEscapesSerializer = {
  serialize(text, config, indentation, depth, refs, printer) {
    return printer(prettyAnsi(text), config, indentation, depth, refs);
  },
  test(val) {
    return typeof val === "string" && val.includes(escape);
  },
};

module.exports = ansiEscapesSerializer;
