export const matchData = (
  json1: Record<string, unknown>[],
  matchField1: string,
  json2: Record<string, unknown>[],
  matchField2: string
) => {
  return json1.map((entry) => {
    const matchFound = json2.some(
      (item) => item[matchField2] === entry[matchField1]
    );
    return {
      ...entry,
      match: matchFound,
    };
  });
};

export const convertToCSV = (data: Record<string, unknown>[]) => {
  if (data?.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = data.map((row) =>
    headers.map((header) => row[header]).join(",")
  );

  return [headers.join(","), ...csvRows].join("\n");
};

export const convertToFormat = (
  data: Record<string, unknown>[],
  format: string
) => {
  if (format === "csv") {
    return convertToCSV(data);
  }
  return JSON.stringify(data, null, 2);
};

export const convertToCustomCSV = (
  data: Record<string, unknown>[] | null,
  matchField: string
) => {
  if (!data?.length) return "";

  const csvRows = data
    .filter((row) => row[matchField] !== undefined && row[matchField] !== null)
    .map((row) => `'${row[matchField]}',`);

  if (!csvRows.length || csvRows?.length <= 0) return "";

  const csvRowsWithData = csvRows.join("\n");
  const result = csvRowsWithData.substring(0, csvRowsWithData.length - 1);

  return `${result}`;
};

export const parseStringToJson = (
  input: string
): Record<string, string>[] | null => {
  input = input.trim();

  // Intentar parsear como JSON directamente
  try {
    return JSON.parse(input);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
