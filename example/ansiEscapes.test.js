const { expect, jest, test } = require("@jest/globals");
const ansiEscapesSerializer = require("jest-serializer-ansi-escapes");

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
