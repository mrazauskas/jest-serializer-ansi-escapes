const { format } = require("pretty-format");
const ansiEscapesSerializer = require("../");

function prettyFormat(text) {
  return format(text, { plugins: [ansiEscapesSerializer] });
}

describe("color and style sequences", () => {
  test.each([
    { expected: '"</>"', sequence: "\u001b[m" }, // omitted zero
    { expected: '"</>"', sequence: "\u001b[0m" },

    { expected: '"<bold>"', sequence: "\u001b[1m" },
    { expected: '"<dim>"', sequence: "\u001b[2m" },
    { expected: '"<italic>"', sequence: "\u001b[3m" },
    { expected: '"<underline>"', sequence: "\u001b[4m" },

    { expected: '"<inverse>"', sequence: "\u001b[7m" },
    { expected: '"<hidden>"', sequence: "\u001b[8m" },
    { expected: '"<strikethrough>"', sequence: "\u001b[9m" },

    { expected: '"</bold /dim>"', sequence: "\u001b[22m" },
    { expected: '"</italic>"', sequence: "\u001b[23m" },
    { expected: '"</underline>"', sequence: "\u001b[24m" },

    { expected: '"</inverse>"', sequence: "\u001b[27m" },
    { expected: '"</hidden>"', sequence: "\u001b[28m" },
    { expected: '"</strikethrough>"', sequence: "\u001b[29m" },

    { expected: '"<black>"', sequence: "\u001b[30m" },
    { expected: '"<red>"', sequence: "\u001b[31m" },
    { expected: '"<green>"', sequence: "\u001b[32m" },
    { expected: '"<yellow>"', sequence: "\u001b[33m" },
    { expected: '"<blue>"', sequence: "\u001b[34m" },
    { expected: '"<magenta>"', sequence: "\u001b[35m" },
    { expected: '"<cyan>"', sequence: "\u001b[36m" },
    { expected: '"<white>"', sequence: "\u001b[37m" },

    { expected: '"</color>"', sequence: "\u001b[39m" },

    { expected: '"<backgroundBlack>"', sequence: "\u001b[40m" },
    { expected: '"<backgroundRed>"', sequence: "\u001b[41m" },
    { expected: '"<backgroundGreen>"', sequence: "\u001b[42m" },
    { expected: '"<backgroundYellow>"', sequence: "\u001b[43m" },
    { expected: '"<backgroundBlue>"', sequence: "\u001b[44m" },
    { expected: '"<backgroundMagenta>"', sequence: "\u001b[45m" },
    { expected: '"<backgroundCyan>"', sequence: "\u001b[46m" },
    { expected: '"<backgroundWhite>"', sequence: "\u001b[47m" },

    { expected: '"</background>"', sequence: "\u001b[49m" },

    { expected: '"<overline>"', sequence: "\u001b[53m" },

    { expected: '"</overline>"', sequence: "\u001b[55m" },

    { expected: '"<gray>"', sequence: "\u001b[90m" },
    { expected: '"<brightRed>"', sequence: "\u001b[91m" },
    { expected: '"<brightGreen>"', sequence: "\u001b[92m" },
    { expected: '"<brightYellow>"', sequence: "\u001b[93m" },
    { expected: '"<brightBlue>"', sequence: "\u001b[94m" },
    { expected: '"<brightMagenta>"', sequence: "\u001b[95m" },
    { expected: '"<brightCyan>"', sequence: "\u001b[96m" },
    { expected: '"<brightWhite>"', sequence: "\u001b[97m" },

    { expected: '"<backgroundGray>"', sequence: "\u001b[100m" },
    { expected: '"<backgroundBrightRed>"', sequence: "\u001b[101m" },
    { expected: '"<backgroundBrightGreen>"', sequence: "\u001b[102m" },
    { expected: '"<backgroundBrightYellow>"', sequence: "\u001b[103m" },
    { expected: '"<backgroundBrightBlue>"', sequence: "\u001b[104m" },
    { expected: '"<backgroundBrightMagenta>"', sequence: "\u001b[105m" },
    { expected: '"<backgroundBrightCyan>"', sequence: "\u001b[106m" },
    { expected: '"<backgroundBrightWhite>"', sequence: "\u001b[107m" },

    { expected: '"<bold, red>"', sequence: "\u001b[1;31m" },
    { expected: '"<bold, inverse, magenta>"', sequence: "\u001b[1;7;35m" },
    { expected: '"</color, dim>"', sequence: "\u001b[39;2m" },

    { expected: '"<?>"', sequence: "\u001b[321m" }, // unrecognized sequence
  ])("$sequence", ({ expected, sequence }) => {
    expect(prettyFormat(sequence)).toEqual(expected);
  });
});
