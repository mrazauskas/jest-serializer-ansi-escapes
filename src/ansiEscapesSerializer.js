const escape = "\u001b";

const colorText = new Map([
  ["0", "/"],

  ["1", "bold"],
  ["2", "dim"],
  ["3", "italic"],
  ["4", "underline"],

  ["7", "inverse"],
  ["8", "hidden"],
  ["9", "strikethrough"],

  ["22", "/bold /dim"],
  ["23", "/italic"],
  ["24", "/underline"],

  ["27", "/inverse"],
  ["28", "/hidden"],
  ["29", "/strikethrough"],

  ["30", "black"],
  ["31", "red"],
  ["32", "green"],
  ["33", "yellow"],
  ["34", "blue"],
  ["35", "magenta"],
  ["36", "cyan"],
  ["37", "white"],

  ["39", "/color"],

  ["40", ["background", "black"]],
  ["41", ["background", "red"]],
  ["42", ["background", "green"]],
  ["43", ["background", "yellow"]],
  ["44", ["background", "blue"]],
  ["45", ["background", "magenta"]],
  ["46", ["background", "cyan"]],
  ["47", ["background", "white"]],

  ["49", "/background"],

  ["53", "overline"],

  ["55", "/overline"],

  ["90", "gray"],
  ["91", ["bright", "red"]],
  ["92", ["bright", "green"]],
  ["93", ["bright", "yellow"]],
  ["94", ["bright", "blue"]],
  ["95", ["bright", "magenta"]],
  ["96", ["bright", "cyan"]],
  ["97", ["bright", "white"]],

  ["100", ["background", "gray"]],
  ["101", ["background", "bright", "red"]],
  ["102", ["background", "bright", "green"]],
  ["103", ["background", "bright", "yellow"]],
  ["104", ["background", "bright", "blue"]],
  ["105", ["background", "bright", "magenta"]],
  ["106", ["background", "bright", "cyan"]],
  ["107", ["background", "bright", "white"]],
]);

const commandText = new Map([
  ["A", ["moveCursorUpBy", "Row"]],
  ["B", ["moveCursorDownBy", "Row"]],
  ["C", ["moveCursorRightBy", "Column"]],
  ["D", ["moveCursorLeftBy", "Column"]],
  ["E", ["moveCursorDownBy", "Row", "ToColumn1"]],
  ["F", ["moveCursorUpBy", "Row", "ToColumn1"]],
  ["G", ["moveCursorTo", ["Column"]]],
  ["H", ["moveCursorTo", ["Row", "Column"]]],
  ["S", ["scrollUpBy", "Row"]],
  ["T", ["scrollDownBy", "Row"]],
  ["f", ["moveCursorTo", ["Row", "Column"]]],
]);

/**
 * @param {string} sequenceText
 * @returns {string}
 */
function colorOrStyleSequenceReplacer(sequenceText) {
  /** @type {Array<string>} */
  const replacement = [];

  const colorParameters = sequenceText.match(/\d{1,3}/g) || ["0"];

  colorParameters.forEach((colorParameter) => {
    replacement.push(colorText.get(colorParameter) || "?");
  });

  const replacementText = replacement.flat().map((segment, index) => {
    if (index === 0) return segment;

    return segment.replace(/^\w/, (firstCharacter) =>
      firstCharacter.toUpperCase()
    );
  });

  return `<${replacementText.join("")}>`;
}

/**
 * @param {string} sequenceText
 * @returns {string}
 */
function moveCursorByReplacer(sequenceText) {
  /** @type {Array<string>} */
  const replacement = [];
  sequenceText = sequenceText.trimEnd();

  const parameterValue = sequenceText.match(/\[(\d*)/)[1];
  const [command, parameterName, tailText] = commandText.get(
    sequenceText.slice(-1)
  );

  replacement.push(command, parameterValue || 1, parameterName);
  replacement.push(parameterValue > 1 ? "s" : "");
  replacement.push(tailText);

  return `<${replacement.join("")}>\n`;
}

/**
 * @param {string} sequenceText
 * @returns {string}
 */
function moveCursorToReplacer(sequenceText) {
  /** @type {Array<string>} */
  const replacement = [];
  sequenceText = sequenceText.trimEnd();

  const parameterValues = sequenceText.match(/\[(\d*;?\d*)/)[1].split(";");
  const [command, parameterNames] = commandText.get(sequenceText.slice(-1));

  replacement.push(command);

  parameterNames.forEach((parameterName) => {
    replacement.push(parameterName, parameterValues.shift() || 1);
  });

  return `<${replacement.join("")}>\n`;
}

/**
 * @param {string} text
 * @returns {string}
 */
function serializeAnsi(text) {
  return text
    .replace(/\u001b\[(\d*;?)*m/g, colorOrStyleSequenceReplacer)
    .replace(/.(?=\u001b)/g, (match) => `${match}\n`)
    .replace(
      /\u001b\[2J\n?\u001b\[(3J\n?\u001b\[H|0f)\n?/g,
      "<clearTerminal>\n"
    )
    .replace(/\u001b\[\d*[A-FST]\n?/g, moveCursorByReplacer)
    .replace(/\u001b\[\d*G\n?/g, moveCursorToReplacer)
    .replace(/\u001b\[\d*;?\d*[Hf]\n?/g, moveCursorToReplacer)
    .replace(/\u001b\[0?J\n?/g, "<eraseScreenDown>\n")
    .replace(/\u001b\[1J\n?/g, "<eraseScreenUp>\n")
    .replace(/\u001b\[2J\n?/g, "<eraseScreen>\n")
    .replace(/\u001b\[3J\n?/g, "<eraseScreenAndDeleteBuffer>\n")
    .replace(/\u001b\[0?K\n?/g, "<eraseLineEnd>\n")
    .replace(/\u001b\[1K\n?/g, "<eraseLineStart>\n")
    .replace(/\u001b\[2K\n?/g, "<eraseLine>\n")
    .replace(/\u001b\[6n\n?/g, "<getCursorPosition>\n")
    .replace(/\u001b(\[s|7)\n?/g, "<saveCursorPosition>\n")
    .replace(/\u001b(\[u|8)\n?/g, "<restoreCursorPosition>\n")
    .replace(/\u001b\[\?25h\n?/g, "<showCursor>\n")
    .replace(/\u001b\[\?25l\n?/g, "<hideCursor>\n")
    .replace(escape, "<ESC>");
}

/** @type {import('pretty-format').NewPlugin} */
const ansiEscapesSerializer = {
  serialize(text, config, indentation, depth, refs, printer) {
    return printer(serializeAnsi(text), config, indentation, depth, refs);
  },
  test(val) {
    return typeof val === "string" && val.includes(escape);
  },
};

module.exports = { ansiEscapesSerializer };
