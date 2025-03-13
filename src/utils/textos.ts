/**
 * Splits a text into the specified number of lines.
 * @param text - The text to split.
 * @param lines - The number of lines per split.
 * @returns An array where each element is the resulting string.
 */
export function splitTextByLines(text: string, lines: string | number) {
  const textLines = text.trim().split("\n");
  const result: string[] = [];
  const linesNumber = Number(lines);
  if (linesNumber < 1)
    return {
      result: [""],
      numberLines: 0,
    };

  for (let i = 0; i < textLines.length; i += linesNumber) {
    result.push(textLines.slice(i, i + linesNumber).join("\n"));
  }

  return { result, numberLines: textLines.length };
}
