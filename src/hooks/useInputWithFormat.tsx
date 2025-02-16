import { useDebounce } from "@uidotdev/usehooks";
import { useMemo, useState } from "react";

const parseInputToJson = (input: string): Record<string, string>[] | null => {
  input = input.trim();

  // Intentar parsear como JSON directamente
  try {
    return JSON.parse(input);
  } catch (error) {
    console.log("No es JSON, probando CSV...");
  }

  // Detectar si es CSV con comas o tabulación
  const isTabSeparated = input.includes("\t");
  const delimiter = isTabSeparated ? "\t" : ",";

  // Convertir CSV a JSON
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  if (lines.length < 2) return null; // No tiene suficientes líneas para ser CSV válido

  const headers = lines[0].split(delimiter).map((header) => header.trim());
  const data = lines.slice(1).map((line) => {
    const values = line.split(delimiter).map((value) => value.trim());
    const obj: Record<string, string> = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });

    return obj;
  });

  return data;
};

export function useInputWithFormat() {
  const [text, setText] = useState("");
  const debounceText = useDebounce(text, 500);
  const jsonOutput = useMemo(() => parseInputToJson(text), [debounceText]);

  return {
    text,
    setText,
    jsonOutput,
  };
}
