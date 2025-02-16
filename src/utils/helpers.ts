export const matchData = (
  json1: Record<string, any>[],
  matchField1: string,
  json2: Record<string, any>[],
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

export const convertToCSV = (data: Record<string, any>[]) => {
  if (data?.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = data.map((row) =>
    headers.map((header) => row[header]).join(",")
  );

  return [headers.join(","), ...csvRows].join("\n");
};

export const convertToCustomCSV = (
  data: Record<string, any>[],
  matchField: string
) => {
  if (!data?.length) return "";
  console.log(data);

  const csvRows = data
    .filter((row) => row[matchField] !== undefined && row[matchField] !== null)
    .map((row) => `'${row[matchField]}',`);

  if (!csvRows.length || csvRows?.length <= 0) return "";

  const csvRowsWithData = csvRows.join("\n");
  const result = csvRowsWithData.substring(0, csvRowsWithData.length - 1);

  return `${result}`;
};
