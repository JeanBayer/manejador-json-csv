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
  if (data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = data.map((row) =>
    headers.map((header) => row[header]).join(",")
  );

  return [headers.join(","), ...csvRows].join("\n");
};